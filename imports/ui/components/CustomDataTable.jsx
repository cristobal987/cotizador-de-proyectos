import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap';
import { Plus, Pencil, Trash3, Eyeglasses } from 'react-bootstrap-icons'
import TooltipOverlay from './TooltipOverlay';

function filter(array, text){
    if(!array){
      return[]
    }
    return array.filter(
      item =>
        JSON.stringify(item)
          .toLowerCase()
          .indexOf(text.toLowerCase()) !== -1
    );
  }

function CustomDataTable({columns, data, defaultSortFieldId, onAddClick, onPreviewClick, onEditClick, onDeleteClick, customStyles, hideSearch}) {
    let showSearch = true
    if(hideSearch != undefined){
      showSearch = !hideSearch
    }
    const [filterText, setFilterText] = useState("")
    const rows = useTracker(()=>{
        return filter(data, filterText)
    })
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    const onFilterChange = function(e){
        setFilterText(e.currentTarget.value)
    }

    function onRowEditClick (row) {
      let isSelf = row._id == Meteor.userId()
      return (
        <>
        {
          onPreviewClick ? <TooltipOverlay text={"Previsualizar"} placement={"right"}>
            <Button 
            onClick={()=>{
              onPreviewClick(row)
            }}
            size="sm" 
            variant='outline-dark' 
            style={{marginRight: "0.5rem"}}
            >
              <Eyeglasses/>
            </Button>
          </TooltipOverlay> : ""
        }

        { onEditClick ? <TooltipOverlay text={"Editar"} placement="right">
          <Button 
            onClick={()=>{
              onEditClick(row)
            }} 
            variant='outline-dark' 
            size="sm"
            style={{marginRight: "0.5rem"}}
            >
              <Pencil/>
          </Button>
        </TooltipOverlay> : ""
        }
        
        {
          !isSelf &&  onDeleteClick?
          <TooltipOverlay text={"Eliminar"} placement="right">
             <Button 
              onClick={()=>{
                onDeleteClick(row)
              }} 
              variant='outline-danger' 
              size="sm">
                <Trash3/>
            </Button>
          </TooltipOverlay>
          : ""
        }
        </>
      )
    }

    ///
    columns.push({
      name:"",
      selector:onRowEditClick,
      minWidth:"180px"
    })

    return (
    <>
    <div className='d-flex justify-content-between'>
        <div>
          { showSearch ?
            <input type='text' onChange={onFilterChange} className='form-control search-input' placeholder='Buscar'/>
          : ""}
        </div>
        <div>{
          onAddClick ? <button type='button' className='btn btn-outline-primary' onClick={onAddClick}>Agregar <Plus/></button>
          : ""  
        }</div>
    </div>
        <br/>
        { rows ? <DataTable 
        columns={columns} 
        data={[...rows]}
        defaultSortFieldId={ defaultSortFieldId }
        highlightOnHover
        pagination
        noDataComponent={"Sin datos..."}
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
        /> : <></>}
    </>
  )
}

export default CustomDataTable