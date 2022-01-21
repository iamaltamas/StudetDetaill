// import React, { useState, useEffect } from 'react'
// import { View, Text, ActivityIndicator } from 'react-native'
// import { NavigationContainer, } from '@react-navigation/native';
// import Route from './screen/Navigation/Route';
// import { AuthContext } from './components/context';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Home } from './screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const Stack = createNativeStackNavigator();
// const App = () => {
  // const [sdata,setSdata] = useState(true);
  // const [data,setData]=useState('');
  // // const [userToken,setUserToken] = useState(null) 
  // const getData = async () => {
  //   let userToken;
  //   userToken=null
  //   try {
  //      await AsyncStorage.getItem('@storage_Key')
  //    .then(value=>{
  //   if(value !== null) {
  //     setData(value)
  //     console.log(data)
  //     }
  //    })
      
  //   } catch(e) {
  //    console.log('worrr')
  //   }
  //   }

  // const initialLoginState =
  // {
  //   isLodig: true,
  //   username: null,
  //   userToken: null,
  //   password:null,
  // }
 


  // const loginReducer =(prevState,action)=>{
  //   switch(action.type){
  //     case 'RETRIEVE_TOKEN':
  //       return{
  //         ...prevState,
  //         userToken:action.token,
  //         isLodig:false

  //       };
  //       case 'LOGIN':
  //         return{
  //           user: {...action.payload},
            
  
  //         };
  //         case 'LOGOUT':
  //           return{
  //             ...prevState,
  //             userName:null,
  //             userToken:null,
  //             isLodig:false
    
  //           }
  //           case 'REGISTER':
  //           return{
  //             ...prevState,
  //             userName:action.id,
  //             userToken:action.token,
  //             isLodig:false
    
  //           }
  //   }
  // }

  // const [loginState,dispatch] = React.useReducer(loginReducer,initialLoginState);


  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch({type:'REGISTER',token:data })
  //   }, 1000)
  //   getData()
  // }, [])

  // const authContext = React.useMemo(() => ({
  //   signIn: async datas=>{
     
  //     console.log("=====>",datas);
  //     await fetch('https://www.shivamgroupofinstitutions.com/crm/api/login.php', {
  //       method: 'POST',
  
  //       headers: {
  //         "Content-type": 'application/json',
  
  //       },
  //       body: JSON.stringify(datas)
        
  //     })
  //     .then((responce)=>responce.json())
  //     .then(async res=>{
  //       setSdata(res)
  //       console.log(res)
  //       try {
  //         const jsonValue = JSON.stringify(res.id)
  //         await AsyncStorage.setItem('@storage_Key', jsonValue)
  //         dispatch({type:'LOGIN',token:'@storage_Key' })
  //         console.log(datas.id)
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     })
  //   },
  //       // if (respoce['status'] == 'true') {
	// 			// 	console.log(resjson)
  //       //   userToken='aaaaa'
					
	// 			// } else {
	// 			// 	alert('somthing is wrong')
	// 			// }

  
  //   SingOut: async() => {
  //     let userToken;
  //     userToken=null
      // try {
      //   await AsyncStorage.removeItem('@storage_Key')
        
      // } catch (err) {
      //   console.log(err)
      // }
  //     dispatch({type:'LOGOUT', })
  //   }
  // }))

  // if (loginState.isLodig) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <ActivityIndicator size='large' />

  //     </View>
  //   )

  // }


  // return (
    // <AuthContext.Provider value={authContext}>
    //   <View style={{ flex: 1 }}>
    //     <NavigationContainer>
    //       {loginState.userToken !== null ? (
    //         <Route />
    //         // <Stack.Navigator>
    //         //   <Stack.Screen name="Home" component={Home} />
    //         // </Stack.Navigator>

    //       ) : (
    //         <Stack.Navigator>
    //           <Stack.Screen name="Home" component={Home} />
    //         </Stack.Navigator>


    //       )}


    //     </NavigationContainer>
    //   </View>
    // </AuthContext.Provider>
  // )
// }

// export default App

import * as React from 'react';
import { AuthContext } from './components/context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Route from './screen/Navigation/Route';
import { NavigationContainer, } from '@react-navigation/native';
import { Home } from './screen';
import { View, Text, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
export default function App({ navigation }) {
 
const [tokendata,setData]= React.useState('')
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          if(action.token){
            AsyncStorage.setItem('userToken',action.token)
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('userToken')
          return {
            ...prevState,
            isSignout: true,
            userToken: null,

          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken =  await AsyncStorage.getItem('userToken')
      } catch (e) {
       alert("wrong data")
      }
     
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        await fetch('https://www.shivamgroupofinstitutions.com/crm/api/login.php', {
			method: 'POST',

			headers: {
				"Content-type": 'application/json',

			},
			body: JSON.stringify(data)
		})


			.then(response => response.json())
			.then(async resjson => {
				console.log(resjson)
				if (resjson['status'] == 'true') {
					console.log(resjson.id)
					try {
						const jsonValue = JSON.stringify(resjson.id)
						await AsyncStorage.setItem('userToken', jsonValue)
            dispatch({ type: 'SIGN_IN', token:resjson.id });
					} catch (err) {
						console.log(err)
					}
				} else {
					alert('somthing is wrong')
          
				}
			})

        
      },
      signOut:() => dispatch({ type: 'SIGN_OUT' })
    
      // signUp: async data => {
      //   // In a production app, we need to send user data to server and get a token
      //   // We will also need to handle errors if sign up failed
      //   // After getting token, we need to persist the token using `SecureStore`
      //   // In the example, we'll use a dummy token

      //   dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      // },
    }),
    []
  );

  return (
    // <AuthContext.Provider value={authContext}>
    //   <Stack.Navigator>
    //     {state.userToken == null ? (
    //       <Stack.Screen name="SignIn" component={SignInScreen} />
    //     ) : (
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //     )}
    //   </Stack.Navigator>
    // </AuthContext.Provider>
    <AuthContext.Provider value={authContext}>
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {state.userToken !== null ? (
          <Route />
          // <Stack.Navigator>
          //   <Stack.Screen name="Home" component={Home} />
          // </Stack.Navigator>

        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Home} />
          </Stack.Navigator>


        )}


      </NavigationContainer>
    </View>
  </AuthContext.Provider>
  );
}