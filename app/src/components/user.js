import React from 'react';
import { PassEncrypt } from './crptKey';

export const User = (props) => {
    return (
          <div className="display-user">
            <div className="user-id">{`${props.index +1}`}</div>
            <div className="user-username">{`${String(props.user.username).toLocaleUpperCase()}`}</div>
            <div className="user-info"><span>Name</span>: {`${props.user.fname} ${props.user.lname}`}</div>
            <div className="user-info"><span>Email</span>: {`${props.user.email}`}</div>
            <div className="user-admin"><span>Admin</span>: {`${String(props.user.admin).toLocaleUpperCase()}`}</div>
            <span className="user-remove" onClick={() => {
              if (window.confirm("ARE YOU SURE YOU WANT TO DELETE " + props.user.username)) {
              props.mainParent.removeUser(props.user.username);
              }
            }}>REMOVE</span>
          </div>
    );
}