import React from 'react'
import { View,Button} from 'react-native';
import { AuthContext} from '../../components/context';
const Logout = () => {
    const {signOut} = React.useContext(AuthContext)
  return (
    <View>
        <Button onPress={()=>{signOut()}}                           
        title='Logout'                          
         />
    </View>
  )
}

export default Logout
