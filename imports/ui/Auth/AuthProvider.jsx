import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function getMeteorUser (){
  return Meteor.userId()? Meteor.userId() : null
}

function AuthProvider({ children }) {
  let [user, setUser] = useState(getMeteorUser())

  let signin = (user, password, rememberme, callback) => {
    return Meteor.loginWithPassword(user, password, (error)=>{
      setUser(Meteor.userId())
      if(!rememberme){
        Accounts._unstoreLoginToken();
        Accounts._autoLoginEnabled = false;
      }
      callback(error)
    });
    
  };

  let signout = (callback) => {
    return Meteor.logout((error)=>{
      setUser(null)
      callback(error)
    })
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider