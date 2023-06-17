import React from 'react'

import './Add.css'

export default function Add(props) {
  return (
    <div className='add'>
       <h3 className="add__title">{props.title}</h3>
      <form className="add-form" onSubmit={props.func}>
        {props.prop.map((elem,index) => {
          return <div className="add-form__item" key={index}>
          <label htmlFor="position">{elem.name}</label>
          <input type={elem.type} id="position" className="add-form__input" />
          <p className='error__messenger'></p>
        </div>
        })}
        {props.children}
        <input type="submit" className="add-form__button" value="Add" />
      </form>
    </div>
  )
}
