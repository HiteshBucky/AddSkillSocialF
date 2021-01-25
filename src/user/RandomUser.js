import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import {useLocation, useHistory} from 'react-router-dom'
import { Redirect } from "react-router-dom";


import Menu from "../core/Menu"
import PostContainer from './PostContainer'

import {getUserDetails, getAllPostOfUser, checkIfuserFollow, createFollow, createUnFollow} from '../core/helper/coreapicalls'
import { isAutheticated } from "../auth/helper";


function Profile() {

	let  userId  = useLocation()?.state?.id;
	let history = useHistory();

	console.log("Random called", userId)

	const [userdata, setUserData] = useState({});
	const [allpost, setAllPost] = useState([]);
	const [reload, setReload] = useState(false);
	const [isFollwing, setIsFollowing] = useState(false);

	useEffect(() => {
		if(!userId) { return history.push('/'); }

		getUserDetails(userId).then(x => {
			if(x.error) alert("Error!! Cant find user");
			else {
				setUserData(x);
			}
		})
	}, []);

	useEffect(() => {
		if(!userId){ console.log("HEllo 2"); return history.push('/') }

		getAllPostOfUser(userId).then(x => {
			if(x.error) alert("Error", x.error)
			else {
				setAllPost(x)
			}
		})
	}, [])

	useEffect(() => {
		if(!userId) { return history.push('/'); }

		checkIfuserFollow(userId).then(x => {
			if(x.error) return alert(`Error!! ${x.error}`)
			else{
				setIsFollowing(x.follow)
				console.log('isFollwing', isFollwing)
			}
		})

	}, [])

	function handleFollow() {
		console.log('handleFollow');
		createFollow(userId).then(x => {
			if(x.error) return alert(`Error!! ${x.error}`)
			return setIsFollowing(true);
		})
		return;
	}

	function handleUnfollow() {
		console.log('handleUnfollow');
		createUnFollow(userId).then(x => {
			if(x.error) return alert(`Error!! ${x.error}`)
			return setIsFollowing(false);
		})
		return;
	}

	function leftPannel() {
		return (
			<div className="col-4">
			  	<div className="card text-white bg-dark border border-info ">
				    <div className="card-header lead d-flex justify-content-between align-items-center">
				    	<h4 className="d-flex flex-row">@{userdata.username}</h4>

				    	{isFollwing ? 
				    		<button className="btn btn-danger d-flex flex-row" onClick={handleUnfollow}>Unfollow</button> 
				    		: 
				    		<button className="btn btn-primary d-flex flex-row" onClick={handleFollow}>Follow</button>
				    	}

				    </div>
				    <div className="card-body">
				      	<div className="rounded border border-white p-2">
				           	<img src="https://i.imgur.com/UXdKE3o.jpg" style={{ maxHeight: "50%", maxWidth: "100%" }} className="mb-3 rounded" />
				        </div>
				      	<p className="lead bg-white font-weight-bold text-dark text-wrap"><center>{userdata.email}</center></p>

				      	<div className="d-flex justify-content-around"><h5>Some More info</h5></div>
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