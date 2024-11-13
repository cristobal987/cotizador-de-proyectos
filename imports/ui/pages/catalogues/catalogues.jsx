import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CataloguesListCollection } from '../../../api/catalogues/cataloguesList';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomDataTable from '../../components/CustomDataTable';
import { getAccess } from '../../../lib/utils';

const rolesArr = ['manage-catalogue', 'admin']

function Catalogues() {
    const navigate = useNavigate()
    const catalogues = useTracker(()=>{
        const handler = Meteor.subscribe('catalogues');
        
        if (!handler.ready()) {
          return [];
        }
        return CataloguesListCollection.find({}).fetch()
    })
    const columns = [
        {
            name: 'Alias',
            selector: row => row.alias,
            sortable: true,
        },{
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
        },{
            name: 'Creado el',
            selector: row => row.createdAt?.toLocaleString(),
            sortable: true,
        },{
            name: 'Actualizado el',
            selector: row => row.updatedAt?.toLocaleString(),
            sortable: true,
        }
    ]

    const onAddClick = () => {
        navigate("/catalogues/add")
    }
    const onEditClick = (row) => {
        navigate("/catalogues/edit/"+ row._id)
    }
    const onDeleteClick = (row) => {
        navigate("/catalogues/delete/"+ row._id)
    }
    const onPreviewClick = (row) => {
        navigate("/catalogues/overview/"+ row._id)
    }

    return (
        <Card>
          <Card.Header>
            <h2>Catalogos</h2>
          </Card.Header>
          <Card.Body>
            {
                getAccess(Meteor.userId(), rolesArr)?
                    <CustomDataTable
                    columns={columns} 
                    data={[...catalogues]}
                    onPreviewClick={onPreviewClick}
                    onAddClick={onAddClick}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                    ></CustomDataTable>
                :
                    <CustomDataTable
                    columns={columns} 
                    data={[...catalogues]}
                    onPreviewClick={onPreviewClick}
                    ></CustomDataTable>
            }
                
          </Card.Body>
        </Card>
    )
}

export default Catalogues