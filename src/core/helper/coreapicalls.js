import { API } from "../../backend";
import { isAutheticated } from "../../auth/helper";

export const getPostList = (pageNumber) => {

    console.log("Post Creation 4")
	console.log("getPostList from frontend" )
  	return fetch(`${API}/post/page/${pageNumber}`, { method: "GET"})
    		.then(response => response.json())
    		.catch(err => console.log(err))
};

export const getUserDetails = (userId) => {
	console.log('getUserDetails');
	return fetch(`${API}/users/${userId}`, { method: "GET"})
    		.then(response => response.json())
    		.catch(err => console.log(err))
};

export const getAllPostOfUser = (userId) => {
	console.log('getAllPostOfUser', userId);
	return fetch(`${API}/posts/${userId}`, { method: "GET"})
    		.then(response => response.json())
    		.catch(err => console.log(err))
};


export const followingList = (userId) => {
    console.log('followingList');
    return fetch(`${API}/users/followingList/${userId}`, { method: "GET"})
            .then(response => response.json())
            .catch(err => console.log(err))
};

export const getAllUser = () => {
    return fetch(`${API}/users/`, { method: "GET"})
        .then(response => response.json())
        .catch(err => console.log(err))
}
















export const getFollwerList = (userId) => {
    console.log('followerList', userId);
    return fetch(`${API}/users/followers/${userId}`, { method: "GET"})
            .then(response => response.json())
            .catch(err => console.log(err))
};













export const createPost = (description) => {
    console.log("createPost");

    const userId = isAutheticated().user._id;
    return fetch(`${API}/createpost/${userId}`, {
        method: "post",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description : description })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}



export const getAllComments = (postId) => {
    return fetch(`${API}/comments/${postId}`, { method: "GET"})
            .then(response => response.json())
            .catch(err => console.log(err))
}


export const createComments = (description, postId) => {
    console.log("createComments" , description , "postId", postId);
    const userId = isAutheticated().user._id;

    return fetch(`${API}/creatcomment/${userId}/${postId}`, {
        method: "post",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description : description })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}



export const checkIfuserFollow = toId => {
    const userId = isAutheticated().user._id;
    return fetch(`${API}/checkfollow/${userId}/${toId}`, { method: "GET"})
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const createFollow = toId => {
    const userId = isAutheticated().user._id;
    return fetch(`${API}/createfollow/${userId}/${toId}`, { method: "POST"})
        .then(response => response.json())
        .catch(err => console.log(err))
}


export const createUnFollow = toId => {
    const userId = isAutheticated().user._id;
    return fetch(`${API}/createUnfollow/${userId}/${toId}`, { method: "POST"})
        .then(response => response.json())
        .catch(err => console.log(err))
}






































