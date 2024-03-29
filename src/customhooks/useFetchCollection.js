import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

const useFetchCollection = (collectionname) => {
    let [data,setData]=useState([])
    let [isLoading,setIsLoading]=useState(false)
    let getCollectionData=()=>{
        setIsLoading(true)
        try{
            const docRef=collection(db,collectionname)
            const q=query(docRef,orderBy('createdAt','desc'))
            onSnapshot(q,(docSnap)=>{
                const alldata=docSnap.docs.map((doc)=>({...doc.data(),id:doc.id}))
                setData(alldata)
                setIsLoading(false)
            })
        }
        catch(error){ setIsLoading(false);toast.error(error.message)}
    }
useEffect(()=>{
    getCollectionData()
},[])

    return {data,isLoading}
}

export default useFetchCollection
