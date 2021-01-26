import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from 'react-moment'

import { signin, authenticate, isAutheticated } from "../auth/helper";
import Menu from '../core/Menu'
import { getPostList, createPost } from '../core/helper/coreapicalls';
import PostContainer from './PostContainer'


function Home() {
	let history = useHistory();

	const [postList, setPostList] = useState([]);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);
	const [description, setDescription] = useState('');
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		getPostList(pageNumber).then(x => {
			if(x.error) setError(true);
			else {
				if(x.length == 0) {
					setPageNumber(1); //If user reaches last post, just redrect to page1
				}
				setPostList(x)
			}
		})
	}, [reload, setReload, pageNumber]);

	function handleSubmit(e) {
		e.preventDefault();
		setReload(false);
		if(isAutheticated()) {
			if(description.length < 1) { //If length is 0, just return;
				return ;
			}
			createPost(description).then(x => {
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

	return (
		<>
		<Menu />
		<div className="row">

			<div className="share border bg-white col-8 feed-post mt-2 border offset-2">
			    <form action='/signin' method="post">
				    <div className="d-flex flex-row inputs p-2 py-4">
				      <img className="rounded-circle" src="https://i.imgur.com/44HzzUN.jpg" width="60" />
				      <input type="text" required value={description} onChange={e => setDescription(e.target.value)} name="description" className="border-0 form-control share-input mt-4 ml-4 mb-4" placeholder="Share your thoughts" />
				    </div>
				    <div className=" flex-row  border-top">
				        <div className="publish-button">
				        	<button className="align-items-center float-right btn btn-dark btn-block mb-2" onClick={e => handleSubmit(e)}>Post</button>
				        </div>
				    </div>
		        </form>
			</div>

		    { postList.map((post, index) => {
		      return (
		        <div key={index} className="col-8 mb-4 offset-2">
		          <PostContainer key={index} post={post}  reload={reload} setReload={setReload} />
		        </div>
		      );
		    }) }
		    
		</div>

		<div className="btn btn-block btn-danger col-8 offset-2" style={{'margin-bottom' : '10%'}}> 
		    <div onClick={e => setPageNumber(pageNumber + 1)}> Next Page </div> 
		</div>
		</>
	)
}

export default Home;