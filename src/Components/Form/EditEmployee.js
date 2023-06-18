import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeEmployee } from "../../Redux/dataSlice/dataSlice";

import "./Edit.css";
import Validation from "../../Helpers/Validation";

export default function EditEmployee() {
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

    const [name, surname, email, position] = e.target;

    const editObj = {
      name:name.value,
      surname:surname.value,
      email:email.value,
      position:position.value,
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

  function changeText(e) {
    setText({ ...text, [e.target.name]: e.target.value });
  }

  return (
    <div className="edit">
      <h3 className="form__title">Edit</h3>
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
          <label>Surname</label>
          <input
            type="text"
            className="edit-form__input"
            name="surname"
            value={text.surname}
          />
           <p className='error__messenger'></p>
        </div>
        <div className="edit-form__item">
          <label>Email</label>
          <input
            type="text"
            className="edit-form__input"
            name="email"
            value={text.email}
          />
           <p className='error__messenger'></p>
        </div>
        <div className="edit-form__item">
          <label>Position</label>
          <input
            type="text"
            value={text.position}
            name="position"
            className="edit-form__input"
          />
           <p className='error__messenger'></p>
        </div>
        <input type="submit" value="Edit" className="edit-form__input" />
      </form>
    </div>
  );
}
