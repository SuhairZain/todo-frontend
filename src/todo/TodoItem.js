import React, { Component } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import "./TodoItem.css";

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text || ""
    };
  }

  componentWillReceiveProps = ({ text }) => {
    this.setState(state => ({
      ...state,
      text
    }));
  };

  onTextChange = e => {
    const text = e.target.value;
    this.setState(state => ({
      ...state,
      text
    }));
  };

  callAction = action => {
    this.setState(state => ({
      ...state,
      loading: true
    }));
    action().then(() => {
      this.setState(state => ({
        ...state,
        loading: false
      }));
    });
  };

  onLeft = () => {
    this.callAction(this.props.onLeft);
  };

  onRight = () => {
    this.callAction(this.props.onRight);
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      ...state,
      loading: true
    }));
    this.props.onSubmit(this.state.text).then(() => {
      this.setState(state => ({
        ...state,
        loading: false
      }));
    });
  };

  render() {
    const { classNames, leftIcon, leftAlt, rightIcon, rightAlt } = this.props;
    return (
      <div className={classnames("Todo-item-root", classNames)}>
        <img
          src={leftIcon}
          alt={leftAlt}
          className="Todo-item-tick"
          onClick={this.onLeft}
        />
        <form className="Todo-text-form" onSubmit={this.onSubmit}>
          <input
            className="Todo-text"
            value={this.state.text}
            onChange={this.onTextChange}
            onKeyPress={this.onKeyPress}
          />
        </form>
        {rightIcon &&
          <img
            alt={rightAlt || ""}
            src={rightIcon}
            className="Todo-item-delete-icon"
            onClick={this.onRight}
          />}
      </div>
    );
  }
}

TodoItem.propTypes = {
  classNames: PropTypes.array,
  leftIcon: PropTypes.string.isRequired,
  leftAlt: PropTypes.string.isRequired,
  rightIcon: PropTypes.string,
  rightAlt: PropTypes.string,
  text: PropTypes.string.isRequired,
  onLeft: PropTypes.func.isRequired,
  onRight: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

export default TodoItem;
