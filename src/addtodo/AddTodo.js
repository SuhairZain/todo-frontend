import React, { Component } from "react";
import PropTypes from "prop-types";

import "./AddTodo.css";

import plus from "./plus-gray.svg";

const AddTodo = ({ done, text }) =>
  <div className="Add-todo-root">
    <img src={plus} className="Add-todo-plus-icon" />
    <input className="Add-todo-input" />
  </div>;

AddTodo.propTypes = {
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onTick: PropTypes.func,
  onDelete: PropTypes.func
};

export default AddTodo;
