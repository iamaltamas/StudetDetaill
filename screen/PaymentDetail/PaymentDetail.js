import React, { Component } from 'react';
import { View, Text,ScrollView,StyleSheet} from 'react-native';
import AsyncStroage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';

export default class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      data:[],
      mass:[],
    };
  }
  
  componentDidMount(){
    this.getData();
  }

  async getData(){
     try{
      await AsyncStroage.getItem('userToken')
      .then((value)=>{
        if(value!==null){
          this.setState({user:value})
        }
      })
     }catch(err){
       alert('PaymentDataile is not Avelaible')
     }

   await fetch('https://www.shivamgroupofinstitutions.com/crm/api/payment.php?userid='+this.state.user)
     .then((responce)=>responce.json())
     .then((res)=>{
       this.setState({data:res.records})
       this.setState({mass:res})
     })



  }

  render() {
    return (
      // <ScrollView>
      //   <View>
       
      //  {this.state.data.map(function(item){
      //    return(
      //      <View style={{alignItems:'center'}}>
      //        <View style={{width:'65%',borderRadius:10,borderColor:'#000',borderWidth:1,padding:15,marginTop:10,marginLeft:15}}>
      //        <Text style={style.text}>Payment Id : {item.id}</Text>
      //        <Text style={style.text}>Sno : {item.sno}</Text>
      //        <Text style={style.text}>Payment Date : {item.date}</Text>
      //        <Text style={style.text}>Bill Number : {item.billno}</Text>
      //        <Text style={style.text}>Paid Amount : {item.amount}</Text>
      //      </View>
      //      </View>
      //    )
      //  })}
      //  <View style={{alignItems:'center',marginTop:15}}>
      //  <Text style={style.text}>Total Paid Amount{this.state.mass.total}</Text>
      //  </View>
      // </View>
      // </ScrollView>
      <View style={{flex:1}}>
        <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center'}}
       colors={['#33ccff','#ff99cc']}
       >
     <Text style={style.profileBodyText}>Total Amount : {this.state.mass.total}</Text>
       </LinearGradient>
       <View style={{flex:3,backgroundColor:'#d0d9d2',alignItems:'center'}}>
          <View style={{flex:1,width:'70%',backgroundColor:'#fff',marginTop:-40,borderRadius:10,}}>
             <ScrollView>
               <View style={{marginTop:10,alignItems:'center',}}>
               {this.state.data.map(function(item,index){
         return(
          //  <View style={{alignItems:'center'}}>
             <View 
             key={index}
             style={
               {width:'80%',
               borderRadius:10,
               borderColor:'#000',
               borderWidth:0.5,
               padding:15,
               marginTop:10,
              
               }}>
            <Text style={style.fount}>
            <Text style={style.profileBodyText}>Payment Id : {item.id}</Text>{'\n'}
            {'\n'}
             <Text style={style.profileBodyText}>Sno : {item.sno}</Text>{'\n'}
             {'\n'}
             <Text style={style.profileBodyText}>Payment Date : {item.date}</Text>{'\n'}
             {'\n'}
             <Text style={style.profileBodyText}>Bill Number : {item.billno}</Text>{'\n'}
             {'\n'}
             <Text style={style.profileBodyText}>Paid Amount : {item.amount}</Text>{'\n'}
             {'\n'}
            </Text>
           </View>
          //  </View>
         )
       })}
               </View>
             </ScrollView>
          </View>
       </View>
      </View>
      
    );
  }
}

const style = StyleSheet.create({

  text:{
    fontSize:16,
    fontWeight:'bold',
  },
  profileBodyText: {
    fontSize: 16,
    color: '#000',
 },
 fount:
 {
   fontFamily: 'Poppins-Regular',

 },
})