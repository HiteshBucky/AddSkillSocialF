import React, {useState} from 'react';
import Menu from "../core/Menu"
import {useLocation, useHistory} from 'react-router-dom'


import { handleResetPassword } from '../core/helper/coreapicalls';


function ResetPassword () {

	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	let userId  = useLocation()?.state?.id;
	let token  = useLocation()?.state?.token;

	let history = useHistory();

	const handleClick = event => {
		event.preventDefault();
		handleResetPassword(userId, token, password).then(x => {
			if(x.status === 400) {
				setMessage(x.message);
				setPassword('')
			}
			else if(x.status === 401) {
				alert(x.message)
				setPassword('')
			}
			else{

				setTimeout(() => {
					history.push('/signin')
				}, 800);

				setMessage(x.message);
				setPassword('')
			}
		})
	}

	const successMessage = () => (
	    <div className="col-8 mt-3">
	      <div className="offset-4 text-left">
	        <div className="alert alert-success" style={{ display: message ? "" : "none" }} >
	          {message}
	        </div>
	      </div>
	    </div>
	);

	return (
		<div>
			<Menu />
		    <div>
			    <div style={{'margin-top' : '5%'}} className="text-center"><h1>Reset Password</h1></div>

			    <div className="text-center p-b-20 text-danger" style={{'margin-top' : '5%'}}>
			        <span className="txt2">
			            Just Enter Your new Password. We will create a new password for you.
			        </span>
			    </div>

			    {successMessage()}

			    <div className="row" style={{'margin-top' : '5%'}}>

			      <div className="col-md-6 offset-sm-3 text-left">
			        <form>


			          <div className="form-group">
			            <label>Password</label>
			            <input value={password} required className="form-control" type="password" onChange={e => {setPassword(e.target.value); setMessage('');} } />
			          </div>

			          <button onClick={handleClick} className="btn btn-success btn-block">Submit</button>
			        </form>

			      </div>
			    </div>
		    </div>
		</div>
	)
}

export default ResetPassword;