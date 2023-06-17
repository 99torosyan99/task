import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { giveEmployee } from "../../Redux/dataSlice/dataSlice";
import { giveTask } from "../../Redux/tasksSlice/tasksSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MoonLoader from "react-spinners/MoonLoader";

export default function Employee() {
  const id = useParams().id;
  const data = useSelector((data) => data.data);
  const task = useSelector((data) => data.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(giveEmployee(id));
    dispatch(giveTask(id));
  }, []);
  return (
    <div className="employee">
      <div className="container">
        <div className="employee-top">
          <div className="employee-top__icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="employee-top-info">
            <span className="employee-top-info__name">Name:{data.name}</span>
            <span className="employee-top-info__surname">
              Surname:{data.surname}
            </span>
            <span className="employee-top-info__mail">Email:{data.email}</span>
            <span className="employee-top-info__position">
              Position:{data.position}
            </span>
          </div>
        </div>
        <div className="employee-task">
          {task.length ? task.map((elem) => (
            <div className="employee-task__item" key={elem.id}>
              <span>Name: {elem.name}</span>
              <span>Description: {elem.description}</span>
              <span>Start date: {elem.startDate}</span>
              <span>End date: {elem.endDate}</span>
            </div>
          )): <div className="loader">  <MoonLoader /></div>}
        </div>
      </div>
    </div>
  );
}
