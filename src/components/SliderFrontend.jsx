import React, { useEffect } from 'react'
import useFetchCollection from '../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectsliders, store_sliders } from '../redux/sliderSlice'

const SliderFrontend = () => {
    const dispatch=useDispatch()
    const {data,isLoading}=useFetchCollection("sliders")
    useEffect(()=>{
        dispatch(store_sliders(data))
    },[data])
    const allSliders=useSelector(selectsliders)
    const sliders=allSliders.filter(item=>item.status=="active")
  return (
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        {sliders.map((s,i)=>
            <div class="carousel-item active">
                 <img src={s.image} class="d-block w-100" height='300px' alt={s.title}/>
                 <div class="carousel-caption d-none d-md-block">
                    <h5>{s.title}</h5>
                    <p>{s.desc}</p>
      </div>
          </div>
        )}
      
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default SliderFrontend
