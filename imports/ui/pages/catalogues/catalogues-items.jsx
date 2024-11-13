import React from 'react'
import CustomDataTable from '../../components/CustomDataTable';

function CataloguesItems({items, type}) {
    const columns = [
        {
            name: 'Partida',
            selector: row => row.partida,
            sortable: true,
            omit: (type == "impresion")
        },{
            name: 'Perfil',
            selector: row => row.perfil,
            sortable: true,
            omit: (type == "impresion")
        },{
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
            grow: 2,
            cell:(row)=>{
                return <div>
                    {row.descripcion}
                </div>
            }
        },{
            name: 'Caracteristica 1',
            selector: row => row.caracteristica1,
            sortable: true,
            grow: 2,
            cell:(row)=>{
                return <div>
                    {row.caracteristica1}
                </div>
            }
        },{
            name: 'Caracteristica 2',
            selector: row => row.caracteristica2,
            sortable: true,
            grow: 2,
            omit: (type == "impresion"),
            cell:(row)=>{
                return <div>
                    {row.caracteristica2}
                </div>
            }
        }, {
            name: 'rango',
            selector: row => {
                if(row.rango.maximo == 0 ){
                    return "-"
                }else {
                    return row.rango.minimo + " a " + row.rango.maximo;
                }
            },
            sortable: true,
        },{
            name: 'Precio referencia',
            selector: row => row.precioReferencia,
            sortable: true,
            grow: 2,
        }
    ]
    return (
        <CustomDataTable
            columns={columns}
            data={items}
        />
    )
}

export default CataloguesItems