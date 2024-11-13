import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { userCollection } from '../../../api/users/users';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomDataTable from '../../components/CustomDataTable';

function Users() {
    const navigate = useNavigate()
    const users = useTracker(() => {
      const handler = Meteor.subscribe('users');
  
      if (!handler.ready()) {
        return [];
      }
      return userCollection.find({}).fetch()
    });
    
    const columns = [
      {
          name: 'Nombres',
          selector: row => row.profile.name,
          sortable: true,
      },
      {
        name: 'Apellidos',
        selector: row => row.profile.lastname,
        sortable: true,
      },
      {
          name: 'Usuario',
          selector: row => row.username,
          sortable: true,
      },
      {
          name: 'Correo electrónico',
          selector: row => {
            if(!row.emails){
              return ""
            }
            if(row.emails.length == 0){
              return ""
            }
            return row.emails[0].address
          },
          sortable: true,
      }
    ]

    const onAddClick = () => {
      navigate("/users/add")
    }
    const onEditClick = (row)=> {
      navigate("/users/edit/"+ row._id)
    }
    const onDeleteClick = (row)=> {
      navigate("/users/delete/"+ row._id)
    }

    return (
    <div>        
        <Card>
          <Card.Header>
            <h2>Usuarios</h2>
          </Card.Header>
          <Card.Body>
              <CustomDataTable
              columns={columns} 
              data={[...users]}
              onAddClick={onAddClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              ></CustomDataTable>
          </Card.Body>
        </Card>
    </div>
  )
}

export default Users;