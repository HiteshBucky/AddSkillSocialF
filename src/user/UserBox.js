import React, { useState } from 'react'
import { createFollow, createUnFollow} from '../core/helper/coreapicalls'


function UserBox ({user, key, reload, setReload}) {

	const [isFollwing, setIsFollowing] = useState(true);
	console.log("UserBox", user);

	function handleFollow() {
		createFollow(user._id).then(x => {
			if(x.error) return alert(`Error!! ${x.error}`)
			setIsFollowing(true);
			setReload(true);
			return;
		})
		return;
	}

	function handleUnfollow() {
		setReload(false);
		createUnFollow(user._id).then(x => {
			if(x.error) return alert(`Error!! ${x.error}`)
			setIsFollowing(false);
			setReload(true);
			return;
		})
		return;
	}


	return (
		<div>
			<li className="list-group-item mb-4" key={key}>
			  <div className="media">
			    <div className="media-left pr-3">
			      <a className="avatar avatar-online" href="javascript:void(0)">
			        <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="70" height="70" />
			        <i></i>
			      </a>
			    </div>
			    <div className="media-body">
			      <div className="pull-right">
			      	{isFollwing ? 
			      		<button className="btn btn-danger d-flex flex-row" onClick={handleUnfollow}>Unfollow</button> 
			      		: 
			      		<button className="btn btn-primary d-flex flex-row" onClick={handleFollow}>Follow</button>
			      	}
			      </div>
			      <div><a className="name" href="javascript:void(0)">{user.username}</a></div>
			      <small>{user.email}</small>
			    </div>
			  </div>
			</li>
		</div>
	)
}

export default UserBox;