import React from "react";
import DeleteEdit from "../Parts/DeleteEdit/DeleteEdit";
import { deleteTask } from "../../Redux/tasksSlice/tasksSlice";
import { useDispatch } from "react-redux";


export default function TasksItem( {elem}) {
    const dispatch = useDispatch()
  return (
    <div className="tasks-content__item" key={elem.id}>
      <span className="task-content__name">Name: {elem.name}</span>
      <span className="task-content__description">
        Description: {elem.description}
      </span>
      <span className="task-content__start">Start date: {elem.startDate}</span>
      <span className="task-content__end">End date: {elem.endDate}</span>
      <DeleteEdit
        elem={elem}
        link={"/tasks/edit"}
        func={() => dispatch(deleteTask(elem.id))}
      />
    </div>
  );
}