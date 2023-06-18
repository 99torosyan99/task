import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";

import "./DeleteEdit.css";

export default function DeleteEdit({ elem, func, link ,prop}) {
  return (
    <div className="deleteEdit">
      <button className="delete-button" onClick={func}>
        <FontAwesomeIcon icon={faX} color="red" fontSize={20} />
      </button>
      <Link className="edit-button" to={link} state={{ elem,prop }}>
        <FontAwesomeIcon icon={faEdit} color="blue" fontSize={20} />
      </Link>
    </div>
  );
}
