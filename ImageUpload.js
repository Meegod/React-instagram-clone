import React,{useState} from 'react';
import {Button,Input} from '@material-ui/core';
import {storage,db} from './firebase';
import firebase  from  'firebase';
import './ImageUpload.css';




function ImageUpload({username}){

  const[image,setImage]=useState(null);
  const[progress,setProgress]=useState(0);
   const[caption,setCaption]=useState('');

 const handleUpload=(e)=>{
 const uploadTask=storage.ref(`images/${image.name}`).put(image);

   uploadTask.on(
      "state_changed",
      (snapshot)=>{
    //Progress function lies here
 const progress=
 Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
    setProgress(progress);
  },
  (error)=>{
   //Error function....
     console.log(error);
     alert(error.message)
},
//Final/when the uploads complete
()=>{
//Complete function....
   storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url=>{
      	//post the image inside db
      	db.collection("posts").add({
         timestamp:firebase.firestore.FieldValue.serverTimestamp(),
         caption:caption,
         imageUrl:url,
         username:username
     });
      	setProgress(0);
      	setCaption("");
      	setImage(null);

      })

}
)

 }
 const handleChange=(e)=>{
//console.log("you have handled the upload");
 	if(e.target.files[0]){
 		setImage(e.target.files[0]);
 	} }
 
   return(
	<div className="imageupload">
	
   <input type="text" placeholder="Enter a caption"
      value={caption}
      className="input_caption"
      onChange={event=>setCaption(event.target.value)}/>
      <input type="file" onChange={handleChange}/>
      <Button onClick={handleUpload} className="bg-primary">
      Upload
      </Button>	
	
	



	</div>

   	)
}
export default ImageUpload;