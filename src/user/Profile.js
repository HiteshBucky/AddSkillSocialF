import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import {useLocation} from 'react-router-dom'
import { Link } from "react-router-dom";


import Menu from "../core/Menu"
import PostContainer from './PostContainer'

import {getUserDetails, getAllPostOfUser} from '../core/helper/coreapicalls'
import { isAutheticated } from "../auth/helper";


function Profile() {

	let  userId  = isAutheticated().user._id;

	const [userdata, setUserData] = useState({});
	const [allpost, setAllPost] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		getUserDetails(userId).then(x => {
			if(x.error) alert("Error!! Cant find user");
			else {
				setUserData(x);
			}
		})
	}, []);

	useEffect(() => {
		getAllPostOfUser(userId).then(x => {
			if(x.error) alert("Error", x.error)
			else {
				setAllPost(x)
			}
		})
	}, [])

	function leftPannel() {
		return (
			<div className="col-md-4">
			  	<div className="card text-white bg-dark border border-info ">
				    <div className="card-header lead d-flex justify-content-between align-items-center">
				    	<h4 className="d-flex flex-row">@{userdata.username}</h4>
				    </div>
				    <div className="card-body">
				      	<div className="rounded border border-white p-2">
				           	<img src="https://i.imgur.com/UXdKE3o.jpg" style={{ maxHeight: "50%", maxWidth: "100%" }} className="mb-3 rounded" />
				        </div>
				      	<p className="lead bg-white font-weight-bold text-dark text-wrap"><center>{userdata.email}</center></p>

				      	<div className="d-flex justify-content-around">
				      		<div className="d-flex justify-content-around">
				      			<Link to="/followers">
				      				<button className="btn btn-danger"> Followers</button>
				      			</Link>
				      		</div>
				      		<div className="d-flex justify-content-around">
				      			<Link to="/following" >
				      				<button className="btn btn-danger"> Following</button>
				      			</Link>
				      		</div>
				      	</div>
				    </div>
			  	</div>
			</div>
		)
	}

	function rightPannel() {
		return (
			<div className="col-8">
				{ allpost.map((post, index) => {
				  return (
				    <div key={index} className="col-">
				      <PostContainer key={index} post={post} reload={reload} setReload={setReload} />
				    </div>
				  );
				}) }
			</div>
		)
	}

	return (
		<div>
			<Menu />
			<div className="mt-3 row ml-2 mr-2 mt-2">
				{leftPannel()}
			    {rightPannel()}
			</div>
		</div>
	)
}

export default Profile