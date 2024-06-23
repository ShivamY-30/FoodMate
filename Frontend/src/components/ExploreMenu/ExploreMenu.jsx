import React from 'react'
import "./ExploreMenu.css"
import {  useSelector } from 'react-redux';

const ExploreMenu = ({category , setcategory}) => {

    const menu_list = useSelector((store) => store.item);

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu List</h1>
        <p className="explore-menu-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eveniet nisi atque ducimus voluptatibus quod dolores amet praesentium quam voluptas!</p>
        <div className="explore-menu-list">
            {menu_list.map((list , index) =>{
                return (
                <div onClick={() =>{
                    setcategory(prev => prev === list.menu_name ? "All" : list.menu_name)
                }} className="explore-menu-list-item curser" 
                key={index}>
                    <img className={category === list.menu_name ? "active" : ""} src={list.menu_image} alt="" />
                    <p>{list.menu_name}</p>
                </div>
              
                )
            })}
        </div>
        <hr />

    </div>
    
  )
  
}

export default ExploreMenu
