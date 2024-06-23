import React from 'react';
import { useSelector } from 'react-redux';
import FoodItems from '../FoodItems/FoodItems';
import "./FoodMain.css";
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addInitialItems } from '../../Store/food_listSlice';




const FoodMain = ({ category, setcategory }) => {

  const dispatch = useDispatch();
  const foodmainlist = useSelector((store) => store.food_list);


 
  const url = "http://localhost:8000/";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}api/food/list`);
      if (response.data) {
        setList(response.data.data);
        dispatch(addInitialItems(response.data.data)); // Dispatch action to update Redux state
      } else {
        // toast.error("Error fetching data");
        console.log("Error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => { 
    fetchList();
  }, [list]);


  return (
    <>
    <div id='menu' className="container">
      <div className='food-display' id='food-display'>
        <h2 >Top Dishes - <span>{category}</span> </h2>
        <div className='inner'>
          <div className="food-item-display explore-menu-listt">
            {list.map((item, index) => {
              if (category === "All" || item.category === category) {
                return (
                  <FoodItems
                  key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                );
              }
              
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FoodMain;
