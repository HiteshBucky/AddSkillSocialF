import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import { getAllUser } from '../core/helper/coreapicalls';

function People () {	

	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUser().then(x => {
			if(x.error) alert(x.error)
			return setUsers(x)
		})
	}, []);



	function rightPannel() {
		return (
			<div className="col-8">
		      <div className="panel" id="followers">
		        <div className="panel-heading">
		          <h3 className="panel-title">
		            <i className="icon md-check" aria-hidden="true"></i> Followers
		          </h3>
		        </div>
		        <div className="panel-body">
		          <ul className="list-group list-group-dividered list-group-full">

		            <li className="list-group-item">
		              <div className="media">
		                <div className="media-left">
		                  <a className="avatar avatar-online" href="javascript:void(0)">
		                    <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="50" height="50" />
		                    <i></i>
		                  </a>
		                </div>
		                <div className="media-body">
		                  <div className="pull-right">
		                    <button type="button" className="btn btn-info btn-sm waves-effect waves-light">Follow</button>
		                  </div>
		                  <div><a className="name" href="javascript:void(0)">Willard Wood</a></div>
		                  <small>@heavybutterfly920</small>
		                </div>
		              </div>
		            </li>


		          </ul>
		        </div>
		      </div>
			</div>
		)
	}

	return (
		<div>
			<Menu/>
			<pre>{JSON.stringify(users, undefined, 2)}</pre>

				<div className="col-8">
			      <div className="panel" id="followers">
			        <div className="panel-heading">
			          <h3 className="panel-title">
			            <i className="icon md-check" aria-hidden="true"></i> Followers
			          </h3>
			        </div>
			        <div className="panel-body">
			          <ul className="list-group list-group-dividered list-group-full">

			          	{users.map((user, index) => {
			          		<li className="list-group-item" key={index}>
			          		  <div className="media">
			          		    <div className="media-left">
			          		      <a className="avatar avatar-online" href="javascript:void(0)">
			          		        <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="50" height="50" />
			          		        <i></i>
			          		      </a>
			          		    </div>
			          		    <div className="media-body">
			          		      <div className="pull-right">
			          		        <button type="button" className="btn btn-info btn-sm waves-effect waves-light">Follow</button>
			          		      </div>
			          		      <div><a className="name" href="javascript:void(0)">Willard Wood</a></div>
			          		      <small>@heavybutterfly920</small>
			          		    </div>
			          		  </div>
			          		</li>
			          	})}
			            


			          </ul>
			        </div>
			      </div>
				</div>
		</div>
	)

}

export default People;