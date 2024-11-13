import React from 'react';
import { App } from "./App";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import ErrorPage from './pages/error-page';
import Users from './pages/users/users';
import UserAdd from './pages/users/user-add'
import UserEdit from './pages/users/user-edit';
import { userDataLoader } from '../lib/data-loaders/user-data-loader';
import UserDelete from './pages/users/user-delete';
import UserProfile from './pages/user-profile';
import Catalogues from './pages/catalogues/catalogues';
import CataloguesAdd from './pages/catalogues/catalogues-add';
import CataloguesDelete from './pages/catalogues/catalogues-delete';
import { catalogueDataLoader } from '../lib/data-loaders/catalogue-data-loader';
import CataloguesEdit from './pages/catalogues/catalogues-edit';
import Projects from './pages/proyectos/projects';
import ProjectsAdd from './pages/proyectos/projects-add';
import ProjectsEdit from './pages/proyectos/projects-edit';
import Home from './pages/home';
import { projectDataLoader } from '../lib/data-loaders/projects-data-loader';
import ProjectsDelete from './pages/proyectos/projects-delete';
import ProjectOverview from './pages/proyectos/project-overview';
import CataloguesOverview from './pages/catalogues/catalogues-overview';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement: <ErrorPage />,
      children: [{
          path: "/",
          element: <Home/>,
        },{
          path: "users/",
          element: <Users/>,
        },{
          path: "users/add",
          element: <UserAdd/>,
        },{
          path: "users/edit/:userId",
          element: <UserEdit/>,
          loader: userDataLoader
        },{
          path: "users/delete/:userId",
          element: <UserDelete/>,
          loader: userDataLoader
        },{
          path: "/userprofile/:userId",
          element: <UserProfile/>,
          loader: userDataLoader
        },{
          path: "catalogues/",
          element: <Catalogues/>
        },{
          path: "catalogues/add",
          element: <CataloguesAdd/>
        },{
          path: "catalogues/edit/:catalogueId",
          element: <CataloguesEdit/>,
          loader: catalogueDataLoader
        },{
          path: "catalogues/delete/:catalogueId",
          element: <CataloguesDelete/>,
          loader: catalogueDataLoader
        },{
          path: "catalogues/overview/:catalogueId",
          element: <CataloguesOverview/>,
          loader: catalogueDataLoader
        },{
          path: "projects/",
          element: <Projects/>
        },{
          path: "projects/add",
          element: <ProjectsAdd/>,
        },{
          path: "projects/edit/:projectId",
          element: <ProjectsEdit/>,
          loader: projectDataLoader
        },{
          path: "projects/delete/:projectId",
          element: <ProjectsDelete/>,
          loader: projectDataLoader
        },{
          path: "projects/overview/:projectId",
          element: <ProjectOverview/>,
          loader: projectDataLoader
        }
      ],
    },
    {
      path: "/login",
      element: <Login/>,
    },
]);

export default router
  