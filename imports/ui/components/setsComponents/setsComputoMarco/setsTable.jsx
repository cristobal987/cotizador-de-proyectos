import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import SetsAddForm from './sets-add-form'
import { Button } from 'react-bootstrap'
import { Plus, Pencil, Trash3 } from 'react-bootstrap-icons'
import { formatPrice } from '../../../../lib/utils'
import ExpandedComponent from './ExpandedComponent'
import SetsEditForm from './sets-edit-form'
import ConfirmModal from '../../ConfirmModal'

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

function SetsTable({sets, financeData, catalogue, onChange}) {
  const [data, setData] = useState(sets ? sets : [])
  const [rows, setRows] = useState(sets ? filter(sets, "") : [])
  const [selectedSet, setSelectedSet] = useState()
  const [selectedSetData, setSelectedSetData] = useState()
  const [showSetsAdd, setShowSetsAdd] = useState(false)
  const [showSetsEdit, setShowSetsEdit] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const onFilterChange = function(e){
    setFilterText(e.currentTarget.value)
    setRows(filter(data, e.currentTarget.value))
  }
  
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const columns = [
    {
      name: 'Partida',
      selector: row => row.reference.partida,
      sortable: true,
      minWidth: "10px",
      maxWidth: "90px"
    },
    {
      name: 'Perfil',
      selector: row => row.reference.perfil,
      sortable: true,
      minWidth: "10px",
      maxWidth: "90px"
    },
    {
      name: 'Cantidad',
      selector: row => <>{row.costs.totalUnits +" ("+row.reference.rango.minimo+" - "+row.reference.rango.maximo+")"}</>,
      sortable: true,
    },
    {
      name: 'Salida',
      selector: row => <>{formatPrice(row.costs.outputPrice) +" ("+row.reference.precioReferencia+")"}</>,
      sortable: true,
    },
    {
      name: 'Factura Mensual',
      selector: row => <>{formatPrice(row.costs.monthlyPayment)}</>,
      sortable: true,
    },
    {
      name: '',
      selector: (row, index) => <>
        <Button variant='outline-dark' style={{marginRight:"0.5rem"}} onClick={() => editRow(index, row)}>
          <Pencil/>
        </Button>
        <Button variant='danger' onClick={() => {
          setSelectedSet(index)
          setShowConfirm(true)
        }}>
          <Trash3/>
        </Button>
      </>
    }
  ]
  
  const onAddClick = ()=>{
    if(!catalogue){
      alert("Debe seleccionar un catalogo")
      return;
    }
    setShowSetsAdd(true)
  }

  const deleteRow = () => {
    let index = selectedSet
    let array = data.filter((item, id) => (index != id))
    setData(array)
    setRows(filter(array, filterText))
    setShowConfirm(false)
    if(onChange){
      onChange(array)
    }
  }

  const editRow = (index, row) => {
    setSelectedSet(index)
    setSelectedSetData(row)
    setShowSetsEdit(true)
  }

  const onSubmit = d => {
    data.push(d)
    setData([...data])
    setRows(filter(data, filterText))
    setShowSetsAdd(false)
    if(onChange){
      onChange(data)
    }
  }

  const onEdit = d => {
    data[selectedSet] = d
    setData([...data])
    setRows(filter(data, filterText))
    setShowSetsEdit(false)
    setSelectedSetData()
    if(onChange){
      onChange(data)
    }
  }

  return (
    <>
    <label>Partidas</label>
    <div style={{border: "1px solid lightgrey", padding: "1rem"}}>
      <div>
        <div className='d-flex justify-content-between'>
          <div>
            <input type='text' onChange={onFilterChange} className='form-control search-input' placeholder='Buscar'/>
          </div>
          <div>
            <Button onClick={onAddClick}>Agregar <Plus/></Button>
          </div>
        </div>
        <br/>
        { 
          rows ? 
          <DataTable 
            columns={columns} 
            data={[...rows]}
            highlightOnHover
            pagination
            noDataComponent={"Sin datos..."}
            paginationComponentOptions={paginationComponentOptions}
            expandableRows 
            expandableRowsComponent={ExpandedComponent}
          /> : <></>
        }
      </div>
      <SetsAddForm 
        show={showSetsAdd}
        catalogue={catalogue}
        financeData={financeData}
        onSubmit={onSubmit} 
        onCancel={()=> setShowSetsAdd(false)}
      />
      {
        selectedSetData ? 
        <SetsEditForm
          show={showSetsEdit}
          catalogue={catalogue}
          data={data[selectedSet]}
          onSubmit={onEdit} 
          onCancel={()=> setShowSetsEdit(false)}
        />
        : <></>
      }
      
      {
        showConfirm ?
        <ConfirmModal
          message={"¿Estas seguro de que quieres eliminar esta partida?"}
          show={showConfirm}
          handleClose={()=>{
            setShowConfirm(false)
          }}
          onAccept = {() => {
            deleteRow()
          }}
        />
        : ""
      } 
    </div>
    </>
  )
}

export default SetsTable