import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Validation from "../../Helpers/Validation";
import { changeEmployee } from "../../Redux/dataSlice/dataSlice";
import { editTask } from "../../Redux/tasksSlice/tasksSlice";
import changeDate from "../../Helpers/changeDate";

import "./Edit.css";


export default function Edit() {
  const loc = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [text, setText] = useState(loc.state.elem);

  function editEmployee(e) {
    e.preventDefault();

    const [name, surname, email, position] = e.target;

    const editObj = {
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
      dispatch(changeEmployee({ id: text.id, editObj }));
      nav("/employees");
    }
  }

  function taskEdit(e) {
    e.preventDefault();

    const [name, description, startDate, endDate] = e.target;

    const editObj = {
      name: name.value,
      description: description.value,
      startDate: changeDate(startDate.value),
      endDate: changeDate(endDate.value),
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
      <form
        onSubmit={text.funcInd ? editEmployee : taskEdit}
        onChange={changeText}
        className="edit-form"
      >
        {loc.state.prop.map((elem, index) => {
          return (
            <div className="edit-form__item" key={index}>
              <label>{elem.name}</label>
              <input
                type={elem.type}
                value={text[elem.valName]}
                name={elem.valName}
                className="edit-form__input"
              />
              <p className="error__messenger"></p>
            </div>
          );
        })}
        <input type="submit" value="Edit" className="edit-form__input" />
      </form>
    </div>
  );
}
