// import React, { Component } from 'react';
// import { View, Text,ScrollView,FlatList,StyleSheet } from 'react-native';

// export default class FeeBodyData extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
    
//     };
//   }
//   render() {

//     return (
//          <ScrollView style={{marginBottom:25}}>
        
//       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//         <Text style={{fontSize:18, fontWeight:'bold', color:'#000',}}>{this.props.header.message}</Text>
//         {this.props.data.map(function(articalData){
//             return(
                // <View style={style.cardview}>
                //     <Text style={style.text}>year : {articalData.year} </Text>
                //     <Text style={style.text}>month : {articalData.month}</Text>
                //     <Text style={style.text}>head : {articalData.head}</Text>
                //     <Text style={style.text}>amounttobepaid : {articalData.amount}</Text>
                // </View>
//             )
//         })}
//         <View style={{margin:15}}>
//         <Text style={[style.text,{color:'red'}]}>Total : {this.props.header.total}</Text>
//         </View>
//       </View>
//       </ScrollView>
      
//     );
//   }
// }
// const style =StyleSheet.create({
//   text:{
//       fontSize:16,
//       fontWeight:'600',
//       color:'#00aaff',
//   },
//   cardview:{
//     width:'70%',
//     borderRadius:10,
//     borderWidth:1,
//     borderColor:'#000',
//     flexDirection:'column',
//     marginTop:10,
//     padding:10

//   }
// })