import React, { Component } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import "./TodoItem.css";

import remove from "./delete.svg";
import doneIcon from "./done.svg";
import undoneIcon from "./undone.svg";

const TodoItem = ({ done, text }) =>
  <div
    className={classnames("Todo-item-root", { "Todo-item-root-done": done })}
  >
    <img src={done ? doneIcon : undoneIcon} className="Todo-item-tick" />
    <span className="Todo-item-text">
      {text}
    </span>
    {!done && <img src={remove} className="Todo-item-delete-icon" />}
  </div>;

TodoItem.propTypes = {
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onTick: PropTypes.func,
  onDelete: PropTypes.func
};

export default TodoItem;
