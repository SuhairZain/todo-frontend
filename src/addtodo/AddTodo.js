import React from "react";
import PropTypes from "prop-types";

import "./AddTodo.css";

import plus from "./plus-gray.svg";

const AddTodo = () =>
  <div className="Add-todo-root">
    <img src={plus} alt="Add Todo" className="Add-todo-plus-icon" />
    <input className="Add-todo-input" />
  </div>;

AddTodo.propTypes = {
  onTick: PropTypes.func,
  onDelete: PropTypes.func
};

export default AddTodo;
