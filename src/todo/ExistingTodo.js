import React, { Component } from "react";
import PropTypes from "prop-types";

import doneIcon from "./done.svg";
import remove from "./delete.svg";
import undone from "./undone.svg";

import TodoItem from "./TodoItem";

import { BASE_PATH } from "../utils/config";

class ExistingTodo extends Component {
  updateTodo = (done, text) => {
    const { onUpdateSuccess } = this.props;
    return fetch(`${BASE_PATH}/${this.props._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        done: done,
        text: text
      })
    }).then(() => {
      onUpdateSuccess(this.props._id, done, text);
      return;
    });
  };

  onToggle = () => {
    const { done, text } = this.props;
    return this.updateTodo(!done, text);
  };

  onSubmit = async text => {
    if (text.length === 0) {
      return;
    }
    const { done } = this.props;
    return this.updateTodo(done, text);
  };

  onDelete = () => {
    const { _id } = this.props;
    return fetch(`${BASE_PATH}/${_id}`, {
      method: "DELETE"
    }).then(() => {
      this.props.onDeleteSuccess(_id);
      return;
    });
  };

  render() {
    const { _id, done, text } = this.props;
    return (
      <TodoItem
        _id={_id}
        classNames={done ? ["Todo-item-root-done"] : []}
        leftIcon={done ? doneIcon : undone}
        text={text}
        onLeft={this.onToggle}
        leftAlt={`Mark this as ${done ? "done" : "undone"}`}
        onSubmit={this.onSubmit}
        rightIcon={done ? remove : null}
        rightAlt={done ? "Remove this item" : ""}
        onRight={this.onDelete}
      />
    );
  }
}

ExistingTodo.propTypes = {
  _id: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired
};

export default ExistingTodo;
