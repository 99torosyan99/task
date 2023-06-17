import React from "react";
import { useDispatch } from "react-redux";
import { searchTask } from "../../Redux/tasksSlice/tasksSlice";
import changeDate from "../../Helpers/changeDate";

export default function TaskSearch() {
  const dispatch = useDispatch();
  function taskInf(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;
    const startDate = changeDate(e.target[2].value);
    const endDate = changeDate(e.target[3].value);

    const task = {
      name,
      description,
      startDate,
      endDate,
    };
    dispatch(searchTask(task));
  }
  return (
    <form onSubmit={taskInf} className="task-search">
      <div className="task-search__item">
        <input type="text" className="task-search__input" placeholder="Name"/>
      </div>
      <div className="task-search__item">
        <input type="text"  className="task-search__input" placeholder="Description"/>
      </div>
      <div className="task-search__item">
        <input type="date" className="task-search__input" />
      </div>
      <div className="task-search__item">
        <input type="date"  className="task-search__input"/>
      </div>
      <div className="task-search__item">
      <input type="submit" className="task-search__input" value='Find' />
      </div>
    </form>
  );
}
