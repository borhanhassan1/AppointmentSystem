import React from "react";

function Input(props) {
  return (
    <div className="mb-3">
      <label className="form-label">{props.labelName}</label>
      <input
        className="form-control"
        type={props.type}
        name={props.labelName}
        value={props.value}
        onChange={props.handleChange}
      ></input>
    </div>
  );
}

export default Input;
