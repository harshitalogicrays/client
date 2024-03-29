import React, { useState } from 'react'
import "./ImageThumbnail.css"
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import ReactImageMagnify from '@blacklab/react-image-magnify'
const ImageThumbnail = ({imgs}) => {
    const [image,setImage]=useState(imgs[0])
    const [index,setIndex]=useState(0)
    let handleImage=(i)=>{
        setIndex(i)
        setImage(imgs[i])
    }
    let handleNext=()=>{
        if(index < imgs.length-1){
            setIndex(index+1)
            setImage(imgs[index+1])
        }
      
    }

    let handlePrev=()=>{
        if(index > 0 ){
            setIndex(prev=>prev-1)
            setImage(imgs[index-1])
        }
      
    }
  return (
    <div>
        {/* <img src={image}  height={350} width={450}/>  */}

        <ReactImageMagnify
            imageProps={{
                alt : "loading",
                src : image,
                height : 200,
                width : 500
            }}
            magnifiedImageProps={{
                src: image,
                width: 1800,
                height: 800
            }}
            magnifyContainerProps ={{
                height : 200,
                width : 500
                }}
            portalProps ={{
                horizontalOffset : 10,
                verticalOffset:-100
                }}
        />

      <div className='flex_row'>
        <button onClick={()=>handlePrev()}><FaArrowLeft/></button>
            {imgs.map((im,i)=>         
                <div className='thumbnail' key={i}>
                    <img src={im} className={index==i ? 'clicked':''} onClick={()=>handleImage(i)} height={70} width={100}  />
                </div>
            )} 
            <button onClick={()=>handleNext()}><FaArrowRight/></button> 
         </div>
    </div>
  )
}

export default ImageThumbnail
