import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DeleteEdit from "../Parts/DeleteEdit/DeleteEdit";
import {  deleteEmployee } from "../../Redux/dataSlice/dataSlice";
import { useDispatch } from "react-redux";



export default function EmployeesItem({elem,prop}) {
  const dispatch = useDispatch()

  return (
    <div className="employees-content__item">
      <Link to={`/employees/employ/${elem.id}`} className="employees-link">
        <div className="employees-content__icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="employees-content__info">
          <span className="employees-content__name">Name:{elem.name}</span>
          <span className="employees-content__surname">
            Surname:{elem.surname}
          </span>
          <span className="employees-content__mail">Email:{elem.email}</span>
          <span className="employees-content__position">
            Position:{elem.position}
          </span>
        </div>
      </Link>
      <DeleteEdit
        elem={{...elem,funcInd:1}}
        prop={prop}
        func={() => dispatch(deleteEmployee(elem.id))}
        link={"/employees/edit"}
      />
    </div>
  );
}
