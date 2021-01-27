import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Menu from "../core/Menu"

var x = parseInt(Math.random()*10), y = parseInt(Math.random()*10), result = x + y;

const Signup = () => {
  const [values, setValues] = useState({ username: "", email: "", password: "", error: "", success: false });
  const { username, email, password, error, success } = values;
  const handleChange = name => event => setValues({ ...values, error: false, [name]: event.target.value });
  
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ username, email, password })
      .then( data => 
      {
        if (data.error) 
          setValues({ ...values, error: data.error, success: false });
        
        else 
          setValues({...values, username: "", email: "", password: "", error: "", success: true});
        
      })
      .catch(console.log("Error in signup"));
  };

  const handleCheck = (e) => {
    console.log(e.target.value)
    setAnswer(e.target.value);
    setIsCorrect(e.target.value == result);
    console.log("answer ", answer , "result" , isCorrect)
  }

  const signUpForm = () => {
    return (
      <div>
      <div style={{'margin-top' : '10%'}}><h1>Signup</h1></div>
        {successMessage()}
        {errorMessage()}
      <div className="row mt-4">

        <div className="col-md-6 offset-sm-3 text-left">
          <form>

            <div className="form-group">
              <label>Username</label>
              <input className="form-control" onChange={handleChange("username")} type="text" value={username} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input onChange={handleChange("password")} className="form-control" type="password" value={password} />
            </div>

            <div className="form-group">
              What is {x} + {y} = ? 
              <input className="ml-2" type="Number" value={answer} onChange={e => handleCheck(e)} />
            </div>

            <button disabled={!isCorrect} onClick={onSubmit} className="btn btn-success btn-block"> Submit </button>

          </form>

          <Link to="/signup"><center className="mt-3">Already have a Account 
          </center></Link>

        </div>
      </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{ display: success ? "" : "none" }} >
            New account was created successfully. Please <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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

  return (
    <div> 
      <Menu />

      <div className="center container col-lg-8 col-md-8">
        {signUpForm()}
      </div>
    </div>
  );
};

export default Signup;
