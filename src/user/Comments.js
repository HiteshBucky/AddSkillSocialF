import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom'
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Menu from '../core/Menu'

import { getAllComments } from '../core/helper/coreapicalls';
import { isAutheticated } from "../auth/helper";
import { createComments } from '../core/helper/coreapicalls';



function Comments (props) {

	let post  = useLocation()?.state?.post;
	let history = useHistory();


	//Force user if mannual search

	const [comments, setComments] = useState([]);
	const [description, setDescription] = useState('');
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);


	useEffect(() => {
		if(!post) return <Redirect to="/" />;
		getAllComments(post._id).then(x => {
			if(x.error) setError(x.error);
			else setComments(x)
		})
	},[reload])

	function handleSubmit(e) {
		e.preventDefault();
		if(isAutheticated()) {
			if(description.length < 1) { //If length is 0, just return;
				return ;
			}
			createComments(description, post._id ).then(x => {
				if(x.error) setError(x.error)
				else {
					setDescription('');
					setReload(true);
				}
				return;
			})
			
		}
		else {
			history.push('/signin');
		}
	}

	const PostBox = () => {
		return (
			<div className="feed-post mt-2 ">
			    <div className="p-2 bg-white">
			        <div className="d-flex flex-row justify-content-between align-items-start profile">
			        	<Link to={{ pathname: '/user' , state : {id : post.createdBy} }}>
				            <div className="d-flex align-items-center">
				              <img className="rounded-circle img-responsive" src="https://i.imgur.com/44HzzUN.jpg" width="50" height="50" />
				              <div className="d-flex flex-column ml-2"> <h6>{ post.userData[0].username}</h6></div>
				            </div>
			            </Link>
				        <div className="ml-2 float-right float-lg-right"> <h6>{post.createdAt.substring(0,10)}</h6></div>

			        </div>

			        <div className="profile-content mt-4 mb-4">
			          <span>{post.description}</span>
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

	function Comments () {
		return (
			<div>
				{ comments.map((comment, index) => {
				  return (
				    <div key={index} className="col-8 mb-4 offset-2">
				      <div className=" mt-4 mb-5">
	      			        <div className="panel panel-default">
	      			            <div className="panel-body">
	      			               <section className="post-heading">
	      			                    <div className="row">
	      			                        <div className="col-md-11">
	      			                            <div className="media">
	      			                              <div className="media-left pr-3">
	      			                              	<Link to={{ pathname: '/user' , state : {id : comment.createdBy} }}>
	      			                                  <img className="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="50" height="50" />
	      			                                </Link>
	      			                              </div>
	      			                              <div className="media-body">
	      			                              	<Link to={{ pathname: '/user' , state : {id : comment.createdBy} }}>
	      			                                	<a href="#" className="anchor-username"><h4 className="media-heading"> @{comment.userData[0].username}</h4></a> 
	      			                                </Link>
	      			                                <a href="#" className="anchor-time">51 mins</a>
	      			                              </div>
	      			                            </div>
	      			                        </div>
	      			                         <div className="col-md-1">
	      			                             <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
	      			                         </div>
	      			                    </div>             
	      			               </section>
	      			               <section className="post-body">
	      			                   <p>{comment.description}</p>
	      			               </section>
	      			               
	      			            </div>
	      			        </div>   
	      				</div>
				    </div>
				  );
				}) }
			</div>
		)
	}



	return (
		<>	
			<Menu />
			<div className="row">
				<div className="share border bg-white col-8 feed-post mt-2 border offset-2">
				    {PostBox()}
			    	<div className="share border bg-white col-12 feed-post mt-2 border" style={{ 'margin-bottom' : '10%'}}>
			    	    <form action='/signin' method="post">
			    		    <div className="d-flex flex-row inputs p-2 py-4">
			    		      <input type="text" required value={description} onChange={e => setDescription(e.target.value)} name="description" className="border-0 form-control share-input mt-4 ml-4 mb-4" placeholder="Share your thoughts" />
			    		    </div>
			    		    <div className=" flex-row  border-top">
			    		        <div className="publish-button">
			    		        	<button className="align-items-center float-right btn btn-dark btn-block mb-2" onClick={e => handleSubmit(e)}>Add Comments</button>
			    		        </div>
			    		    </div>
			            </form>
			    	</div>
				    {Comments()}
				</div>
			</div>
		</>
	)
}

export default Comments;