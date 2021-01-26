import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Menu from '../core/Menu'
import UserBox from './UserBox';

import { getFollwerList } from '../core/helper/coreapicalls';
import { isAutheticated } from "../auth/helper";


function Followers() {

	const [followerList, setFollowerList] = useState([]);
	const [loading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getFollwerList(isAutheticated().user._id)
			.then(x => {
				if(x.error) setError(x.error)
				else {
					setIsLoading(false);
					setFollowerList(x);
				}
			})
	}, [reload])

	function rightPannel() {
		return (
			<div className="col-8 offset-2 ">
		      <div className="panel" id="followers">
		        <div className="panel-heading">
		          <h3 className="panel-title mt-5 mb-5 text-center">
		            <i className="icon md-check" aria-hidden="true"></i> Followers {followerList.length}
		          </h3>
		        </div>
		        <div className="panel-body">
		          <ul className="list-group list-group-dividered list-group-full">

		          {followerList.map(function(value, index){
		              return (
  	          			<li className="list-group-item" key={index}>
  	          			  <div className="media">
  	          			    <div className="media-left">
  	          			    <Link to={{ pathname: '/user' , state : {id : value._id} }}>
  	          			     	<div className="avatar avatar-online">
  	          			     	  <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="60" height="60" />
  	          			     	</div>
  	          			    </Link>
  	          			      
  	          			    </div>
  	          			    <div className="media-body">
  	          			      <div className="pull-right">
  		          			    <Link to={{ pathname: '/user' , state : {id : value._id} }}>
  		          			      	<button className="btn btn-info btn-sm waves-effect waves-light"> Profile</button>
  		          			    </Link>
  	          			      </div>
  	          			      <div>
  	          			      	<Link to={{ pathname: '/user' , state : {id : value._id} }}>
  	          			      	  	<p className="mt-2 ml-3 waves-effect waves-light"> @{value.username}</p>
  	          			      	</Link>
  	          			      </div>
  	          			      <small className="ml-3">{value.email }</small>
  	          			    </div>
  	          			  </div>
  	          			</li>
		              )
		          })}

		          </ul>
		        </div>
		      </div>
			</div>
		)
	}
	 
	return (

		<div>
			<Menu />
			{loading ? 
				( <h1>Loading ...</h1>) 
				: 
				(<div className="row">
					{rightPannel()}
				</div>)
			}			
		</div>
	)
}

export default Followers




// <pre>
// 	{followerList.map(function(value, index){
// 	    return (<li key={index}>{value.email}</li>)
// 	})}
// </pre>