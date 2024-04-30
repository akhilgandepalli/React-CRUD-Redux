import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAdded } from "../redux/userSlice";

const AddUser = ({form}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [company, setCompany] = useState({name:''});
  const [error, setError] = useState("");

  const usersCount = useSelector((state) => state.users.users.length);

  const handleName = (e) => setName(e.target.value);
  const handleCompany = (e) => setCompany({name:e.target.value});

  const handleClick = () => {
    if (name && company.name) {
      dispatch(
        userAdded({
          id: usersCount + 1,
          name,
          company,
        })
      );
    }
    setCompany({name:''});
    setName("");
    form(false)
  };

  return (
    <div className="container">
    <div className="box">
    <h2>Add User</h2>
        <div className="form">
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="nameInput"
            value={name}
            onChange={handleName}
          />
          <label htmlFor="companyInput">Company</label>
          <input
            type="text"
            placeholder="Enter Company"
            id="companyInput"
            value={company.name}
            onChange={handleCompany}
          />
          <button className="button-primary" onClick={handleClick}>
            Add user
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
