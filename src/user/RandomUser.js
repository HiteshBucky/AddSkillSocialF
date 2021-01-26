import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import {useLocation, useHistory} from 'react-router-dom'
import { Redirect } from "react-router-dom";


import Menu from "../core/Menu"
import PostContainer from './PostContainer'

import {getUserDetails, getAllPostOfUser, checkIfuserFollow, createFollow, createUnFollow} from '../core/helper/coreapicalls'
import { isAutheticated } from "../auth/helper";


function RandomProfile() {

	let  userId  = useLocation()?.state?.id;
	let history = useHistory();

	const [isLoadingUserDetail, setLoadingUserDetail] = useState(true);
	const [isLoadingPostList, setLoadingPostList] = useState(true);
	const [reload, setReload] = useState(false);

	const [userdata, setUserData] = useState({});
	const [allpost, setAllPost] = useState([]);

	const [isFollwing, setIsFollowing] = useState(false);

	useEffect(() => {
		if(!userId) { return history.push('/'); }

		setLoadingUserDetail(true);
		getUserDetails(userId).then(x => {
			if(x.error) alert("Error!! Cant find user");
			else {
				setUserData(x);
				setLoadingUserDetail(false);
			}
		})
	}, [isFollwing]);

	useEffect(() => {
		if(!userId){ console.log("HEllo 2"); return history.push('/') }

		setLoadingPostList(true);
		getAllPostOfUser(userId).then(x => {
			if(x.error) alert("Error", x.error)
			else {
				setAllPost(x);
				setLoadingPostList(false);
			}
		})
	}, [])

	useEffect(() => {
		if(!userId) { return history.push('/'); }

		if(isAutheticated() == false) {
			return setIsFollowing(false)
		}else{
			checkIfuserFollow(userId).then(x => {
				if(x.error) return alert(`Error!! ${x.error}`)
				else{
					setIsFollowing(x.follow)
				}
			})
		}
	}, [])

	function handleFollow() {
		if( !isAutheticated()) return history.push('/signup')
		createFollow(userId).then(x => {
			if(x.error) return alert(`Error!! ${x.error}`)
			return setIsFollowing(true);
		})
		return;
	}

	function handleUnfollow() {
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

				      	<hr/>
				      	<div className="d-flex justify-content-around"><h5 className="text-light float-left">Posts {userdata.posts.length}</h5></div><hr/>
				      	<div className="d-flex justify-content-around"><h5 className="text-light">Followers {userdata.followers.length}</h5></div><hr/>
				      	<div className="d-flex justify-content-around"><h5 className="text-light">Follows {userdata.follows.length}</h5></div><hr/>
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
				{isLoadingUserDetail ? "Loading" : leftPannel() }
				{isLoadingPostList ? "Loading" : rightPannel() }
			</div>
		</div>
	)
}

export default RandomProfile