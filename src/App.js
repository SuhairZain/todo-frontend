import React, { Component } from "react";
import "./App.css";

import plus from "./images/plus.svg";

import AddTodo from "./todo/AddTodo";
import ExistingTodo from "./todo/ExistingTodo";

import { BASE_PATH } from "./utils/config";

class App extends Component {
  state = {
    error: undefined,
    items: undefined
  };

  setErrorMessage = error => {
    this.setState(state => ({
      ...state,
      error
    }));
  };

  componentDidMount() {
    fetch(`${BASE_PATH}`)
      .then(response => response.json())
      .then(todos => {
        this.setState(state => ({
          ...state,
          items: todos
        }));
      })
      .catch(this.setErrorMessage);
  }

  onAddSuccess = (_id, text) => {
    this.setState(state => ({
      ...state,
      items: [...state.items, { _id, done: false, text }]
    }));
  };

  onUpdateTodoSuccess = (_id, done, text) => {
    this.setState(state => ({
      ...state,
      items: state.items.reduce(
        (acc, curr) => [
          ...acc,
          curr._id === _id
            ? {
                _id,
                done,
                text
              }
            : curr
        ],
        []
      )
    }));
  };

  onDeleteTodoSuccess = id => {
    this.setState(state => ({
      ...state,
      items: state.items.filter(({ _id }) => id !== _id)
    }));
  };

  renderLoadingOrError = error =>
    <div className="App-loading-error">
      <span>
        {error ? `An erorr occured: ${error.message}` : "Loading please wait."}
      </span>
    </div>;

  renderTodoItems = items =>
    <div>
      {items.map(({ _id, done, text }) =>
        <ExistingTodo
          key={_id}
          _id={_id}
          done={done}
          text={text}
          onDeleteSuccess={this.onDeleteTodoSuccess}
          onUpdateSuccess={this.onUpdateTodoSuccess}
        />
      )}
    </div>;

  render() {
    const { error, items } = this.state;
    return (
      <div className="App">
        <div className="Content">
          <div className="App-header">
            <span className="App-header-title">Task Manager</span>
            <img src={plus} className="Plus-icon" />
          </div>
          <AddTodo onAddSuccess={this.onAddSuccess} />
          {items
            ? this.renderTodoItems(items)
            : this.renderLoadingOrError(error)}
        </div>
      </div>
    );
  }
}

export default App;
