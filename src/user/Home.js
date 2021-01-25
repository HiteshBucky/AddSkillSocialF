import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
		console.log("Post Creation 3")
		getPostList(pageNumber).then(x => {
			console.log("Post Creation 5")
			console.log('fetching all postList')
			if(x.error) setError(true);
			else {
				console.log("Post List", x)
				console.log("Post Creation 6")
				setPostList(x)
			}
		})
	}, [reload, setReload]);

	function handleSubmit(e) {
		e.preventDefault();
		setReload(false);
		if(isAutheticated()) {
			if(description.length < 1) { //If length is 0, just return;
				return ;
			}
			console.log("Post Creation 1")
			createPost(description).then(x => {
				if(x.error) setError(x.error)
				else {
					console.log("Post Creation 2")
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

	function handleClick() {
		setPageNumber(pageNumber + 1);
		getPostList(pageNumber).then(x => {
			console.log('fetching all postList')
			if(x.error) setError(true);
			else {
				console.log("Post List", x)
				setPostList(x)
			}
		})
	}



	var output = isAutheticated() != undefined?  JSON.stringify(isAutheticated().user) : "Please login un ";

	return (
		<>
		<Menu />
		<div className="row">
			<div className="share border bg-white col-8 feed-post mt-2 border offset-2">
			    <form action='/signin' method="post">
				    <div className="d-flex flex-row inputs p-2 py-4"><img className="rounded-circle" src="https://i.imgur.com/44HzzUN.jpg" width="60" />
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
		    <div onClick={handleClick}> Next Page </div> 
		</div>
		</>
	)
}
export default Home;