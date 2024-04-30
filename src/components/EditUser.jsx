import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdated } from "../redux/userSlice";

const EditUser = ({editForm, user}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [company, setCompany] = useState({name:user.company.name});
  const [error, setError] = useState("");

//   const usersCount = useSelector((state) => state.users.users.length);

  const handleName = (e) => setName(e.target.value);
  const handleCompany = (e) => setCompany({name:e.target.value});

  const handleClick = () => {
    if (name && company.name) {
      dispatch(
        userUpdated({
          id: user.id,
          name,
          company,
        })
      );
      
    }
    setCompany({name:''});
    setName("");
    editForm(false);
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

export default EditUser;
