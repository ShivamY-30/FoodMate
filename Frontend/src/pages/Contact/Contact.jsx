import React, { useState } from "react";
import axios from "axios";
import { StoreContext } from "../../Store/StoreContextProvider";
import { useContext } from "react";

// For toasting the upload succesfull message
import { toast } from 'react-toastify'

const Contact = () => {
  // Step 1: Set Up State with useState
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    concern: ""
  });
  const {url} = useContext(StoreContext);

  // Step 2: Update the onChangeHandler Function
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Step 4: Handle Form Submission (Optional)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "api/contact/", formData);
      if(response.data.success){
        toast.success(response.data.message)
        setFormData({
          name: "",
          email: "",
          concern: ""
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <p>[Share your Queries or your suggestion so that we can improve!!]</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            onChange={onChangeHandler}
            name="name"
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            placeholder="Enter Your Name"
            value={formData.name}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={onChangeHandler}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={formData.email}
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputConcern">Concern</label>
          <textarea
            onChange={onChangeHandler}
            name="concern"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={formData.concern}
          ></textarea>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
