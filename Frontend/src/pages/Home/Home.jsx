import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodMain from '../../components/FoodMain/FoodMain'
import { useContext } from 'react'



const Home = () => {

 

  const [category , setcategory] = useState('All');

  return (
    <div>
      <Header></Header>
      <ExploreMenu category = {category} setcategory= {setcategory}  ></ExploreMenu>
      <FoodMain category = {category} setcategory= {setcategory}  ></FoodMain>
    </div>
  )
}

export default Home
