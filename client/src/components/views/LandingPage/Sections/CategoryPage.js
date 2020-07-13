import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Row, Col} from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

function CategoryPage(props) {

    const [Product, setProduct] = useState([]);

    useEffect(() => {

        let body = {
            categoryNumber:props.categoryNumber
        }

        axios.post('/api/product', body)
            .then(response => {
                if(response.data.success){
                    setProduct(response.data.results);
                }else{

                }
            });

    }, [props.categoryNumber])

    return (
        <div>
            <Row gutter={16}>
                    {Product && Product.map((value,index)=>(
                        <Col lg={6} md={8} xs={24} key={index}>
                            <div style={{position:'relative'}}>
                                <a href={`/product/${value._id}`}>
                                    <Card
                                        hoverable
                                        style={{width:'100%', height:'350px'}}
                                        cover={<img alt={value.title} src={`http://localhost:5000/${value.images[0]}`} />}
                                    >
                                        <Meta title={value.title} description={"가격 : "+value.price}/>
                                    </Card>
                                </a>
                            </div>
                        </Col>
                    ))}
                </Row>
        </div>
    )
}

export default CategoryPage
