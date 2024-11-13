import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card } from 'react-bootstrap'
import { Plus, Pencil, Trash3 } from 'react-bootstrap-icons'
import SetsAddForm from './sets-add-form'
//import SetsEditForm from './sets-edit-form'
import ConfirmModal from '../../ConfirmModal'
import ExpandedComponentImpresionMarco from './ExpandedComponentImpresionMarco'
import { formatNumberExtended, formatPrice } from '../../../../lib/utils'
import SetsGlobalVariablesCosts from './sets-global-variables-costs'
import SetsEditForm from './sets-edit-form'

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

function SetsTableImpresionMarco({sets, financeData, catalogue, onChange}) {
  const [data, setData] = useState(sets ? sets : [])
  const [rows, setRows] = useState(sets ? filter(sets, "") : [])
  const [selectedSet, setSelectedSet] = useState()
  const [selectedSetData, setSelectedSetData] = useState()
  const [selectedType, setSelectedType] = useState("")
  const [showSetsAdd, setShowSetsAdd] = useState(false)
  const [showSetsEdit, setShowSetsEdit] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  const onFilterChange = function(e){
    setFilterText(e.currentTarget.value)
    setRows(filter(data, e.currentTarget.value))
  }

  const existTypeInConcepts = (name) => {
    let res = false
    if(data.length == 0){
      return false
    }
    
    data.forEach(item => {
      if(item.type == name){
        res = true
      }
    })
    return res
  }
  
  const customStyles = {
    headRow: {
      style: {
        border: '1px solid lightgrey',
      },
    },
    rows: {
      style: {
        borderColor: 'lightgrey',
        borderStyle: 'solid',
        borderTopWidth: '0',
        borderLeftWidth: '1px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
      },
      highlightOnHoverStyle: {
        border: '1px solid lightgrey'
      },
    }
  }

  const columns = [
    {
      name: 'Tipo conceptos',
      selector: row => {
        return row.concepts?.concepts[0]?.type
      },
      sortable: true,
      minWidth: "100px",
      maxWidth: "300px"
    },
    {
      name: 'Perfiles',
      selector: row => {
        let arr = row.profiles?.profiles
        let str = ""
        if(arr){
          arr.forEach((item, index) => {
            if(index == (arr.length - 1) ){
              str += item.profileData.profile
            }else{
              str += item.profileData.profile + ", "
            }
          })
        }
        return str
      },
      sortable: true,
    },
    {
      name: 'Estimado promedio',
      selector: row => <>{formatNumberExtended(row.costs?.global_estimated)}</>,
      sortable: true,
    },
    {
      name: 'Subtotal perfiles',
      selector: row => <>{formatPrice(row.costs?.subtotal_profiles)}</>,
      sortable: true,
    },
    {
      name: 'Subtotal toner',
      selector: row => <>{formatPrice(row.costs?.tonerSubtotal)}</>,
      sortable: true,
    },
    {
      name: '',
      minWidth: "120px",
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
  
  const onAddClick = (e)=>{
    if(!catalogue){
      alert("Debe seleccionar un catalogo")
      return;
    }

    if(existTypeInConcepts(e.currentTarget.id)){
      alert("Ya hay conceptos de tipo " + e.currentTarget.id + " en la lista")
      return;
    }
    setSelectedType(e.currentTarget.id)
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
    //console.log(d)
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
    <label>Conceptos y perfiles</label>
    <div style={{border: "1px solid lightgrey", padding: "1rem"}}>
      <div>
        <div className='d-flex justify-content-between' style={{padding:"1rem 0"}}>
          <Button variant={"warning"} id={"MONOCROMATICO"} onClick={onAddClick} >Conceptos monocromaticos <Plus/></Button>
          <Button variant={"success"} id={"COLOR"} onClick={onAddClick} >Conceptos color <Plus/></Button>
          <Button variant={"info"} id={"DIGITALIZACIÓN"} onClick={onAddClick} >Conceptos digitalización <Plus/></Button>
        </div>
        <div className='d-flex justify-content-between'>
          <div>
            <input type='text' onChange={onFilterChange} className='form-control search-input' placeholder='Buscar'/>
          </div>
          <div>

          </div>
        </div>
        <br/>
        { rows ? <DataTable 
          columns={columns} 
          data={[...rows]}
          customStyles={customStyles}
          highlightOnHover
          noDataComponent={"Sin datos..."}
          expandableRows 
          expandableRowsComponent={ExpandedComponentImpresionMarco}
          /> : <></>
        }
      </div>
      <SetsAddForm 
        show={showSetsAdd}
        type={selectedType}
        catalogue={catalogue}
        financeData={financeData}
        onSubmit={onSubmit} 
        onCancel={()=> setShowSetsAdd(false)}
      />
      <br/>
      {
        data.length > 0 ?
        <><SetsGlobalVariablesCosts sets={data} financeData={financeData} /></>
        :
        <></>
      }
      {
        selectedSetData ? 
        <>
          <SetsEditForm 
            show={showSetsEdit}
            data = {data[selectedSet]}
            type={selectedType}
            catalogue={catalogue}
            financeData={financeData}
            onSubmit={onEdit} 
            onCancel={()=> setShowSetsEdit(false)}
          />
        </>
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

export default SetsTableImpresionMarco