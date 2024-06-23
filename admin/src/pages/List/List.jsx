import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";

const List = ({url}) => {

  const [list,setList] = useState([]);

  

  // http://localhost:8000/images/1719031759957-Screenshot%202024-06-14%20193654.png

  const fetchList = async () => {
    const response = await axios.get(`${url}api/food/list`);
    // console.log(response.data.data);
    if (response.data) {
      setList(response.data.data)
    }
    else
    {
      toast.error("Error")
    }
  }

  // useEffect(()=>{
  //   fetchList();
  // })

  const removeFood = async(foodId) => {
    // console.log(foodId);
    // http://localhost:8000/api/food/delete
    const response = await axios.post(`${url}api/food/delete`,{id:foodId});
    await fetchList();
    if (response.data) {
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <>
    
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div  key={index} className='list-table-format'>
              <img src={`${url}images/${item.image}`} alt="Item Image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p  className='cursor' 
              onClick={() => {removeFood(item._id)}}
              >{<MdOutlineDeleteForever size={35} />}</p>
            </div>
          )
       })} 
      </div>
    </div>
    </>
  )
}

export default List