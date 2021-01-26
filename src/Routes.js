import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from './user/Home'
import RandomUser from './user/RandomUser'
import Profile from './user/Profile'
import Followers from './user/Followers'
import Following from './user/Following'
import Comments from './user/Comments';
import People from './user/People';
import UpdateProfile from './user/UpdateProfile'
import PostUpdate from './user/PostUpdate'

//Private Route
import PrivateRoute from "./auth/helper/PrivateRoutes";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>

        //Home
        <Route path="/" exact component={Home} />

        //Auth
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />

        //Profile
        <Route path='/user' exact component={RandomUser} />
        <Route path='/users' exact component={People} />
        <Route path='/comments' exact component={Comments} />

        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/update" exact component={UpdateProfile} />
        <PrivateRoute path="/followers" exact component={Followers} />
        <PrivateRoute path="/following" exact component={Following} />
        <PrivateRoute path="/post/update" exact component={PostUpdate} />
        
      </Switch>
    </BrowserRouter>
   )
}

export default Routes;