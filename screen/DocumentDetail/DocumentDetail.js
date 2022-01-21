import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,StyleSheet,
   ScrollView,
   FlatList,
   PermissionsAndroid,
   Platform
  } from 'react-native'
import AsyncStroage from '@react-native-async-storage/async-storage'
import RNFetchBlob from 'rn-fetch-blob';
export default class DocumentDetail extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      user:'',
      saveDoc:'',
      isLoding: false,
      saveImage:''
    }
  }

  renderItem=({item,index})=>{
    return(
      <TouchableOpacity 
      key={index}
      onPress={()=>this.selectHendlar(index)}
      style={style.tuchableBody}>
        <Text style={style.tuchableText}>{item.title}</Text>
        <Image source={require('../../screen/assets/image/download-circular-button.png')}
         style={style.imageStyle}
        />
      </TouchableOpacity>
    )
  }

 
componentDidMount(){
 
  this.getApi();


}
 getApi =async()=>{
  try {
    await AsyncStroage.getItem('userToken')
      .then(value => {
        if (value !== null) {
          this.setState({ user: value })
          console.log("====>", this.state.user)
        }
      })

  } catch (e) {
    console.log('worrr')
  }
   await fetch('https://www.shivamgroupofinstitutions.com/crm/api/document.php?userid='+this.state.user)
   .then((responce)=>responce.json())
   .then((res)=>{
      this.setState({data:res.records})
   })
 var arr = this.state.data.map((item,index)=>{
     item.isSelected=false;
     return{...item}
   })
   this.setState({data:arr})
   console.log("sssss====>",this.state.data)
 }

selectHendlar=(index)=>{
     this.state.data.map((item,ind)=>{
       if(index==ind){
         item.isSelected=true
         this.setState({saveImage:item.document})
         this.checkPermission();
       }
       return{...item}
     })
    }
  

    checkPermission = async () => {
    
      // Function to check the platform
      // If iOS then start downloading
      // If Android then ask for permission
    
      if (Platform.OS === 'ios') {
        downloadImage();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'App needs access to your storage to download Photos',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            this.downloadImage();
          } else {
            // If permission denied then show alert
            alert('Storage Permission Not Granted');
          }
        } catch (err) {
          // To handle permission related exception
          console.warn(err);
        }
      }
    };
    
     downloadImage = () => {
      // Main function to download the image
      
      // To add the time suffix in filename
      let date = new Date();
      // Image URL which we want to download
      let image_URL = this.state.saveImage;    
      // Getting the extention of the file
      let ext = this.getExtention(image_URL);
      ext = '.' + ext[0];
      // Get config and fs from RNFetchBlob
      // config: To pass the downloading related options
      // fs: Directory path where we want our image to download
      const { config, fs } = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' + 
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', image_URL)
        .then(res => {
          // Showing alert after successful downloading
          console.log('res -> ', JSON.stringify(res));
          alert('Document Downloaded Successfully.');
        });
    };
     getExtention = filename => {
      // To get the file extension
      return /[.]/.exec(filename) ?
               /[^.]+$/.exec(filename) : undefined;
    };


   
render(){
  return (
   
      <FlatList
      numColumns={2}
        style={{marginTop:10,}}
        data={this.state.data}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={this.renderItem}
   />
   
  )
}
}

const style=StyleSheet.create({
  tuchableBody:{
   flex:1,
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#000',
    margin:15,
    alignItems:'center',
    justifyContent:'center',
    height:150
  },
  tuchableText:{
    fontSize:16,
    color:'red',
    padding:10,
    fontFamily:'Poppins-Regular'
  },
  imageStyle:{
    width:40,
    height:40,
    tintColor:'#00aaff'
  }
})



// import React from 'react'
// // Import React native Components
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Platform,
//   TouchableOpacity,
//   PermissionsAndroid,
// } from 'react-native';

// // Import RNFetchBlob for the file download
// import RNFetchBlob from 'rn-fetch-blob';

// const DocumentDetail = () => {
//   const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';

  // const checkPermission = async () => {
    
  //   // Function to check the platform
  //   // If Platform is Android then check for permissions.

  //   if (Platform.OS === 'ios') {
  //     downloadFile();
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission Required',
  //           message:
  //             'Application needs access to your storage to download File',
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Start downloading
  //         downloadFile();
  //         console.log('Storage Permission Granted.');
  //       } else {
  //         // If permission denied then show alert
  //         Alert.alert('Error','Storage Permission Not Granted');
  //       }
  //     } catch (err) {
  //       // To handle permission related exception
  //       console.log("++++"+err);
  //     }
  //   }
  // };

  // const downloadFile = () => {
   
  //   // Get today's date to add the time suffix in filename
  //   let date = new Date();
  //   // File URL which we want to download
  //   let FILE_URL = fileUrl;    
  //   // Function to get extention of the file url
  //   let file_ext = getFileExtention(FILE_URL);
   
  //   file_ext = '.' + file_ext[0];
   
  //   // config: To get response by passing the downloading related options
  //   // fs: Root directory path to download
  //   const { config, fs } = RNFetchBlob;
  //   let RootDir = fs.dirs.PictureDir;
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       path:
  //         RootDir+
  //         '/file_' + 
  //         Math.floor(date.getTime() + date.getSeconds() / 2) +
  //         file_ext,
  //       description: 'downloading file...',
  //       notification: true,
  //       // useDownloadManager works with Android only
  //       useDownloadManager: true,   
  //     },
  //   };
  //   config(options)
  //     .fetch('GET', FILE_URL)
  //     .then(res => {
  //       // Alert after successful downloading
  //       console.log('res -> ', JSON.stringify(res));
  //       alert('File Downloaded Successfully.');
  //     });
  // };

  // const getFileExtention = fileUrl => {
  //   // To get the file extension
  //   return /[.]/.exec(fileUrl) ?
  //            /[^.]+$/.exec(fileUrl) : undefined;
  // };

//   return (
//     <View style={styles.container}>
//       <View style={{ alignItems: 'center' }}>
//         <Text style={{ fontSize: 25, textAlign: 'center' }}>
//           React Native File Download Example
//         </Text>
       
//       </View>
//       <Image
//         source={{
//           uri: fileUrl,
//         }}
//         style={{
//           width: '100%',
//           height: 100,
//           resizeMode: 'contain',
//           margin: 5
//         }}
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={checkPermission}>
//         <Text style={styles.text}>
//           Download File
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DocumentDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 20,
//     textAlign: 'center',
//     padding: 5,
//   },
//   button: {
//     width: '80%',
//     padding: 10,
//     backgroundColor: 'blue',
//     margin: 10,
//   },
  
// });