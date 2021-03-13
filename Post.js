import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import {useState,useEffect} from "react";
import {db,auth} from './firebase';
import firebase  from  'firebase';
// import SendIcon from '@material-ui/icons/Send';



function Post({postId,user,username,caption,imageUrl}){
  const[comments,setComments]=useState([]);
  const[comment,setComment]=useState('');


    useEffect(()=>{
      let unsubscribe;
if(postId){
    unsubscribe=db
     .collection("posts")  
     .doc(postId)
     .collection("comments")
     .orderBy('timestamp','desc')
     .onSnapshot((snapshot)=>{
        setComments(snapshot.docs.map((doc)=>doc.data()));

     });
  }
  return ()=>{
    unsubscribe();
  };


    },[postId]);

const postComment=(event)=>{
  //this line submit our comment to the database...
  event.preventDefault();
  db.collection("posts").doc(postId).collection("comments").add({
       Text:comment,
       username:user.displayName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()

  });
  setComment('');

}
  
 

  
   return(
   <div className="post">
   <div className="post_header">
        <Avatar 
         className="post_avatar"
        alt="Remy Sharp" src= 
        "/static/images/avatar/1.jpg" />
     <h3>{username}</h3> 
     </div>
   <img class="post_image"
   src={imageUrl}/>
   <h4 class="post_text">
   <span className="clv">{username}</span>:
  {caption}
</h4>
{/*the comments straight from the database*/}
<div className="post_comments">
   {
   comments.map((comment)=>(
 <p>
  <strong className="upper-case">{comment.username}</strong>:{comment.Text}

 </p>


    ))



   }



</div>






{user &&(

<form className="post_commentBox">
  <input className="post_input"
      type="text"
      placeholder="Add a comment..."
      value={comment}
      onChange={(e)=>setComment(e.target.value)}/>
  <button
     className="post_button"
     disabled={!comment}
     type="submit"
     onClick={postComment}
     >
     Post
     </button>


</form>



  )}




   </div>







   	)



}

export default Post;