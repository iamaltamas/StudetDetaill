import React from "react";
import TabRoute from "./TabRoute";



export default function(Stack){
       return(
        <>
        <Stack.Screen

        name="Tabs"
        component={TabRoute}
        />
         
        </>
       )

}