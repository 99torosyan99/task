import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  getEmployees,
  newEmployee,
} from "../../Redux/dataSlice/dataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Switches from "../Parts/Switches/Switches";
import DeleteEdit from "../Parts/DeleteEdit/DeleteEdit";
import Add from "../Form/Add";
import filterData from "../../Helpers/filterData";
import Validation from "../../Helpers/Validation";
import { ClipLoader } from "react-spinners";
import MoonLoader from "react-spinners/MoonLoader";

import "./Employees.css";

export default function Employees() {
  const dispatch = useDispatch();
  const [ind, setInd] = useState(0);
  const prop = [
    { type: "text", name: "Name" },
    { type: "text", name: "Surname" },
    { type: "text", name: "Email" },
    { type: "text", name: "Position" },
  ];

  const data = useSelector((data) => filterData(data.data, 4));
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  function addEmployee(e) {
    e.preventDefault();
    const name = e.target[0];
    const surname = e.target[1];
    const email = e.target[2];
    const position = e.target[3];

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
    }
  }

  return (
    <div className="employees">
      <div className="container">
        <div className="employees-content">
          {data.length ? data[ind] ? (
            data[ind].map((elem) => {
              return (
                <div className="employees-content__item" key={elem.id}>
                  <Link
                    to={`/employees/employ/${elem.id}`}
                    className="employees-link"
                  >
                    <div className="employees-content__icon">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="employees-content__info">
                      <span className="employees-content__name">
                        Name:{elem.name}
                      </span>
                      <span className="employees-content__surname">
                        Surname:{elem.surname}
                      </span>
                      <span className="employees-content__mail">
                        Email:{elem.email}
                      </span>
                      <span className="employees-content__position">
                        Position:{elem.position}
                      </span>
                    </div>
                  </Link>
                  <DeleteEdit
                    elem={elem}
                    func={() => dispatch(deleteEmployee(elem.id))}
                    link={"/employees/edit"}
                  />
                </div>
              );
            })
          ) : (
            <div className="loader">
              <MoonLoader />
            </div>
          ) : ''}
        </div>
        <Switches setInd={setInd} data={data} />
      </div>
      <Add title={"New employee"} prop={prop} func={addEmployee} />
    </div>
  );
}
