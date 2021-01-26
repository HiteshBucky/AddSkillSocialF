import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Menu from '../core/Menu'
import UserBox from './UserBox';

import { getfollowingList } from '../core/helper/coreapicalls';
import { isAutheticated } from "../auth/helper";


function Following() {

	const [followingList, setFollowingList] = useState([]);
	const [loading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);


	useEffect(() => {
		setIsLoading(true);
		console.log("Isfollowing 1")
		getfollowingList(isAutheticated().user._id)
			.then(x => {
				if(x.error) setError(x.error)
				else {
					setIsLoading(false);
					setFollowingList(x);
				}
			})
	}, [reload])


	function rightPannel() {
		return (
			<div className="col-8 offset-2 ">
		      <div className="panel" id="followers">
		        <div className="panel-heading">
		          <h3 className="panel-title mt-5 mb-5 text-center">
		            <i className="icon md-check" aria-hidden="true"></i> Following List {followingList.length}
		          </h3>
		        </div>
		        <div className="panel-body">
		          <ul className="list-group list-group-dividered list-group-full">

		          {followingList.map(function(value, index){
		              return (
		              	<UserBox key={index} user={value} reload={reload} setReload={setReload} />
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
				( <h1></h1>) 
				: 
				(<div className="row">
					{rightPannel()}
				</div>)
			}			
		</div>
	)
}

export default Following




// <pre>
// 	{followerList.map(function(value, index){
// 	    return (<li key={index}>{value.email}</li>)
// 	})}
// </pre>