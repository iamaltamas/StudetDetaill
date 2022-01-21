import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
export default class PayFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      data: [],
      isLoding: false,
      saveAmount: '',
      collegeData: [],
      savefeeid: '',
      savemonthid: '',
      saveheadid: '',
      savefeetype: '',
    };
  }
  getData = async () => {
    try {
      await AsyncStorage.getItem('userToken')
        .then(value => {
          if (value !== null) {
            this.setState({ user: value })
            console.log("====>", this.state.user)
          }
        })

    } catch (e) {
      console.log('worrr')
    }

    try {
      await fetch('https://www.shivamgroupofinstitutions.com/crm/api/payfee.php?userid=' + this.state.user)
        .then((responce) => responce.json())
        .then(res => {
          this.setState({ data: res.records })

          let arr = this.state.data.map((item, index) => {
            item.isSelected = false
            return { ...item };
          })
          this.setState({ data: arr })
        })
    } catch {
      alert('No Payfee found')
      return;
    }

    await fetch('https://www.shivamgroupofinstitutions.com/crm/api/profile.php?userid=' + this.state.user)
      .then((responceData) => responceData.json())
      .then((resData) => {
        this.setState({ collegeData: resData.college })
      })


  }



  componentDidMount() {
    this.getData()
  }
  // !item.isSelected

  selectHendlar = (index) => {
    let arr = this.state.data.map((item, ind) => {
      if (index == ind) {
        item.isSelected = !item.isSelected
        this.setState({ saveAmount: item.amounttobepaid });
        this.setState({ savefeeid: item.feeid });
        this.setState({ savemonthid: item.monthid });
        this.setState({ saveheadid: item.headid });
        this.setState({ savefeetype: item.feetype });



      }
      console.log("www=>", this.state.savefeeid)
      return { ...item }
    })
    console.log(this.state.data)
    this.setState({ data: arr })
  }


  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>
          {this.state.data.map((item, index) => {
            return (
              <TouchableOpacity
              key={index}
                onPress={() => this.selectHendlar(index)}
                style={{
                  marginTop: 20,
                  width: '80%',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: item.isSelected?"red":"#044752",
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  borderRadius: 10
                }}>
              

                
                <Text style={{ fontSize: 18, color: '#fff' }}>{'\u20A8'} :{item.amounttobepaid} </Text>
                <Text style={{ fontSize: 18, color: '#fff' }}>{item.month} </Text>
                <Text style={{ fontSize: 18, color: '#fff' }}>{item.isSelected ? 'Selected' : 'Not Selected'}</Text>
              </TouchableOpacity>
            )
          })}
          <View style={{ height: 100, backgroundColor: '#9fbded', width: "70%", marginTop: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{'\u20A8'} : {this.state.saveAmount}</Text>

            <TouchableOpacity
              onPress={() => {
                var options = {
                  description: 'Credits towards consultation',
                  image: 'https://i.imgur.com/3g7nmJC.png',
                  currency: 'INR',
                  key: 'rzp_test_KXYDt8uoj6h0oc', // Your api key
                  amount: this.state.saveAmount * 100,
                  name: 'foo',
                  // prefill: {
                  //   email: 'void@razorpay.com',
                  //   contact: '9191919191',
                  //   name: 'Razorpay Software'
                  // },
                  theme: { color: '#F37254' }
                }

                RazorpayCheckout.open(options).then((data) => {

                  const details = {
                    fid: [this.state.savefeeid],
                    amount: [this.state.saveAmount],
                    pay: this.state.saveAmount,
                    stuid: this.state.user,
                    month: [this.state.savemonthid],
                    college: this.state.collegeData,
                    head: [this.state.saveheadid],
                  };
                  if (data.razorpay_payment_id) {
                    fetch('https://www.shivamgroupofinstitutions.com/crm/api/takefee.php', {
                      method: 'POST',
                      headers: {
                        "Content-type": 'application/json',
                      },
                      body: JSON.stringify(details)
                    })
                      .then((response) => response.json())
                      .then((resf) => {
                        console.log("lastresponce", resf)
                      })
                      .catch((err) => {
                        console.log("errr", err)
                      })

                  }
                  console.log(data.razorpay_payment_id)


                  // handle success
                  alert(`Success: ${data.razorpay_payment_id}`);
                }).catch((error) => {
                  // handle failure
                  alert(`======>Error: ${error.code} | ${error.description}`);
                });



              }}
              style={{
                marginTop: 20,
                width: '60%',
                height: 40,
                backgroundColor: '#00aaff',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}


            >
              <Text>go to pay</Text>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    );
  }
}


