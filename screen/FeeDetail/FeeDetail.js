// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import FeeBodyData from './FeeBodyData';
// import AsyncStroage from '@react-native-async-storage/async-storage'
// export default class FeeDetail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
      // data:[],
      // header:[],
      // user:'',
//     };
//   }
//    componentDidMount(){
//      this.getData();
//    }
//    async getData(){
//    try{
//      await AsyncStroage.getItem('userToken')
//      .then((value)=>{
//        if(value!==null){
//          this.setState({user:value})
//        }
//      })   
//       }catch(err){
//          alert('Data is not available')
//       }
//     await fetch('https://www.shivamgroupofinstitutions.com/crm/api/allfee.php?userid='+this.state.user)
//     .then((res)=>res.json())
//     .then((responceJson)=>{
//      this.setState({data:responceJson.records}) 
//      this.setState({header:responceJson})      


//     })
    
// }

//   render() {
//     return (
//       <View>
//         <Text></Text>
//         <FeeBodyData 
//         data={this.state.data}
//         header={this.state.header}
//         />
//       </View>
//     );
//   }
// }
import React, { Component } from 'react';
import { View, Text,StyleSheet, ScrollView } from 'react-native';
import AsyncStroage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';
export default class FeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      header:[],
      user:'',
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
        alert('Data is not available')
     }
   await fetch('https://www.shivamgroupofinstitutions.com/crm/api/allfee.php?userid='+this.state.user)
   .then((res)=>res.json())
   .then((responceJson)=>{
    this.setState({data:responceJson.records}) 
    this.setState({header:responceJson})      


   })
   
}
  

  render() {
    return (
     
     <View style={{flex:1,justifyContent:'center'}}>
       <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',}}
       colors={['#33ccff','#ff99cc']}
       >
     <Text style={style.profileBodyText}>Total Amount : {this.state.header.total}</Text>
       </LinearGradient>
       <View style={{flex:3,width:'100%',}}> 
         <ScrollView>
         
         {this.state.data.map((item,index)=>{
            return(
              <View 
              key={index}
              style={style.secondBodyContainer}>
              <Text style={style.fount}> {'\n'}
              <Text style={style.profileBodyText}>year : {item.year} </Text>{'\n'}
              {'\n'}
              <Text style={style.profileBodyText}>month : {item.month}</Text>{'\n'}
              {'\n'}
              <Text style={style.profileBodyText}>head : {item.head}</Text>{'\n'}
              {'\n'}
              <Text style={style.profileBodyText}>amounttobepaid : {item.amount}</Text>{'\n'}
              {'\n'}

              </Text>
             </View>
            )
          })}
        
         </ScrollView>
       </View>
      
     </View>
       
       
    );
  }
}
// #e4e6eb
const style=StyleSheet.create({
  secondBodyContainer: {
    width: '80%',
    
    marginTop: 10,
    borderRadius: 10,
   borderWidth:0.5,
   borderColor:'#000',
    flex:3,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:40
  },
  fount:
  {
    fontFamily: 'Poppins-Regular',

  },
  profileBodyText: {
    fontSize: 16,
    color: '#000',


  },
})