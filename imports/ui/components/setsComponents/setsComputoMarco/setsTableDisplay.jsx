import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { formatPrice } from '../../../../lib/utils'
import ExpandedComponent from './ExpandedComponent'

function SetsTableDisplay({setsData}) {
  const [rows, setRows] = useState(setsData ? setsData : [])

  const columns = [
    {
      name: 'Partida',
      selector: row => row.reference.partida,
      sortable: true,
    },
    {
      name: 'Perfil',
      selector: row => row.reference.perfil,
      sortable: true,
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
    }
  ]

  useEffect(()=>{
    if(setsData){
      setRows(setsData)
    }
  },[setsData])

  return (
    <>
    <label>Partidas</label>
    <div style={{border: "1px solid lightgrey", padding: "1rem"}}>
      <div>
        <br/>
        { rows ? <DataTable 
          columns={columns} 
          data={[...rows]}
          highlightOnHover
          noDataComponent={"Sin datos..."}
          expandableRows 
          expandableRowsComponent={ExpandedComponent}
          /> : <></>
        }
      </div>
    </div>
    </>
  )
}

export default SetsTableDisplay