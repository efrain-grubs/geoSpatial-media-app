import React,{lazy,Suspense} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavBar from './components/navBar'
import PersonalChat from './pages/personalChats'
import {Toaster} from 'react-hot-toast'

const Register = React.lazy(() => import("./pages/register"))
const Login = React.lazy(() => import("./pages/login"))
const Post = React.lazy(() => import("./pages/post"))
const MyPost = React.lazy(() => import ("./pages/Mypost"))
const Map = React.lazy(() => import("./pages/map"))
const Chat = React.lazy(() => import('./pages/chat'))
function App() {

  
  
  
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
<Suspense fallback = {<h1>Loading page...</h1>}>

<BrowserRouter>
<Routes> 


<Route path = "/" element = {<Register/>}/>
<Route path = "/login" element = {<Login/>}/>
<Route path = '/post' element = {<div><NavBar/><Post/></div>}/>
<Route path = 'myPost' element = {<div><NavBar/><MyPost/></div>}/>
<Route path = '/map' element = {<div><NavBar/><Map/></div>}/>
<Route path = '/chat/:postId/:receiverId' element = {<div><NavBar/><Chat/></div>}/>
<Route path = '/chats' element = {<div><NavBar/><PersonalChat/></div>}/>

</Routes>



</BrowserRouter>



</Suspense>


      
    </div>
   
  )
}

export default App;

