import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editTask } from "../../Redux/tasksSlice/tasksSlice";

import "./Edit.css";
import Validation from "../../Helpers/Validation";

export default function EditTask() {
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (!loc.state.elem) {
        throw new Error("errrooor");
      }
    } catch (err) {
      nav("/employees");
    }
  });
  const [text, setText] = useState(loc.state.elem);

  function edit(e) {
    e.preventDefault();
    const name = e.target[0];
    const description = e.target[1];
    const startDate = e.target[2];
    const endDate = e.target[3];

    const editObj = {
      name: name.value,
      description: description.value,
      startDate: startDate.value,
      endDate: endDate.value,
      employeeId: text.employeeId,
    };

    if (
      Validation.checkInput(name) &&
      Validation.checkInput(description) &&
      Validation.checkData(startDate, endDate)
    ) {
      dispatch(editTask({ id: text.id, editObj }));
      nav("/tasks");
    }
  }

  function changeText(e) {
    setText({ ...text, [e.target.name]: e.target.value });
  }

  return (
    <div className="edit">
      <h3 className="edit__title">Edit</h3>
      <form onSubmit={edit} onChange={changeText} className="edit-form">
        <div className="edit-form__item">
          <label>Name</label>
          <input
            type="text"
            className="edit-form__input"
            name="name"
            value={text.name}
          />
           <p className='error__messenger'></p>
        </div>
        <div className="edit-form__item">
          <label>Description</label>
          <input
            type="text"
            className="edit-form__input"
            name="description"
            value={text.description}
          />
           <p className='error__messenger'></p>
        </div>
        <div className="edit-form__item">
          <label>Date start</label>
          <input
            type="date"
            className="edit-form__input"
            name="startDate"
            value={text.startDate}
          />
           <p className='error__messenger'></p>
        </div>
        <div className="edit-form__item">
          <label>Date end</label>
          <input
            type="date"
            value={text.endDate}
            name="endDate"
            className="edit-form__input"
          />
           <p className='error__messenger'></p>
        </div>
        <input type="submit" value="Edit" className="edit-form__input" />
      </form>
    </div>
  );
}
