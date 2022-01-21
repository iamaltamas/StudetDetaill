import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from './Logout';

export default class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      header: [],
      address: [],
      user: '',
    };
  }
  componentDidMount() {
    this.getData();
    this.getTokenData();
  }


  async getData() {
    console.log('aaaaa', this.props.state.user)

  }

  async getTokenData() {
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

    const url = 'https://www.shivamgroupofinstitutions.com/crm/api/profile.php?userid=' + this.state.user;
    await fetch(url)
      .then((res) => res.json())
      .then((responceJson) => {
        this.setState({ data: responceJson.qualification })
        this.setState({ header: responceJson })
        this.setState({ address: responceJson.address })
      })
     
  }
  render() {
    let headBody = this.state.header;
    return (
      <ScrollView>
        <View style={styles.Container}>
          <View style={styles.headearContainer}>
            <Image
              style={styles.headerImage}
              source={require('../../screen/assets/image/shivamGroup.jpg')}
            />
          </View>
          <View style={{position:'absolute',alignItems:'flex-end',width:'100%',padding:15}}>
           <Logout/>
           </View>
          <View style={styles.profileImageBody}>
            <Image
              style={styles.profileImage}
              source={{ uri: headBody.studentpic }}
            />
            <Text style={styles.fount}>
              <Text style={styles.profileBodyText}>Name : {headBody.name}{"\n"}</Text>
              {"\n"}
              <Text style={styles.profileBodyText}>Email : {headBody.email}</Text>
            </Text>
          </View>
          <View style={styles.secondBodyContainer}>
            <Text style={styles.fount}>
              {"\n"}
              <Text style={styles.profileBodyText}>Reg.No : {headBody.registrationno}</Text>{"\n"}
              {"\n"}
              <Text style={styles.profileBodyText}>Admition Date : {headBody.doa}</Text>{"\n"}
              {"\n"}
              <Text style={styles.profileBodyText}>Branch : {headBody.branch}</Text>{"\n"}
              {"\n"}
              <Text style={styles.profileBodyText}>Session : {headBody.batch}</Text>{"\n"}
            </Text>
          </View>

          <View style={styles.secondBodyContainer}>
            <Text style={styles.fount}>{'\n'}
              {'\n'}
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'red' }}>Basic Information</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Cource : {headBody.course}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Mobile Noumber : {headBody.contactno}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Aadhar No : {headBody.aadhar}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Addmission Data : {headBody.doa}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Date Of Birth : {headBody.dob}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Gender : {headBody.gender}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Blood Group : {headBody.bloodgroup}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Religion : {headBody.religion}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Community : {headBody.community}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Marital Status : {headBody.maritial}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Mother Tongue : {headBody.mothertoungue}</Text>{'\n'}
            </Text>
          </View >
          <View style={styles.secondBodyContainer}>
            <Text style={styles.fount}>{'\n'}
              {'\n'}
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'red' }}>Parents Details</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Father's Name : {headBody.fathername}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Occupation : {headBody.occupation}</Text>{'\n'}
              {'\n'}
              <Text style={styles.profileBodyText}>Income : {headBody.parentincome}</Text>{'\n'}
            </Text>
          </View>

          {this.state.data.map(function (items) {
            return (

              <View style={styles.secondBodyContainer}>
                <Text style={styles.fount}>{'\n'}
                  {'\n'}
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'red' }}>Qualification Detail:</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Serial Number : {items.sno}</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Exam Passed : {items.qualification}</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Year of Passing : {items.year}</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>School/College/University : {items.school}</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Total Marks : {items.totalmark}</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Marks Obtained : {items.obtainmark}</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Marks Obtained(In %) : {items.percentage}</Text>{'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Div : {items.division}</Text>{'\n'}
                  {'\n'}
                </Text>
              </View>
            )
          })}

          {this.state.address.map(function (address,index) {
            return (
              <View 
              key={index}
              style={styles.secondBodyContainer}>
                <Text style={styles.fount}> {'\n'}
                  {'\n'}
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'red' }}>Address</Text> {'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Address : {address.address}</Text> {'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Police Station : {address.ps}</Text> {'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Post : {address.post}</Text> {'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>District : {address.dist}</Text> {'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>State : {address.state}</Text> {'\n'}
                  {'\n'}
                  <Text style={styles.profileBodyText}>Pincode : {address.pincode}</Text> {'\n'}
                  {'\n'}
                </Text>
              </View>
            )
          })}
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    height: '100%', width: '100%', alignItems: 'center'
  },
  headearContainer: {
    height: 200,
    width: '100%',
    backgroundColor: '#00aaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    height: 217,
    width: '100%',
    backgroundColor: '#000',
  },
  profileImageBody: {
    height: 180,
    width: '70%',
  
    marginTop: 150,
    marginTop: -45,
    borderRadius: 10,
    alignItems: 'center'
  },
  profileImage: {
    width: 85,
    marginTop: 10,
    height: 85,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 75
  },
  profileBodyText: {
    fontSize: 16,
    color: '#000',


  },
  secondBodyContainer: {
    width: '80%',
   borderWidth:0.5,
   borderColor:"#000",
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  fount:
  {
    fontFamily: 'Poppins-Regular',

  },
})