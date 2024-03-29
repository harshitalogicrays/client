import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { useSelector } from 'react-redux'
import { selectCategories } from '../../redux/categorySlice'

const AddCategory = () => {
    let [category,setCategory]=useState({title:'',desc:''})
    const navigate=useNavigate()

    //edit 
    const {id}=useParams()
    const allcategories=useSelector(selectCategories)
    useEffect(()=>{
        if(id){            
            const categoryEdit=allcategories.find(c=>c.id==id)
            setCategory({...categoryEdit})
        }
        else {
            setCategory({title:'',desc:''})
        }
    },[id])


    let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){
                try{
                    const docRef=collection(db,'categories')
                    await addDoc(docRef,{...category,createdAt:Timestamp.now().toMillis()})
                    toast.success("category added")
                    navigate('/admin/viewcategories')
                }
                catch(error){toast.error(error.message)}
        }
        else {
            try{
                const docRef=doc(db,'categories',id)
                await setDoc(docRef,{
                    title:category.title,
                    desc:category.desc,
                    createdAt:category.createdAt,
                    editedAt:Timestamp.now().toMillis()})
                toast.success("category updated")
                navigate('/admin/viewcategories')
            }
            catch(error){toast.error(error.message)}
        }
       
    }
  return (
    <Container className='mt-5 shadow p-2'>
        <Card>
            <Card.Header>
                <h4>Add Category 
                    <Button variant="primary" type="button" as={Link} to='/admin/viewcategories' className='float-end'>View Categories</Button></h4>
            </Card.Header>
            <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name='title' value={category.title} onChange={(e)=>setCategory({...category,title:e.target.value})} placeholder='enter category title'/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control    as="textarea"  name="desc"  value={category.desc} onChange={(e)=>setCategory({...category,desc:e.target.value})} />
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default AddCategory
