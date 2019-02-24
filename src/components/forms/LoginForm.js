import React from 'react';
import { Link } from "react-router-dom";
import Validator from 'validator';
import PropTypes from 'prop-types';


class LoginForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
     });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data).catch(err =>
        this.setState({ errors: err.response.data.errors })
      );
    }
  }

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid Email'
    if (!data.password) errors.password = "Password can't be blank"
    return errors;
  }

  render () {

    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {errors.global && (
          <div className="alert alert-danger">{errors.global}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={this.onChange}
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>

        <small className="form-text text-center">
          <Link to="/signup">Sign up</Link> to create an account<br />
          <Link to="/forgot_password">Forgot Password?</Link>
        </small>
      </form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default LoginForm;
