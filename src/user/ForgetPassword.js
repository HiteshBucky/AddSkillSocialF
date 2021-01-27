import React, {useState} from 'react';
import Menu from "../core/Menu"
import { Link } from "react-router-dom";

import { handleForgetPassword } from '../core/helper/coreapicalls';


function ForgetPassword () {

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [data, setData] = useState({});

	const handleClick = event => {
		event.preventDefault();
		handleForgetPassword(email).then(x => {
			if(x.status === 400) {
				setMessage(x.message);
				setEmail('')
			}
			else if(x.status === 401) {
				alert(x.message)
				setEmail('')
			}
			else{
				setMessage(x.message);
				setData({token : x.token, id : x.id})
				setEmail('')
			}
		})
	}

	const successMessage = () => (
	    <div className="col-8 mt-3">
	      <div className="offset-4 text-left">
	      	{message.startsWith("Please") ==true ?
	      		<div className="alert alert-success" style={{ display: message ? "" : "none" }} >
	      		  <Link to={{ pathname: '/resetpassword' , state : {id : data.id, token : data.token} }}>This will is sent in email Click Here </Link>
	      		</div>
	      	 : (
	      		<div className="alert alert-success" style={{ display: message ? "" : "none" }} >
	      		  {message}
	      		</div>
	      	)}
	        
	      </div>
	    </div>
	);

	return (
		<div>
			<Menu />
		    <div>
			    <div style={{'margin-top' : '5%'}} className="text-center"><h1>Forget Password</h1></div>

			    <div className="text-center p-b-20 text-danger" style={{'margin-top' : '5%'}}>
			        <span className="txt2">
			            No Problem! Enter your email below and we will send you an email with instruction to reset your password.
			        </span>
			    </div>

			    {successMessage()}

			    <div className="row" style={{'margin-top' : '5%'}}>

			      <div className="col-md-6 offset-sm-3 text-left">
			        <form>


			          <div className="form-group">
			            <label>Email</label>
			            <input value={email} required className="form-control" type="email" onChange={e => {setEmail(e.target.value); setMessage('');} } />
			          </div>

			          <button onClick={handleClick} className="btn btn-success btn-block">Reset Link</button>
			        </form>

			      </div>
			    </div>
		    </div>
		</div>
	)
}

export default ForgetPassword;