import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import FormGroupText from '../../customFormComponent/FormGroupText'
import FormGroupPrice from '../../customFormComponent/FormGroupPrice'
import FormGroupNavButton from '../../customFormComponent/FormGroupNavButton'
import { PencilFill, Trash } from 'react-bootstrap-icons'
import { formatPrice } from '../../../../lib/utils'

function SetsAddFormProfile({profileData, type, onChange}) {
    const [profile, setProfile] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [efficiencyTonerBlack, setEfficiencyTonerBlack] = useState("")
    const [priceTonerBlack, setPriceTonerBlack] = useState("")
    const [efficiencyTonerCyan, setEfficiencyTonerCyan] = useState("")
    const [priceTonerCyan, setPriceTonerCyan] = useState("")
    const [efficiencyTonerMagenta, setEfficiencyTonerMagenta] = useState("")
    const [priceTonerMagenta, setPriceTonerMagenta] = useState("")
    const [efficiencyTonerYellow, setEfficiencyTonerYellow] = useState("")
    const [priceTonerYellow, setPriceTonerYellow] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [profiles, setProfiles] = useState(profileData ? profileData : [])
    const [subtotal, setSubtotal] = useState(0)
    const [selectedProfileId, setSelectedProfileId] = useState(null)
    
    const getToner = ()=>{
        let efficiency = efficiencyTonerBlack
        let price = priceTonerBlack

        if(efficiency > efficiencyTonerCyan && efficiencyTonerCyan != ""){
            efficiency = efficiencyTonerCyan
        }

        if(efficiency > efficiencyTonerMagenta && efficiencyTonerMagenta != ""){
            efficiency = efficiencyTonerMagenta
        }

        if(efficiency > efficiencyTonerYellow && efficiencyTonerYellow != ""){
            efficiency = efficiencyTonerYellow
        }

        if(price.outputPrice < priceTonerCyan.outputPrice){
            price = priceTonerCyan
        }

        if(price.outputPrice < priceTonerMagenta.outputPrice){
            price = priceTonerMagenta
        }

        if(price.outputPrice < priceTonerYellow.outputPrice){
            price = priceTonerYellow
        }
        return {
            efficiency,
            price
        }
    }

    const getSumSubtotals = (arr) => {
        let sum = 0
        arr.forEach(item => {
            sum += item.profileData.subtotal
        })
        return sum
    }

    const getSumQuantities = (arr) => {
        let sum = 0
        arr.forEach(item => {
            sum += parseInt(item.profileData.quantity)
        })
        return sum
    }

    const clearForm = () => {
        setProfile("")
        setBrand("")
        setModel("")
        setQuantity("")
        setPrice("")
        setSubtotal(0)
        setEfficiencyTonerBlack("")
        setPriceTonerBlack("")
        setSelectedProfileId(null)
    }

    return (
        <>
        <Row>
            <Col>
                <Button 
                    onClick={()=> setShowForm(true)}
                >Agregar perfil</Button>
            </Col>
        </Row>
        <br/>
        {
            showForm ?
            <Row style={{marginBottom:"1rem"}}>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row><Col><h6>Equipo</h6></Col></Row>
                            <Row>
                                <Col>
                                    <FormGroupText 
                                        id={"profile"}
                                        label={"Perfil"}
                                        value={profile}
                                        onChange={e => setProfile(e.currentTarget.value)}
                                    />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupText 
                                        id={"brand"} 
                                        label={"Marca"} 
                                        value={brand} 
                                        onChange={ e => {setBrand(e.currentTarget.value)}}
                                    />
                                </Col>
                                <Col>
                                    <FormGroupText 
                                        id={"model"} 
                                        label={"Modelo"} 
                                        value={model} 
                                        onChange={ e => {setModel(e.currentTarget.value)}}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupText 
                                        id={"quantity"} 
                                        label={"Cantidad"} 
                                        value={quantity} 
                                        onChange={ e => {
                                            let value = e.currentTarget.value
                                            //setSubtotal(parseFloat(price.outputPrice) * parseInt(value))
                                            setQuantity(e.currentTarget.value)
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <FormGroupPrice 
                                        id={"price"}
                                        label={"Precio unitario"}
                                        value={price}
                                        onChange={data => {
                                            //setSubtotal(parseFloat(data.outputPrice) * parseInt(quantity))
                                            setPrice(data)
                                        }}
                                    />
                                </Col>
                            </Row>
                            {
                                type == "MONOCROMATICO" ?
                                <>
                                <hr/>
                                <Row><Col><h6>Toner monocromatico</h6></Col></Row>
                                <Row>
                                    <Col>
                                        <FormGroupText 
                                            id={"efficiency-toner"}
                                            label={"Rendimiento del toner"}
                                            value={efficiencyTonerBlack}
                                            onChange={e => setEfficiencyTonerBlack(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <FormGroupPrice 
                                            id={"price-toner"}
                                            label={"precio del toner"}
                                            value={priceTonerBlack}
                                            onChange={data => setPriceTonerBlack(data)}
                                        />
                                    </Col>
                                </Row>
                                </>
                                : <></>
                            }
                            {
                                type == "COLOR" ?
                                <>
                                <hr/>
                                <Row><Col><h6>Toner color</h6></Col></Row>
                                <Row>
                                    <Col>
                                        <FormGroupText 
                                            id={"efficiency-toner-black"}
                                            label={"Rendimiento del toner negro"}
                                            value={efficiencyTonerBlack}
                                            onChange={e => setEfficiencyTonerBlack(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <FormGroupPrice 
                                            id={"price-toner-black"}
                                            label={"precio del toner negro"}
                                            value={priceTonerBlack}
                                            onChange={data => setPriceTonerBlack(data)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroupText 
                                            id={"efficiency-toner-cyan"}
                                            label={"Rendimiento del toner cyan"}
                                            value={efficiencyTonerCyan}
                                            onChange={e => setEfficiencyTonerCyan(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <FormGroupPrice 
                                            id={"price-toner-cyan"}
                                            label={"precio del toner cyan"}
                                            value={priceTonerCyan}
                                            onChange={data => setPriceTonerCyan(data)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroupText 
                                            id={"efficiency-toner-magenta"}
                                            label={"Rendimiento del toner magenta"}
                                            value={efficiencyTonerMagenta}
                                            onChange={e => setEfficiencyTonerMagenta(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <FormGroupPrice 
                                            id={"price-toner-magenta"}
                                            label={"precio del toner magenta"}
                                            value={priceTonerMagenta}
                                            onChange={data => setPriceTonerMagenta(data)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroupText 
                                            id={"efficiency-toner-yellow"}
                                            label={"Rendimiento del toner amarillo"}
                                            value={efficiencyTonerYellow}
                                            onChange={e => setEfficiencyTonerYellow(e.currentTarget.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <FormGroupPrice 
                                            id={"price-toner-yellow"}
                                            label={"precio del toner amarillo"}
                                            value={priceTonerYellow}
                                            onChange={data => setPriceTonerYellow(data)}
                                        />
                                    </Col>
                                </Row>
                                </>
                                
                                : <></>
                            }
                            <hr/>
                            <Row>
                                <Col>
                                    <FormGroupNavButton 
                                        backLabel={"Cancelar"}
                                        nextLabel={"Guardar"}
                                        onBackClick={() => {
                                            setShowForm(false)
                                            clearForm()
                                        }}
                                        onNextClick={e => {
                                            let profileObject = {
                                                profileData: {
                                                    profile,
                                                    brand,
                                                    model,
                                                    quantity,
                                                    price,
                                                    subtotal: (parseInt(quantity) * parseFloat(price.outputPrice))
                                                },
                                                tonerColors: {
                                                    black: {
                                                        efficiency: efficiencyTonerBlack,
                                                        price: priceTonerBlack
                                                    },
                                                    cyan: {
                                                        efficiency: efficiencyTonerCyan,
                                                        price: priceTonerCyan
                                                    },
                                                    magenta: {
                                                        efficiency: efficiencyTonerMagenta,
                                                        price: priceTonerMagenta
                                                    },
                                                    yellow: {
                                                        efficiency: efficiencyTonerYellow,
                                                        price: priceTonerYellow
                                                    }
                                                },
                                                toner: getToner()
                                            }
                                            if(!selectedProfileId){
                                                profiles.push(profileObject)
                                            }else{
                                                profiles[selectedProfileId] = profileObject
                                            }
                                            
                                            setProfiles(profiles)
                                            onChange({
                                                profiles,
                                                subtotal: getSumSubtotals(profiles),
                                                totalquantity: getSumQuantities(profiles)
                                            })
                                            setShowForm(false)
                                            clearForm()
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <br/>
            </Row>
            : <></>
        }
        {
            profiles.length > 0 ?
            <Row style={{marginBottom:"1rem"}}>
                <Col>
                    <Card>
                        <Card.Header>Perfiles</Card.Header>
                        <Card.Body style={{overflowX:"auto"}}>
                            <table className='components-table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">Perfil</th>
                                        <th rowSpan="2">Marca</th>
                                        <th rowSpan="2">Modelo</th>
                                        <th rowSpan="2">Cantidad</th>
                                        <th colSpan="5">Precio</th>
                                        {
                                            type != "DIGITALIZACIÓN" ? 
                                            <>
                                            <th colSpan="5">Toner </th>
                                            </>
                                            : <></>
                                        }
                                        
                                        <th rowSpan="2" colSpan="2"></th>
                                    </tr>
                                    <tr>
                                        <th>Precio</th>
                                        <th>Moneda</th>
                                        <th>Tasa</th>
                                        <th>Precio final</th>
                                        <th>Subtotal</th>
                                        {
                                            type != "DIGITALIZACIÓN" ? 
                                            <>
                                            <th>Rendimiento</th>
                                            <th>Precio</th>
                                            <th>Moneda</th>
                                            <th>Tasa</th>
                                            <th>Precio final</th>
                                            </>
                                            : <></>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    profiles.map((item, index) => {
                                        return <tr key={index} id={index}>
                                            <td>{item.profileData.profile}</td>
                                            <td>{item.profileData.brand}</td>
                                            <td>{item.profileData.model}</td>
                                            <td>{item.profileData.quantity}</td>
                                            <td>{item.profileData.price?.price}</td>
                                            <td>{item.profileData.price?.currency}</td>
                                            <td>{item.profileData.price?.exchange}</td>
                                            <td>{formatPrice(item.profileData.price?.outputPrice)}</td>
                                            <td>{formatPrice(item.profileData.subtotal)}</td>
                                            {
                                                type != "DIGITALIZACIÓN" ? 
                                                <>
                                                <td>{item.toner.efficiency}</td>
                                                <td>{item.toner.price.price}</td>
                                                <td>{item.toner.price.currency}</td>
                                                <td>{item.toner.price.exchange}</td>
                                                <td>{item.toner?.price?.outputPrice ? formatPrice(item.toner?.price?.outputPrice)  : ""}</td>
                                                </>
                                                :<></>
                                            }
                                            <td>
                                                <Button 
                                                    variant='outline-dark' 
                                                    onClick={e => {
                                                        let value = e.currentTarget.parentNode.parentNode.id
                                                        let prof = profiles[value]
                                                        setProfile(prof.profileData.profile)
                                                        setBrand(prof.profileData.brand)
                                                        setModel(prof.profileData.model)
                                                        setQuantity(prof.profileData.quantity)
                                                        setPrice(prof.profileData.price)
                                                        setEfficiencyTonerBlack(prof.tonerColors.black.efficiency)
                                                        setPriceTonerBlack(prof.tonerColors.black.price)
                                                        setEfficiencyTonerCyan(prof.tonerColors.cyan.efficiency)
                                                        setPriceTonerCyan(prof.tonerColors.cyan.efficiency)
                                                        setEfficiencyTonerMagenta(prof.tonerColors.magenta.efficiency)
                                                        setPriceTonerMagenta(prof.tonerColors.magenta.efficiency)
                                                        setEfficiencyTonerYellow(prof.tonerColors.yellow.efficiency)
                                                        setPriceTonerYellow(prof.tonerColors.yellow.efficiency)

                                                        setSelectedProfileId(value)
                                                        setShowForm(true)
                                                    }}
                                                >
                                                    <PencilFill/>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button 
                                                    variant='outline-danger' 
                                                    onClick={e => {
                                                        let value = e.currentTarget.parentNode.parentNode.id
                                                        let newArr = profiles.filter((item, index) => index != value)
                                                        setProfiles(newArr)
                                                        onChange({
                                                            newArr,
                                                            subtotal: getSumSubtotals(newArr),
                                                            totalquantity: getSumQuantities(newArr)
                                                        })
                                                    }}
                                                >
                                                    <Trash/>
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            : <></>
        }
        </>
    )
}

export default SetsAddFormProfile