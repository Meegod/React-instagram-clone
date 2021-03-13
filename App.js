import {useState,useEffect} from "react";
import './App.css';
import Post from './Post';
import {db,auth} from './firebase';
import firebase  from  'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core';
import  ImageUpload from './ImageUpload';




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const[openSignIn,setOpenSignIn]=useState(false);
    const [modalStyle] = useState(getModalStyle);
   const[posts,setPosts]=useState([]);
   const[open,setOpen]=useState(false);
  const[username,setUsername]=useState('');
   const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const[user,setUser]=useState(null);

   //User authentication
  useEffect(()=>{
   const unsubscribe=auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      //user has logged in
      console.log(authUser);
      setUser(authUser);
      if(authUser.displayName){
        //dont update username
      }else{
        //if we just created someone....
        // return authUser.updateProfile({
        //    displayName:username,
        // });
      }
    }else{
      //user has logged out
      setUser(null);
    }


   })
return()=>{
  //perform some cleanup actions
  unsubscribe();
}

  },[user,username]);











//It runs a piece of code based on a specific conditions
useEffect(()=>{
//this is where the code runs
db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
    setPosts(snapshot.docs.map(doc=>({
     id:doc.id,
     post:doc.data()

    })));


})


//every time a new post is added .this code fires

},[])

const signUp =(event)=>{
event.preventDefault();
auth.createUserWithEmailAndPassword(email,password)
// .then((authuser)=>{
//   return authUser.user.updateProfile({
//     displayName:username
//   })
// })
.then((authUser)=>{
  return  authUser.user.updateProfile({
    displayName:username
   })
})
.catch((error)=>alert(error.message));
setOpen(false);
setEmail('');
  setPassword('');
  setUsername('');
}

//SignIn functionality
const signIn=(event)=>{
  event.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((error)=>alert(error.message))
  setOpenSignIn(false)
  setEmail('');
  setPassword('');
}












  return (
    <div className="app">
{/*image upload in react*/}
{/* i want to have. a caption input... */}
{/*file picker*/ }
{/*post button*/}
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
        <center>
        <img className="app_headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
    </center>
      <Input type="text"
         placeholder="username"
         value={username}
         onChange={(e)=>setUsername(e.target.value)}/>

         <Input type="text"
         placeholder="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}

      />
      <Input type="text"
         placeholder="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}

      />
      <Button onClick={signUp}>Sign Up</Button>
 
      </form>
    </div>
      </Modal>
 {/*modal--2 for the signin button*/}
    <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
        <center>
        <img className="app_headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
    </center>
     
         <Input type="text"
         placeholder="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}

      />
      <Input type="text"
         placeholder="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}

      />
      <Button onClick={signIn}>Sign In</Button>
 
      </form>
    </div>
      </Modal>
 

 







      <div className="app_header">
      <img className="app_headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
    {user?(
      <Button onClick={()=>auth.signOut()}>Logout</Button>
       ):(
       <div className="app_loginContainer">
      <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={()=>setOpen(true)}>Sign Up</Button>
      </div>
       )
    

      }
      </div>   
      {user?.displayName?( 

<ImageUpload username = {user.displayName}/>


):(
<h3>Sorry you need to login to upload</h3>

)}

  <div className="app_post">
 {
   posts.map(({id,post})=>(
  <Post 
   key={id}
   user={user}
   postId={id}
  username={post.username}
   caption={post.caption}
   imageUrl={post.imageUrl}/>
 
    ))

  }
 </div>
{/*instagram embed*/}










 


  
  </div>
); 
 
  
}
export default App;