// uploadFoodData.js

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

// Define food data
const foodList = [
    {
        name: "Greek salad",
        image: "food_1.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Veg salad",
        image: "food_2.jpg",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Clover Salad",
        image: "food_3.jpg",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Chicken Salad",
        image: "food_4.jpg",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Lasagna Rolls",
        image: "food_5.jpg",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Peri Peri Rolls",
        image: "food_6.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Chicken Rolls",
        image: "food_7.jpg",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Veg Rolls",
        image: "food_8.jpg",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Ripple Ice Cream",
        image: "food_9.jpg",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Fruit Ice Cream",
        image: "food_10.jpg",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Jar Ice Cream",
        image: "food_11.jpg",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Vanilla Ice Cream",
        image: "food_12.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Chicken Sandwich",
        image: "food_13.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Vegan Sandwich",
        image: "food_14.jpg",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Grilled Sandwich",
        image: "food_15.jpg",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Bread Sandwich",
        image: "food_16.jpg",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Cup Cake",
        image: "food_17.jpg",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Vegan Cake",
        image: "food_18.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Butterscotch Cake",
        image: "food_19.jpg",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Sliced Cake",
        image: "food_20.jpg",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Garlic Mushroom",
        image: "food_21.jpg",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Fried Cauliflower",
        image: "food_22.jpg",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Mix Veg Pulao",
        image: "food_23.jpg",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Rice Zucchini",
        image: "food_24.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Cheese Pasta",
        image: "food_25.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Tomato Pasta",
        image: "food_26.jpg",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Creamy Pasta",
        image: "food_27.jpg",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Chicken Pasta",
        image: "food_28.jpg",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Buttter Noodles",
        image: "food_29.jpg",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Veg Noodles",
        image: "food_30.jpg",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Somen Noodles",
        image: "food_31.jpg",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Cooked Noodles",
        image: "food_32.jpg",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
];

// Function to upload food data
const uploadFoodData = async () => {
  for (const food of foodList) {
    const formData = new FormData();
    formData.append("name", food.name);
    formData.append("description", food.description);
    formData.append("price", food.price);
    formData.append("category", food.category);
    formData.append("image", fs.createReadStream(path.join(__dirname, 'public/uploads', food.image)));

    try {
      const response = await axios.post("http://localhost:8000/add-food", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(`Uploaded: ${food.name}`, response.data);
    } catch (error) {
      console.error(`Failed to upload: ${food.name}`, error);
    }
  }
};

uploadFoodData();
