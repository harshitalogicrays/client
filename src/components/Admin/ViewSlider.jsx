import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Table } from 'react-bootstrap'
import useFetchCollection from '../../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectsliders, store_sliders } from '../../redux/sliderSlice'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'
const ViewSlider = () => {
  const {data,isLoading}=useFetchCollection("sliders")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_sliders(data))
  },[data])
  const allSlider=useSelector(selectsliders)
  let handleDelete=async(id,image)=>{
    if(window.confirm("are you sure to delete this??")){
      try{
         deleteObject(ref(storage,image))
         deleteDoc(doc(db,"sliders",id))
        toast.success("slider deleted")
      }
      catch(err){toast.error(err.message)}
    }
  } 
  return (
    <Container className='mt-5 shadow p-2'>
    <Card>
        <Card.Header>
            <h4>View Sliders 
                <Button type="button" variant="danger" as={Link} to='/admin/addslider' className='float-end'>Add Slider</Button></h4>
        </Card.Header>
        <Card.Body>
        <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allSlider.length==0 && <tr><td colSpan={6}>No slider Found</td></tr>}
                {allSlider.map((s,i)=>
                <tr key={s.id}>
                  <td>{i+1}</td>
                  <td>{s.title}</td>
                  <td><img src={s.image} height={50} width={50}/></td>
                  <td>{s.desc}</td>
                  <td>{s.status=="active" ? <span class="badge rounded-pill text-bg-success">Active</span>
                   :<span class="badge rounded-pill text-bg-danger">Inactive</span>}</td>
                  <td>
                    <Button variant="success" className='me-2' 
                    as={Link} to={`/admin/editslider/${s.id}`}><FaPen/></Button>
                    <Button variant="danger" onClick={()=>handleDelete(s.id,s.image)}><FaTrashAlt/></Button>
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

export default ViewSlider
