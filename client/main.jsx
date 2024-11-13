import 'bootstrap/dist/css/bootstrap.css';
import '../imports/ui/stylesheet/style.css';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { RouterProvider } from "react-router-dom";
import router from '../imports/ui/router';
import AuthProvider from '../imports/ui/Auth/AuthProvider';

Meteor.startup(() => {
  render(<AuthProvider><RouterProvider router={router} /></AuthProvider>, document.getElementById('react-target'));
});
