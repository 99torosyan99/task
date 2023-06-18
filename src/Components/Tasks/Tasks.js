import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  postTasks,
} from "../../Redux/tasksSlice/tasksSlice";
import TaskSearch from "./TaskSearch";
import Switches from "../Parts/Switches/Switches";
import Add from "../Form/Add";
import { getEmployees } from "../../Redux/dataSlice/dataSlice";
import filterData from "../../Helpers/filterData";
import Validation from "../../Helpers/Validation";
import changeDate from "../../Helpers/changeDate";
import MoonLoader from "react-spinners/MoonLoader";
import TasksItem from "./TasksItem";

import "./Tasks.css";


export default function Tasks() {
  const tasks = useSelector((data) => filterData(data.tasks, 6));
  const data = useSelector((data) => data.data);
  const [ind, setInd] = useState(0);
  const dispatch = useDispatch();

  function addTask(e) {
    e.preventDefault();

    const [name, description, startDate, endDate, id] = e.target;
    
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
      e.target.reset();
    }
  }

  

  const prop = [
    { type: "text", name: "Name",valName:'name' },
    { type: "text", name: "Description",valName:'description' },
    { type: "date", name: "Date start",valName:'startDate' },
    { type: "date", name: "Date end",valName:'endDate' },
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
          {tasks.length && tasks[ind] ? 
            tasks[ind].map((elem) => {
              return <TasksItem  elem={elem} prop={prop}/>;
            })
           : 
            <div className="loader">
              <MoonLoader />
            </div>
            }
        </div>
        <Switches setInd={setInd} data={tasks} />
        <Add title={"New task"} prop={prop} func={addTask}>
          <div className="add-form__item">
            <label htmlFor="select">Choose an employee</label>
            <select className="add-form__input">
              <option></option>
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
