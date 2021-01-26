import React, {useState, useEffect} from 'react';
import {useLocation, useHistory, Redirect} from 'react-router-dom'

import { updatePost, getPostInfo } from '../core/helper/coreapicalls';

function PostUpdate() {

	let postId  = useLocation()?.state?.postId;
	let history = useHistory();


	const [desciption, setDesciption] = useState("");
	const [message, setMessage] = useState('');

	useEffect(() => {
		getPostInfo(postId).then(x => {
			if(x.error) {
				setMessage(x.error)
				return setTimeout(() => {
					history.push('/')
				}, 1000)
			}
			else{
				setDesciption(x.description);
			}
		})
	},[]);

  	function onSubmit (event)  {
	  	event.preventDefault();
	  	updatePost(desciption, postId).then(x => {
	  		if(x.error) setMessage(x.error)
	  		else{
	  			setTimeout(() => {
	  				history.push('/profile')
	  			}, 1000)
	  			setMessage("Post Updated Successfully!!")
	  			setDesciption('')
	  		}
	  	})
	  	return;
  	};




	const PostForm = () => {
		return (
			<div>
				{message  && (
					<div className="row">
					  	<div className="col-md-6 offset-sm-3 text-left">
					    	<div className= {message == "Post Updated Successfully!!" ? "alert alert-success" : "alert alert-danger"} style={{ display: message ? "" : "none" }} >
					      	{message}
					    </div>
					  	</div>
					</div>
				)} 
		  	    <div style={{'margin-top' : '5%'}}><h1><center>Update Post</center></h1></div>
			  	    <div className="row mt-5">
			  	      <div className="col-md-6 offset-sm-3 text-left">
			  	        <form>

			  	          <div className="form-group">
			  	            <label>Description</label>
			  	            <input className="form-control" onChange={e => setDesciption(e.target.value)} type="text" value={desciption} />
			  	          </div>

			  	          <button onClick={onSubmit} className="btn btn-success btn-block"> Submit </button>

			  	        </form>
			  	      </div>
		  	    </div>
	  	    </div>
		)
	}
	

	return (
		<div>
			{PostForm()}
		</div>
	)
}

export default PostUpdate;