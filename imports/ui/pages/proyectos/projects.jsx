import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Card } from 'react-bootstrap'
import CustomDataTable from '../../components/CustomDataTable'
import { useNavigate } from 'react-router-dom'
import { ProjectsCollection } from '../../../api/projects/projects';
import CatalogueComponent from '../../components/CatalogueComponent';
import { getAccess } from '../../../lib/utils';

const rolesArr = ['admin', 'projects-user', 'manage-projects']

function Projects() {
  const navigate = useNavigate()
  const projectsData = useTracker(() => {
    const handler = Meteor.subscribe('projects');

    if (!handler.ready()) {
      return [];
    }
    return ProjectsCollection.find({}).fetch()
  })
  
  const columns = [
    {
      name: 'Nombre proyecto',
      selector: row => row.projectData.name,
      sortable: true,
      wrap:true,
      minWidth: "300px"
    },
    {
      name: 'Nombre cliente',
      selector: row => row.projectData.clientName,
      sortable: true,
    },
    {
      name: 'Numero',
      selector: row => row.projectData.number,
      sortable: true,
    },
    {
      name: 'Clase',
      selector: row => row.projectData.projectClass,
      sortable: true,
    },
    {
      name: 'Tipo contrato',
      selector: row => row.projectData.typeContract,
      sortable: true,
    },
    {
      name: 'Catalogo',
      selector: row => <CatalogueComponent catalogueId={row.projectData.catalogue} />,
      sortable: true,
    }
  ]
  
  return (
    <Card>
      <Card.Header><h2>Proyectos</h2></Card.Header>
      <Card.Body>
        {
          getAccess(Meteor.userId(), rolesArr) ?
          <CustomDataTable
            columns={columns} 
            data={[...projectsData]}
            onPreviewClick={ row =>{
              navigate("/projects/overview/"+row._id)
            }}
            onAddClick={()=>{
              navigate("/projects/add")
            }}

            onEditClick={ row =>{
              navigate("/projects/edit/"+row._id)
            }}
            
            onDeleteClick={row =>{
              navigate("/projects/delete/"+row._id)
            }}
          />
          :
          <CustomDataTable
            columns={columns} 
            data={[...projectsData]}
            onPreviewClick={ row =>{
              navigate("/projects/overview/"+row._id)
            }}
          />
        }
        
      </Card.Body>
    </Card>
  )
}

export default Projects