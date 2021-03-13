import {useState,useEffect} from "react";
import './App.css';
import Post from './Post';
import {db} from './firebase';
import firebase  from  'firebase';

function App() {
  const[posts,setPosts]=useState([]);

//It runs a piece of code based on a specific conditions
useEffect(()=>{
//this is where the code runs
db.collection('posts').onSnapshot(snapshot=>{
    setPosts(snapshot.docs.map(doc=>({
     id:doc.id,
     post:doc.data()

    })));


})


//every time a new post is added .this code fires

},[])




  return (
    <div className="app">
      <div className="app_header">
      <img className="app_headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
      </div>
  
 {
   posts.map(({id,post})=>(
  <Post 
  key={post.id}
  username={post.username}
   caption={post.caption}
   imageUrl={post.imageUrl}/>
 
    ))

  }
 
  
  </div>
); 
 
  
}
export default App;

useEffect(()=>{
//  const unsubscribe= auth.onAuthStateChanged((authUser)=>{
//     if(authUser){
//     //user has logged in 
//    console.log(authUser);
//    setUser(authUser);
    

// //   // if(authUser.displayName){
// //   //   //dont update the username
// //   // }else{
// //   //   //if we just created someone
// //   //   return authUser.updateProfile({
// //   //  displayName:username,
// //   //   });
// //   // }


//    } else{
// //user has logged out
// setUser(null);
//     }
  
 return()=>{
  //perform some cleanup actions
  //unsubscribe();
 }

},[user,username])

{user?(
      <Button onClick={()=>auth.signOut()}>Logout</Button>
       ):(
      <Button onClick={()=>setOpen(true)}>Sign Up</Button>

       )
    

      }