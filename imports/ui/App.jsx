import React from 'react';
import { Outlet } from "react-router-dom";
import Layout from './layout/layout';
import RequireAuth from './Auth/RequireAuth';

export const App = ({children}) => {

  return ( 
  <RequireAuth>
    <Layout>
      <Outlet/>
    </Layout>
  </RequireAuth>
  );
}
