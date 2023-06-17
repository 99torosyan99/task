import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getTasks,
  postTasks,
} from "../../Redux/tasksSlice/tasksSlice";
import TaskSearch from "./TaskSearch";
import Switches from "../Parts/Switches/Switches";
import DeleteEdit from "../Parts/DeleteEdit/DeleteEdit";
import Add from "../Form/Add";
import { getEmployees } from "../../Redux/dataSlice/dataSlice";
import filterData from "../../Helpers/filterData";
import Validation from "../../Helpers/Validation";
import changeDate from "../../Helpers/changeDate";
import MoonLoader from "react-spinners/MoonLoader";

import "./Tasks.css";

export default function Tasks() {
  const tasks = useSelector((data) => filterData(data.tasks, 6));
  const data = useSelector((data) => data.data);
  const [ind, setInd] = useState(0);
  const dispatch = useDispatch();

  function addTask(e) {
    e.preventDefault();

    const name = e.target[0];
    const description = e.target[1];
    const startDate = e.target[2];
    const endDate = e.target[3];
    const id = e.target[4];

    const task = {
      name: name.value,
      description: description.value,
      startDate: changeDate(startDate.value),
      endDate: changeDate(endDate.value),
      employeeId: id.value,
    };
    if (
      Validation.checkInput(name) &&
      Validation.checkInput(description) &&
      Validation.checkData(startDate, endDate) &&
      Validation.checkSelect(id)
    ) {
      dispatch(postTasks(task));
    }
  }
  const prop = [
    { type: "text", name: "Name" },
    { type: "text", name: "description" },
    { type: "date", name: "Date start" },
    { type: "date", name: "Date end" },
  ];

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getEmployees());
  }, []);

  return (
    <div className="tasks">
      <div className="container">
        <TaskSearch />
        <div className="tasks-content">
          {tasks.length &&
            tasks[ind] ?
            tasks[ind].map((elem) => {
              return (
                <div className="tasks-content__item" key={elem.id}>
                  <span>Name: {elem.name}</span>
                  <span>Description: {elem.description}</span>
                  <span>Start date: {elem.startDate}</span>
                  <span>End date: {elem.endDate}</span>
                  <DeleteEdit
                    elem={elem}
                    link={"/tasks/edit"}
                    func={() => dispatch(deleteTask(elem.id))}
                  />
                </div>
              );
            }) : <div className="loader">  <MoonLoader /></div>}
        </div>
        <Switches setInd={setInd} data={tasks} />
        <Add title={"New task"} prop={prop} func={addTask}>
          <div className="add-form__item">
            <select className="add-form__input">
              <option>---</option>
              {data.length &&
                data.map((elem) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })}
            </select>
            <p className="error__messenger"></p>
          </div>
        </Add>
      </div>
    </div>
  );
}
