import React from 'react';
import { User } from './user';
export const Users = (props) => {

	if(localStorage.getItem('admin') === 'true'){
		if (props.users.length !== 0) {


			return (
				<div id="display-admin-users">
					<div id="admin-user_settings">USERS SETTINGS</div>
						{props.users.map((user, i) => {
					if (user === undefined) return null;
					return(
				<User user={user} mainParent={props.parent} key={i} index={i} />
					);
				})}
				</div>
			);
			 
				
		} else { return (<div>'NO MEMBERS'</div>); }
	
	} else {return (<div> </div>);}
};