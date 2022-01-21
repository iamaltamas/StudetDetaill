import React, { Component } from 'react';
import { View, Text,TouchableHighlight } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
// not using this component
export default class PaymentGetway extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => {
              var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_KXYDt8uoj6h0oc', // Your api key
                amount: '5000',
                name: 'foo',
                // prefill: {
                //   email: 'void@razorpay.com',
                //   contact: '9191919191',
                //   name: 'Razorpay Software'
                // },
                theme: { color: '#F37254' }
              }
              RazorpayCheckout.open(options).then((data) => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
            }}></TouchableHighlight>
      </View>
    );
  }
}
