import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from "./MainStack";


const Stack = createNativeStackNavigator();

const Route =()=>{
   return(
        <Stack.Navigator
        screenOptions={{
          headerShown:false
      }}
        >
             {MainStack(Stack)}
        </Stack.Navigator>
       
    )
}

export default Route;