import React from "react";
import { ProfileDetail,Home, FeeDetail,PayFee,PaymentDetail,DocumentDetail } from "..";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, View,Text,TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Logout from "../ProfileDetail/Logout";
const Tab = createBottomTabNavigator();
const TabRoute =()=>{

    const TabBarCustomButton=({children,onPress})=>{
        return(
            <TouchableOpacity
            style={{
                top:-20,
                alignItems:'center',
                justifyContent:'center'
            }}
            onPress={onPress}
            >
           <LinearGradient
           colors={['#044752', '#044752', '#044752']}
           style={{
               width:50,
               height:50,
               borderRadius:35
            }}
           >
           {children}
           </LinearGradient>
            </TouchableOpacity>
        )
    }

    return(
        // <Tab.Navigator
       
        // >
        //     {/* <Tab.Screen name="Home"component={Home}/> */}
        //     <Tab.Screen
        //      name="Profile"
        //      component={ProfileDetail}
        //      options={{
        //          headerShown:false,
        //          tabBarIcon:({focused})=>{
        //              return(
        //                  <Image 
        //                  style={{height:20,width:25}}
        //                  source={require('../assets/image/profile.png')}
        //                  />
        //              )
        //          }
        //      }}
        //      />
        //     <Tab.Screen name="FeeDetail"component={FeeDetail}
        //      options={{
        //         tabBarIcon:({focused})=>{
        //             return(
        //                 <Image 
        //                 style={{height:20,width:25}}
        //                 source={require('../assets/image/money.png')}
        //                 />
        //             )
        //         }
        //     }}
        //     />
        //     <Tab.Screen name="PayFee"component={PayFee}
        //      options={{
        //         tabBarIcon:({focused})=>{
        //             return(
        //                 <Image 
        //                 style={{height:20,width:25}}
        //                 source={require('../assets/image/money.png')}
        //                 />
        //             )
        //         }
        //     }}
        //     />
        //     <Tab.Screen name="PaymentDetail"component={PaymentDetail}
        //      options={{
        //         tabBarIcon:({focused})=>{
        //             return(
        //                 <Image 
        //                 style={{height:20,width:25}}
        //                 source={require('../assets/image/money.png')}
        //                 />
        //             )
        //         }
        //     }}
        //     />
        //     <Tab.Screen name="DocumentDetail"component={DocumentDetail}
        //      options={{
        //         tabBarIcon:({focused})=>{
        //             return(
        //                 <Image 
        //                 style={{height:20,width:25}}
        //                 source={require('../assets/image/document.png')}
        //                 />
        //             )
        //         }
        //     }}
        //     />
        // </Tab.Navigator>

        <Tab.Navigator

        >
            <Tab.Screen
            name="Profile"
            component={ProfileDetail}
            options={{
              
             headerShown: false,
                tabBarIcon:({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                     <Image
                      source={require('../../screen/assets/image/profile.png')} 
                     style={{
                        width:25,
                        height:25,
                        tintColor:focused?'#00aaff':"#000"
                        }}
                     />
                     
                  
                    </View>
                )
            }}
            />
            <Tab.Screen
            name="FeeDetail"component={FeeDetail}
            options={{
                
                tabBarIcon:({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                      <Image
                      source={require('../../screen/assets/image/info.png')} 
                     style={{
                        width:25,
                        height:25,
                        tintColor:focused?'#00aaff':"#000"
                        }}
                     />
                  
                    </View>
                )
            }}
            />
            <Tab.Screen
            name="PayFee"
            component={PayFee}
            options={{
                
                tabBarIcon:({focused})=>(
                    
                      <Image
                      source={require('../../screen/assets/image/money.png')} 
                     style={{
                         width:25,
                         height:25,
                        tintColor:"#fff"
                        }}
                     />
                  
                   
                ),
                tabBarButton:(props)=>(
                    <TabBarCustomButton
                      {...props}
                    />
                )
            }}
            />
            <Tab.Screen
            name="PaymentDetail"component={PaymentDetail}
            options={{
             
                tabBarIcon:({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                      <Image
                      source={require('../../screen/assets/image/payment-method.png')} 
                     style={{
                        width:25,
                         height:25,
                        tintColor:focused?'#00aaff':"#000"
                        }}
                     />
                  
                    </View>
                )
            }}
            />
            <Tab.Screen
            name="DocumentDetail"component={DocumentDetail}
            options={{
               
                tabBarIcon:({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                      <Image
                      source={require('../../screen/assets/image/document.png')} 
                     style={{
                        width:25,
                         height:25,
                        tintColor:focused?'#00aaff':"#000"
                        }}
                     />
                  
                    </View>
                )
            }}
            />
        </Tab.Navigator>
       
    )
}

export default TabRoute;