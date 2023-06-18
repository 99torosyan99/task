import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  newEmployee,
} from "../../Redux/dataSlice/dataSlice";
import Switches from "../Parts/Switches/Switches";
import Add from "../Form/Add";
import filterData from "../../Helpers/filterData";
import Validation from "../../Helpers/Validation";
import MoonLoader from "react-spinners/MoonLoader";
import EmployeesItem from "./EmployeesItem";


import "./Employees.css";



export default function Employees() {
  const dispatch = useDispatch();
  const [ind, setInd] = useState(0);

  const prop = [
    { type: "text", name: "Name",valName:'name' },
    { type: "text", name: "Surname" ,valName:'surname'},
    { type: "text", name: "Email" ,valName:'email'},
    { type: "text", name: "Position" ,valName:'position'},
  ];

  const data = useSelector((data) => filterData(data.data, 4));
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  function addEmployee(e) {
    e.preventDefault();

    const [name, surname, email, position] = e.target;

    const employee = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      position: position.value,
    };

    if (
      Validation.checkInput(name) &&
      Validation.checkInput(surname) &&
      Validation.checkInput(email) &&
      Validation.checkInput(position)
    ) {
      dispatch(newEmployee(employee));
      e.target.reset();
    }
  }

  return (
    <div className="employees">
      <div className="container">
        <div className="employees-content">
          {data.length && data[ind] ? 
              data[ind].map((elem) => {
                return <EmployeesItem elem={elem} prop={prop} />;
              })
             : 
              <div className="loader">
                <MoonLoader />
              </div>
            }
        </div>
        <Switches setInd={setInd} data={data} />
      </div>
      <Add title={"New employee"} prop={prop} func={addEmployee} />
    </div>
  );
}
