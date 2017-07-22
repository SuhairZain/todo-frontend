import React, { Component } from "react";
import PropTypes from "prop-types";

import plus from "./plus-gray.svg";

import TodoItem from "./TodoItem";

import { BASE_PATH } from "../utils/config";

class AddTodo extends Component {
  state = {
    text: ""
  };

  onSubmit = async text => {
    if (!text || text.length === 0) {
      return;
    }
    return fetch(`${BASE_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text
      })
    })
      .then(response => response.text())
      .then(_id => {
        this.props.onAddSuccess(_id, text);
        this.setState(state => ({
          ...state,
          text: ""
        }));
        return;
      });
  };

  render() {
    return (
      <TodoItem
        leftIcon={plus}
        leftAlt="Add new item"
        text={this.state.text}
        onSubmit={this.onSubmit}
        onLeft={this.onSubmit}
      />
    );
  }
}

AddTodo.propTypes = {
  onAddSuccess: PropTypes.func.isRequired
};

export default AddTodo;
