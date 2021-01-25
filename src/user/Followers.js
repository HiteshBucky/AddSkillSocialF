import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";


import Menu from '../core/Menu'


import { getFollwerList } from '../core/helper/coreapicalls';
import { isAutheticated } from "../auth/helper";


function Followers() {

	const [followerList, setFollowerList] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		console.log('fetching all followers')
		getFollwerList(isAutheticated().user._id)
			.then(x => {
				if(x.error) setError(x.error)
				else {
					console.log("Followes List", x[0].username)
					setFollowerList(x);
				}
			})
	}, [])

	// function leftPannel() {

		console.log("HEllo", JSON.stringify(followerList.email) )
	

	// 	return (
	// 		<div className="col-md-4">
	// 		  	<div className="card text-white bg-dark border border-info ">
	// 			    <div className="card-header lead d-flex justify-content-between align-items-center">
	// 			    	<h4 className="d-flex flex-row"> @{followerList.username}</h4>
	// 			    </div>
	// 			    <div className="card-body">
	// 			      	<div className="rounded border border-white p-2">
	// 			           	<img src="https://i.imgur.com/UXdKE3o.jpg" style={{ maxHeight: "50%", maxWidth: "100%" }} className="mb-3 rounded" />
	// 			        </div>
	// 			      	<p className="lead bg-white font-weight-bold text-dark text-wrap"><center>{followerList.email}</center></p>

	// 			      	<div className="d-flex justify-content-around">
	// 			      		<div className="d-flex justify-content-around">
	// 			      			<Link to="/followers">
	// 			      				<button className="btn btn-danger">Followers</button>
	// 			      			</Link>
	// 			      		</div>
	// 			      		<div className="d-flex justify-content-around">
	// 			      			<Link to="/following" >
	// 			      				<button className="btn btn-danger">Following</button>
	// 			      			</Link>
	// 			      		</div>
	// 			      	</div>
	// 			    </div>
	// 		  	</div>
	// 		</div>
	// 	)
	// }

	function rightPannel() {
		return (
			<div className="col-8">
		      <div className="panel" id="followers">
		        <div className="panel-heading">
		          <h3 className="panel-title">
		            <i className="icon md-check" aria-hidden="true"></i> Followers
		          </h3>
		        </div>
		        <div className="panel-body">
		          <ul className="list-group list-group-dividered list-group-full">

		            <li className="list-group-item">
		              <div className="media">
		                <div className="media-left">
		                  <a className="avatar avatar-online" href="javascript:void(0)">
		                    <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="50" height="50" />
		                    <i></i>
		                  </a>
		                </div>
		                <div className="media-body">
		                  <div className="pull-right">
		                    <button type="button" className="btn btn-info btn-sm waves-effect waves-light">Follow</button>
		                  </div>
		                  <div><a className="name" href="javascript:void(0)">Willard Wood</a></div>
		                  <small>@heavybutterfly920</small>
		                </div>
		              </div>
		            </li>


		          </ul>
		        </div>
		      </div>
			</div>
		)
	}
	 
	return (
		<div>
			<Menu />
			<h1>Followers Page</h1>

			<div className="mt-3 row ml-2 mr-2 mt-2">
				{rightPannel()}
				{rightPannel()}
				{rightPannel()}

				<pre> { JSON.stringify(followerList) }</pre>    

				<pre> { JSON.stringify(followerList[0]) }</pre> 

				<pre> { (followerList[0]['email']) }</pre> 


 
			</div>
			
		</div>
	)
}

export default Followers