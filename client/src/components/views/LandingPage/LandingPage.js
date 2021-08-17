import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button, Meta} from 'antd';
import ImageSlider from '../../utils/ImageSlider'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)    
    const [Count, setCount] = useState(0)
    const [First, setFirst] = useState(true)


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

                if(First)
                {
                    console.log("data.count", response.data.count)
                    setCount(response.data.count-Limit)    
                    setFirst(false)                
                }
                console.log("getCount", Count)

                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo])
                }
                else{
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
            loadMore: true
        }
        setSkip(body.skip)
        setCount(Count - Limit)
        getProducts(body)        
    }

// <img style={{ width: '100%', maxHeight:'250px'}} src={`http://localhost:5000/${product.images[0]}`} /> 

    const renderCards = Products.map((product, index) => {

            return <Col lg={6} md={8} xs={24} key={index}>
                <Card cover={ <ImageSlider images={product.images}/> } >
            
                    <Card.Meta title={product.title}
                        description={`${product.price}`}
                    />
                        
                </Card>
            </Col>
    })

    return (
        <div style={{ width:'75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
            </div>

            { /* Filter */}

            { /* Search */}

            { /* Card */}
            <Row gutter={16}>
                {renderCards}
            </Row>

            {console.log("Count", Count)}

            {Count > 0 &&
                <div style={{ justifyContent: 'center'}} >
                    <Button onClick={loadMoreHandler}> 더 보기</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage
