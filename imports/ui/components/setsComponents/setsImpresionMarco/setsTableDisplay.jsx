import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { formatPrice } from '../../../../lib/utils'
import ExpandedComponentImpresionMarco from './ExpandedComponentImpresionMarco'

function SetsTableDisplay({setsData}) {
  const [rows, setRows] = useState(setsData ? setsData : [])

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
      minWidth: "100px",
      maxWidth: "300px"
    },
    {
      name: 'Subtotal perfiles',
      selector: row => <>{formatPrice(row.costs?.subtotal_profiles)}</>,
      sortable: true,
    },
    {
      name: 'Precio por hoja',
      selector: row => <>{formatPrice(row.costs?.page_cost_total)}</>,
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
          expandableRowsComponent={ExpandedComponentImpresionMarco}
          /> : <></>
        }
      </div>
    </div>
    </>
  )
}

export default SetsTableDisplay