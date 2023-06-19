import React from "react";
import DeleteEdit from "../Parts/DeleteEdit/DeleteEdit";
import { deleteTask, editTask } from "../../Redux/tasksSlice/tasksSlice";
import { useDispatch } from "react-redux";

export default function TasksItem( {elem,prop}) {
    const dispatch = useDispatch()
    
  return (
    <div className="tasks-content__item">
      <span className="task-content__name">Name: {elem.name}</span>
      <span className="task-content__description">
        Description: {elem.description}
      </span>
      <span className="task-content__start">Start date: {elem.startDate}</span>
      <span className="task-content__end">End date: {elem.endDate}</span>
      <DeleteEdit
        elem={{...elem,funcInd:0}}
        link={"/tasks/edit"}
        prop={prop}
        func={() => dispatch(deleteTask(elem.id))}
      />
    </div>
  );
}
