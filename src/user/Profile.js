import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import {useLocation} from 'react-router-dom'
import { Link } from "react-router-dom";


import Menu from "../core/Menu"
import PrivatePost from './PrivatePost'

import {getUserDetails, getAllPostOfUser} from '../core/helper/coreapicalls'
import { isAutheticated } from "../auth/helper";


function Profile() {

	let  userId  = isAutheticated().user._id;

	const [isLoadingUserDetail, setLoadingUserDetail] = useState(true);
	const [isLoadingPostList, setLoadingPostList] = useState(true);

	const [userdata, setUserData] = useState({});
	const [allpost, setAllPost] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setLoadingUserDetail(true);
		getUserDetails(userId).then(x => {
			if(x.error) alert("Error!! Cant find user");
			else {
				setUserData(x);
				console.log("Userdata", x)
				setLoadingUserDetail(false);
			}
		})
	}, []);

	useEffect(() => {
		setLoadingPostList(true);
		getAllPostOfUser(userId).then(x => {
			if(x.error) alert("Error", x.error)
			else {
				setAllPost(x);
				setLoadingPostList(false);
			}
		})
	}, [])

	function leftPannel() {
		return (
			<div className="col-md-4">
			  	<div className="card text-white bg-dark border border-info ">
				    <div className="card-header lead d-flex justify-content-between align-items-center">
				    	<h4 className="d-flex flex-row">@{userdata.username}</h4>
				    	<div className="d-flex justify-content-around">
				    		<Link to="/update">
				    			<button type="button" data-toggle="modal" data-target="#edit" data-uid="1" className="update btn btn-warning btn-sm"><span className="glyphicon glyphicon-edit"> Edit</span></button>
				    		</Link>
				    	</div>
				    </div>
				    <div className="card-body">
				      	<div className="rounded border border-white p-2">
				           	<img src="https://i.imgur.com/UXdKE3o.jpg" style={{ maxHeight: "50%", maxWidth: "100%" }} className="mb-3 rounded" />
				        </div>
				      	<p className="lead bg-white font-weight-bold text-dark text-wrap"><center>{userdata.email}</center></p>

				      	<div className="d-flex justify-content-around">
				      		<div className="d-flex justify-content-around">
				      			<Link to="/followers">
				      				<button className="btn btn-danger"> {userdata.followers.length} Followers</button>
				      			</Link>
				      		</div>

				      		<div className="d-flex justify-content-around">
				      			<Link to="/following" >
				      				<button className="btn btn-danger"> {userdata.follows.length} Following</button>
				      			</Link>
				      		</div>
				      	</div>

				      	<hr/>
				      	<div className="d-flex justify-content-around">
				      		<p className="d-flex justify-content-around text-light float-left">
				      			<h5 className="text-muted mr-1">Name : </h5> 
				      			{userdata.firstname ? userdata.firstname : 'Firstname' } {userdata.lastname ? userdata.lastname : 'Lastname' }
				      		</p>
				      	</div><hr/>
				      	<div className="d-flex justify-content-around">
				      		<h5 className="text-light float-left"><span className="text-muted">Posts</span> {userdata.posts.length}</h5>
				      	</div><hr/>
				      	
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
				      <PrivatePost key={index} post={post} reload={reload} setReload={setReload} />
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
				{isLoadingUserDetail ? "Loading..." : leftPannel() }
				{isLoadingPostList ? "Loading..." : rightPannel() }
			</div>
		</div>
	)
}

export default Profile