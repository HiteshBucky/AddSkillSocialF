import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import { Link } from "react-router-dom";

import { getAllUser } from '../core/helper/coreapicalls';

function People () {	

	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUser().then(x => {
			if(x.error) alert(x.error)
			return setUsers(x)
		})
	}, []);

	return (
		<div>
			<Menu/>

			<div className="col-8 offset-2">
			<div className="panel" id="followers">
			    <div className="panel-heading">													
			        <h3 className="panel-title text-center mt-5 mb-5">
			         	<i className="icon md-check" aria-hidden="true"></i> People
			        </h3>
			    </div>
			    <div className="panel-body">
			        <ul className="list-group list-group-dividered list-group-full">

			          	{users.map((user, index) => {
			          		return (

			          			<li className="list-group-item" key={index}>
			          			  <div className="media">
			          			    <div className="media-left">
			          			    <Link to={{ pathname: '/user' , state : {id : user._id} }}>
			          			     	<div className="avatar avatar-online">
			          			     	  <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="60" height="60" />
			          			     	</div>
			          			    </Link>
			          			      
			          			    </div>
			          			    <div className="media-body">
			          			      <div className="pull-right">
				          			    <Link to={{ pathname: '/user' , state : {id : user._id} }}>
				          			      	<button className="btn btn-info btn-sm waves-effect waves-light"> Profile</button>
				          			    </Link>
			          			      </div>
			          			      <div>
			          			      	<Link to={{ pathname: '/user' , state : {id : user._id} }}>
			          			      	  	<p className="mt-2 ml-3 waves-effect waves-light"> @{user.username}</p>
			          			      	</Link>
			          			      </div>
			          			      <small className="ml-3">{user.email }</small>
			          			    </div>
			          			  </div>
			          			</li>
			          		)
			          	})}

			        </ul>
			    </div>
			</div>
			</div>
		</div>
	)

}

export default People;