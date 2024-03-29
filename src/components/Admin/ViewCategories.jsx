import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Table } from 'react-bootstrap'
import useFetchCollection from '../../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, store_categories } from '../../redux/categorySlice'
import {FaPen, FaTrashAlt} from 'react-icons/fa'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
const ViewCategories = () => {
  const {data,isLoading}=useFetchCollection("categories")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_categories(data))
  },[data])
  
  const allcategories=useSelector(selectCategories)

  let handleDelete=async(id)=>{
    if(window.confirm("are you sure to delete this??")){
      try{
        await deleteDoc(doc(db,"categories",id))
        toast.success("category deleted")
      }
      catch(err){toast.error(err.message)}
    }
  }
  return (
    <Container className='mt-5 shadow p-2'>
      {isLoading && <Loader/>}
        <Card>
            <Card.Header>
                <h4>View Categories 
                    <Button type="button" variant="danger" as={Link} to='/admin/addcategory' className='float-end'>Add Category</Button></h4>
            </Card.Header>
            <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allcategories.length==0 && <tr><td colSpan={4}>No Category Found</td></tr>}
                {allcategories.map((c,i)=>
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.desc}</td>
                  <td>
                    <Button variant="success" className='me-2' 
                    as={Link} to={`/admin/editcategory/${c.id}`}><FaPen/></Button>
                    <Button variant="danger" onClick={()=>handleDelete(c.id)}><FaTrashAlt/></Button>
                  </td>
                </tr>
               )}
              </tbody>
    </Table>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default ViewCategories
