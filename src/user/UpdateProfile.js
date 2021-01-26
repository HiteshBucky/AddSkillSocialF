import React, { useState, useEffect } from "react";
import {useLocation, useHistory} from 'react-router-dom'

import Menu from "../core/Menu"
import { getUserDetails, updateUserInfo } from '../core/helper/coreapicalls';
import { isAutheticated } from "../auth/helper";

function UpdateProfile() {

	 let history = useHistory();
	 const userId = isAutheticated().user._id;

 	  const [userInfo, setUserInfo] = useState({});
  	const [values, setValues] = useState({ firstname: "", lastname: "", email: "", error: "", success: false });
  	const handleChange = name => event => setValues({ ...values, error: '', [name]: event.target.value });
  	const { firstname, lastname, email, error, success } = values;

  	useEffect(() => {
    	getUserDetails(userId).then(x => {
    		if(x.error) { return alert("Unable to find user") }
    		else {
    			setValues({firstname : x.firstname, lastname : x.lastname, email : x.email});
    			setUserInfo(x);
    		}
    	}).catch(err => alert("Error Unable to find user"))
  	}, []);

  	function onSubmit (event)  {
	  	event.preventDefault();
	  	setValues({ ...values, error: false });
	  	updateUserInfo({...values}).then(data => {
  	      if (data.error) {
  	        	setValues({ ...values, error: data.error, success: false });
  	     	} else {
  	        	setValues({ ...values, firstname: "", lastname: "", phone: "", email: '', calories_per_day: '', error: "", success: true});
              return setTimeout( () => history.push('/profile'), 1000)
  	        }
  	    })
  	    .catch(console.log("Error in adding meal"));
  	};

  	const updateForm = () => {
  	  return (
  	  	<div>
  	    <div style={{'margin-top' : '5%'}}><h1><center>Update</center></h1></div>
	  	    <div className="row mt-5">
	  	      <div className="col-md-6 offset-sm-3 text-left">
	  	        <form>

	  	          <div className="form-group">
	  	            <label>Firstname</label>
	  	            <input className="form-control" onChange={handleChange("firstname")} type="text" value={firstname} />
	  	          </div>

	  	          <div className="form-group">
	  	            <label>Lastname</label>
	  	            <input className="form-control" onChange={handleChange("lastname")} type="text" value={lastname} />
	  	          </div>

	  	          <div className="form-group">
	  	            <label>Email</label>
	  	            <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
	  	          </div>

	  	          <button onClick={onSubmit} className="btn btn-success btn-block"> Submit </button>

	  	        </form>
	  	      </div>
  	    </div>
  	    </div>
  	  );
  	};

  	return (
  		<div>
  			<Menu />
  			{updateForm()}
  		</div>
  	)

}
export default UpdateProfile