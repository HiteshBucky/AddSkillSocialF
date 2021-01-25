import React from 'react';
import { Link } from "react-router-dom";

import Menu from '../core/Menu'



function PostContainer (props) {

	const PostBox = () => {
		return (
			<div className="feed-post mt-2 border">
			    <div className="p-2 bg-white">
			        <div className="d-flex flex-row justify-content-between align-items-start profile">
			        	<Link to={{ pathname: '/user' , state : {id : props.post.createdBy} }}>
				            <div className="d-flex align-items-center">
				              <img className="rounded-circle img-responsive" src="https://i.imgur.com/44HzzUN.jpg" width="50" height="50" />
				              <div className="d-flex flex-column ml-2"> <h6>{props.post.userData[0].username}</h6></div>
				            </div>
			            </Link>
				        <div className="ml-2 float-right float-lg-right"> <h6>{props.post.createdAt.substring(0,10)}</h6></div>

			        </div>

			        <div className="profile-content mt-4 mb-4">
			          <span>{props.post.description}</span>
			        </div>
			        <hr/>
			        <div className="profile-engagements">
			          <div className="d-flex justify-content-between align-items-center">
			            <div className="d-flex flex-row icons d-flex align-items-center">
			              <span><i className="fa fa-heart"></i> Likes</span> 
			            </div>
			            <Link to={{ pathname: '/comments' , state : {post : props.post} }}>
				            <div className="d-flex flex-row muted-color"> 
				              <span><i className="fa fa-comment"></i> comments</span>
				            </div>
			            </Link>
			          </div>
			        </div>
			    </div>
			</div>
		)
		
	}

	return (
		<>	
			{PostBox()}
		</>
	)
}

export default PostContainer