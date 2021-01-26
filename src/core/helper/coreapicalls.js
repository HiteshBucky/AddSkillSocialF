import { API } from "../../backend";
import { isAutheticated } from "../../auth/helper";
import { Redirect } from "react-router-dom";

export const getPostList = (pageNumber) => {
  	return fetch(`${API}/post/page/${pageNumber}`, { method: "GET"})
    		.then(response => response.json())
    		.catch(err => console.log(err))
};

export const getPostInfo = (postId) => {
    return fetch(`${API}/post/${postId}`, { method: "GET"})
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const getUserDetails = (userId) => {
	return fetch(`${API}/users/${userId}`, { method: "GET"})
    		.then(response => response.json())
    		.catch(err => console.log(err))
};

export const getAllPostOfUser = (userId) => {
	return fetch(`${API}/posts/${userId}`, { method: "GET"})
    		.then(response => response.json())
    		.catch(err => console.log(err))
};

export const updateUserInfo = (data) => {
    delete data.error
    const userId = isAutheticated().user._id
    return fetch(`${API}/update/${userId}`, {
        method: "put",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
}

export const updatePost = (data, postId) => {
    if(isAutheticated() == false) return <Redirect to="/home" />;

    const userId = isAutheticated().user._id

    const val = {};
    val.description = data;

    return fetch(`${API}/postupdate/${userId}/${postId}`, {
        method: "put",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(val)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
}


export const getAllUser = () => {
    return fetch(`${API}/users/`, { method: "GET"})
        .then(response => response.json())
        .catch(err => console.log(err))
}



export const getfollowingList = (userId) => {
    return fetch(`${API}/users/following/${userId}`, { method: "GET"})
            .then(response => response.json())
            .catch(err => console.log(err))
};

export const getFollwerList = (userId) => {
    return fetch(`${API}/users/followers/${userId}`, { method: "GET"})
            .then(response => response.json())
            .catch(err => console.log(err))
};

export const createPost = (description) => {
    const userId = isAutheticated().user._id;
    return fetch(`${API}/createpost/${userId}`, {
        method: "post",
        headers: { Accept: "application/json", 'Content-Type': 'application/json'},
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






































