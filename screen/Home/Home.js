import React, { useEffect, useState } from 'react'

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Keyboard,
	ImageBackground
} from 'react-native'
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../components/context';
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-elements/dist/helpers';


const Home = ({ navigation }) => {

	const [username, setEmail] = useState('1234567890123');
	const [password, setDate] = useState('2007-08-01');
	const [loading, setLoading] = React.useState(false);

	const {signIn} = React.useContext(AuthContext);
     
    
	// 01-08-2007
   



	// async function myfun() {

		// let details = {
		// 	'username': username,
		// 	'password': date
	// 	};
	// 	// let formBody = [];
	// 	// for (let property in details) {
	// 	//     let encodedKey = encodeURIComponent(property);
	// 	//     let encodedValue = encodeURIComponent(details[property]);
	// 	//     formBody.push(encodedKey + "=" + encodedValue);
	// 	// }
	// 	// formBody = formBody.join("&");
	// 	//   console.log(username,date)

		// await fetch('https://www.shivamgroupofinstitutions.com/crm/api/login.php', {
		// 	method: 'POST',

		// 	headers: {
		// 		"Content-type": 'application/json',

		// 	},
		// 	body: JSON.stringify(details)
		// })


		// 	.then(response => response.json())
		// 	.then(async resjson => {
		// 		console.log(resjson)

		// 		if (resjson['status'] == 'true') {
		// 			console.log(resjson.id)
		// 			try {
		// 				const jsonValue = JSON.stringify(resjson.id)
		// 				await AsyncStorage.setItem('@storage_Key', jsonValue)
		// 			} catch (err) {
		// 				console.log(err)
		// 			}
		// 			alert('success')
		// 			navigation.navigate('Profile')
		// 		} else {
		// 			alert('somthing is wrong')
		// 		}
		// 	})

	// }




	return (
		// <View style={{ flex: 1, width: '100%', alignItems: 'center',  }}>
			 <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',alignItems:'center'}}
       colors={['#33ccff','#ff99cc']}
       >

<ImageBackground source={require('../../screen/assets/image/loginImage.png')}
			style={{height:'100%',width:'100%'}}
			/>
			
			<View style={{position:'absolute',alignItems:'center',justifyContent:'center',}}>
			<Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold', padding: 20, }}>
				SGI Login
			</Text>
			<TextInput
				style={{
					height: 50,
					width: 300,
					backgroundColor: '#fFf',
					borderRadius: 10,
					fontSize: 18,
					margin: 15,
                    color:'#000'
				}}
				placeholder='Aadhar Number'
				onChangeText={(value) => setEmail(value)}
				keyboardType='numeric'
				value={username}
			/>
			<View style={{ marginTop: 20 }}>
				<DatePicker
					style={{ width: 300, backgroundColor: '#fff', borderRadius: 10, }}
					date={password}
					mode="date"
					placeholder="select date"
					format="YYYY-MM-DD"
					// minDate="2016-05-01"
					// maxDate="2016-06-01"
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					customStyles={{
						dateIcon: {
							position: 'absolute',
							left: 0,
							top: 4,
							marginLeft: 0,
							borderColor: '#000',

						},
						dateInput: {
							marginLeft: 36
						}
						// ... You can check the source to find the other keys.
					}}
					onDateChange={(password) => setDate(password)}
				/>
			</View>




			<TouchableOpacity 
			style={{
				marginTop: 25,
				width: '60%',
				backgroundColor: '#6777ef',
				height: 40,
				borderRadius: 10,
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 50
			}}
			onPress={async () => {
				try {
				  setLoading(true);
				  await signIn({username,password});
				} catch (e) {
				  console.log(e)
				}
			  }}
		
			>
				<Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
					Login
				</Text>
				
			</TouchableOpacity>
			</View>


    
       </LinearGradient>
			

		// </View>
	)
}

export default Home;