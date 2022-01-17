import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button, Meta, Collapse} from 'antd';
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchFeature from './Sections/SearchFeature'
import { continents, prices } from './Sections/Data.js';


let order = 1;
let count = 0;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)        
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState()

    useEffect(() => {

        let body= {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
       
    }, [])

    const getProducts = (body) => {

        axios.post('/api/product/products', body)
        .then(response => {
            if(response.data.success){

                console.log("productInfo", response.data)

                if(body.loadMore){     
                    count = count - response.data.postSize             
                    setProducts([...Products, ...response.data.productInfo])
                }
                else{  
                    count = response.data.count - response.data.postSize
                    setProducts(response.data.productInfo)

                }
            }
            else{
                alert("상품을 가져오는데 실패했습니다.")
            }
        })
    }

    const loadMoreHandler = () => {

        let body = {
            skip: Skip + Limit,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }
        setSkip(body.skip)
        getProducts(body)
    }

    const showFilterResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            loadMore: false,
            filters: filters
        }

        console.log('body', body)

        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = prices
        let array = []

        for(let key in data) {

            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array
            }
        }

        return array
    }

    const handleFilters = (filters, category) => {

        console.log('handleFilters-filters', filters)

        //setFirst(true)

        const newFilters = {...Filters}
        newFilters[category] = filters

        console.log('newFileters', newFilters)
        console.log('filter  ', filters)

        if(category === 'price') {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilterResults(newFilters)
        setFilters(newFilters)        
    }

// <img style={{ width: '100%', maxHeight:'250px'}} src={`http://localhost:5000/${product.images[0]}`} /> 

    const renderCards = Products.map((product, index) => {

            return <Col lg={6} md={8} xs={24} key={index}>
                <Card cover={ <a href={`/product/${product._id}`}><ImageSlider images={product.images}/> </a>} >
            
                    <Card.Meta title={product.title}
                        description={`${product.price}`}
                    />
                        
                </Card>
            </Col>
    })

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    return (
        <div style={{ width:'75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
            </div>

            { /* Filter */}

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={(filters) => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={prices} handleFilter={(filters) => handleFilters(filters, "price")}/>
                </Col>
            </Row>

            { /* Search */}
            <div style={{display:'flex', justifyContent:'flex-end', margin: '1rem auto' }}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>

            { /* Card */}
            <Row gutter={16}>
                {renderCards}
            </Row>
            {console.log("count : ", count)}

            {count > 0  &&
                <div style={{ justifyContent: 'center'}} >
                    <Button onClick={loadMoreHandler}> 더 보기</Button>
                </div>
            }
            
        </div>
    )
}

export default LandingPage
