import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";


import Menu from "../core/Menu"

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({ email: "", password: "", error: "", loading: false, didRedirect: false });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => setValues({ ...values, error: false, [name]: event.target.value });


  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        console.log('data', data)
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => setValues({ ...values, didRedirect: true }));
        }
      })
      .catch(console.log("Signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to={"/" } />;
    }
    if (isAutheticated()) {
      return <Redirect to="/signin" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info"> <h2>Loading...</h2> </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{ display: error ? "" : "none" }} >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (

      <div>
      <div style={{'margin-top' : '10%'}}><h1>Signin</h1></div>
        {loadingMessage()}
        {errorMessage()}
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>

            <div className="form-group">
              <label>Email</label>
              <input onChange={handleChange("email")} value={email} className="form-control" type="email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input onChange={handleChange("password")} value={password}className="form-control"type="password" />
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
          </form>

          <Link to="/forgetpassword"><center className="mt-3">Forget Password</center></Link>

          <Link to="/signup"><center className="mt-3">Don't Have an account</center></Link>

        </div>
      </div>
      </div>
    );
  };

  return (
    <div> 
      <Menu />
      <div className="center container col-lg-8 col-md-8">
        
        {signInForm()}
        {performRedirect()}
      </div>
    </div>
  );
};

export default Signin;
