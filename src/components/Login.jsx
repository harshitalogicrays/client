import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/cartSlice'

const Login = () => {
  let[user,setUser]=useState({email:'',password:''})
  let [isLoading,setIsLoading]=useState(false)
  let [errors,setErrors]=useState({});
    const redirect=useNavigate()
  let validations=(user)=>{
      let formerrors={}
      let pattern=/^([a-zA-Z0-9_\!\@\#\$\%\^\&\*\-\.]+)\@([a-zA-Z_0-9]+)\.([a-zA-Z]{3})$/
      if(user.email==''){formerrors.emailerr="email is required"  }
      else if(!pattern.test(user.email)){  formerrors.emailerr="invalid email"  }
      if(user.password==''){formerrors.pwderr="password is required"}
      return formerrors }

  let URL=useSelector(selectURL)
  let redirectURL=()=>{
    if(URL.includes('cart')){
      redirect('/cart')
    }
    else redirect('/')
  }


  let handleSubmit=async(e)=>{
      e.preventDefault()
      let myerrors=validations(user)
      if(Object.keys(myerrors).length==0){
          setErrors({})
          setIsLoading(true)
            signInWithEmailAndPassword(auth, user.email, user.password)
              .then(async(userCredential) => {
                const user1 = userCredential.user;
                try{
                    const docRef=doc(db,"users",user1.uid)
                    const docSnap=await getDoc(docRef)
                    // console.log(docSnap.data());
                    let role=docSnap.data().role
                    if(role=="admin")redirect('/admin')                    
                    else if(role=='user'){
                      redirectURL()
                    } 

                  setIsLoading(false)
                  toast.success("loggedIn successfully")
                  
                }
                catch(error){
                  toast.error(error.message)
                }
              
              })
              .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
              });
        }
      else 
          setErrors(myerrors)
  }


  const provider = new GoogleAuthProvider();
  let googleLogin=()=>{
      signInWithPopup(auth, provider)
      .then(async(result) => {
          const user1 = result.user;
          try{
            const docRef=doc(db,'users',user1.uid)
            await setDoc(docRef,{username:user1.displayName,email:user1.email,role:'user',createdAt:Timestamp.now().toMillis()})
            setIsLoading(false)
            toast.success("loggedIn successfully")
            redirectURL()
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }     

      }).catch((error) => {
          toast.error(error.message)
      });
  }
  return (
    <Container className='shadow mt-5'>
        {isLoading && <Loader/>}
    <h1>Login Page</h1><hr/>
<Row>
    <Col xs={6}>
        <Image src="/src/assets/login.png" fluid/>
    </Col>
    <Col xs={6}>
        <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
            </Form.Group>
            {errors.emailerr && <span className='text-danger'>{errors.emailerr}</span>}
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
            </Form.Group>
            {errors.pwderr && <span className='text-danger'>{errors.pwderr}</span>}<br/>

            <div className="d-grid gap-2">
              <Button variant='danger' className='mt-2' type="submit">Submit</Button>
            </div>
            <hr/>
            <div className="d-grid gap-2">
              <Button variant='info' className='mt-2' type="button" onClick={googleLogin}>Login with Google</Button>
            </div>
        </Form>
        <p>Create an account?? <Link to='/signup'>Register</Link></p>
    </Col>
</Row>
</Container>
  )
}

export default Login
