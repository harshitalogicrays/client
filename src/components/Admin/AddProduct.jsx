import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useFetchCollection from '../../customhooks/useFetchCollection'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectproducts } from '../../redux/productSlice'

const AddProduct = () => {
    let initial={category:'select',name:'',brand:'',price:'',stock:'',description:'',image:[]}
    const navigate=useNavigate()
    const{data:categories}=useFetchCollection('categories')
    let [product,setProduct]=useState({...initial})
    let [uploadProgress,setUploadProgress]=useState(0) 

    //edit 
    const [oldImages,setOldImages]=useState([])
    const [newImages,setNewImages]=useState([])
    const {id}=useParams()
    const allproducts=useSelector(selectproducts)
    const productEdit=allproducts.find(item=>item.id==id)
    useEffect(()=>{
        if(id){
            setProduct({...productEdit})
            setOldImages(productEdit.image)
        }
        else{
            setProduct({...initial})
        }
    },[id])


    let handleChange=(e)=>{
        // console.log(e.target.files)
        let images=e.target.files
        let arr=[]
        Array.from(images).forEach((file)=>{
            const storageRef=ref(storage,`23rdnov_ecommerce/products/${Date.now()}`)
            const uploadTask=uploadBytesResumable(storageRef,file)
            uploadTask.on('state_changed',(snapshot)=>{
              let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
              setUploadProgress(progress)
            },(error)=>{toast.error(error.message)},
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then(url=>{
                console.log(url)
                arr.push(url)
                setNewImages((prevImages)=>[...prevImages,url]) //setNewImages([...newImages,url])
              })
            })
        })
        setProduct({...product,image:arr})
    }

    let handleRemoveImage=(i,image)=>{
        const updatedImages=[...oldImages]
        updatedImages.splice(i,1)
        setOldImages(updatedImages)
        deleteObject(ref(storage,image))
    }


    let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){
            try{
                const docRef=collection(db,'products')
                await addDoc(docRef,{...product,
                  createdAt:Timestamp.now().toMillis()})
                toast.success("product added")
                navigate('/admin/viewproducts')
            }
            catch(error){toast.error(error.message)}
        }
        else {
            let updatedImages=[...oldImages,...newImages] 
            try{
                const docRef=doc(db,'products',id)
                await setDoc(docRef,{...product,
                    image:updatedImages,
                  createdAt:productEdit.createdAt,
                 editedAt:Timestamp.now().toMillis()})
                toast.success("product updated")
                navigate('/admin/viewproducts')
            }
            catch(error){toast.error(error.message)}
        }
      
    }
  return (
    <Container className='mt-5'>
        <Card>
            <Card.Header>
            <h1>{id?"Edit ":"Add "} Product
                <Link to='/admin/viewproducts' variant='danger' className='btn btn-danger float-end'>View Products</Link>
            </h1>
            </Card.Header>
            <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Select name="category" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value })}>
                      <option value='select'>Choose One</option>
                      {categories.map((c,i)=><option key={i}>{c.title}</option>)}                      
                      </Form.Select>
              </Form.Group>
              <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value })}></Form.Control>
                    </Form.Group>
                </Col>
                <Col> 
                 <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control name='brand' value={product.brand} onChange={(e)=>setProduct({...product,brand:e.target.value })}></Form.Control>
                    </Form.Group>
                    </Col>
              </Row>
              <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control name='price' type="number" value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value })}></Form.Control>
                    </Form.Group>
                </Col>
                <Col> 
                 <Form.Group>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control name='stock' type="number" value={product.stock} onChange={(e)=>setProduct({...product,stock:e.target.value })}></Form.Control>
                    </Form.Group>
                    </Col>
              </Row>
              {uploadProgress != 0 &&
                           <div class="progress">
                          <div class="progress-bar" style={{width:`${uploadProgress}%`}}>
                           {uploadProgress < 100 ? <> uploading {uploadProgress}% </> :
                            <>upload  {uploadProgress}%  </>}</div>
                          </div>}
              <Form.Group className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" multiple onChange={handleChange}></Form.Control>
              </Form.Group>

                {id &&
                <>
                     {oldImages.map((image,i)=><> <img src={image} className='m-2' width={50} height={50}/>
                      <span style={{position:'relative',top:'-20px',left:'-7px' ,cursor:'pointer'}}onClick={()=>handleRemoveImage(i,image)}>X</span>  
                     </>
                    )}
                </>            
                 }

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value })}/>
              </Form.Group>
              <Button variant='primary' type="submit" className="mt-3">{id ?"Update ":"Add "} Product</Button>
          </Form>
            </Card.Body>
        </Card>
  </Container>
  )
}

export default AddProduct
