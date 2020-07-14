import React,{useState, useEffect} from 'react';
import {Row, Col, Button, InputNumber} from 'antd';
import Comment from '../../commons/views/Comment';
import { useSelector } from "react-redux";
import axios from 'axios';

function ProductPage(props) {
    
    const user = useSelector(state => state.user);
    let productId = props.match.params.productId;

    const [Product, setProduct] = useState([]);
    const [Image, setImage] = useState('');
    const [Cnt, setCnt] = useState(1);

    useEffect(() => {

        axios.get(`/api/product/${productId}`)
            .then(response => {
                if(response.data.success){
                    setImage(response.data.result.images[0]);
                    setProduct(response.data.result);
                }else{

                }
            });
    }, [productId])

    const onCartHandler = () =>{
        
        let body = {
            userFrom:user.userData._id,
            productFrom:productId,
            title:Product.title,
            price:Product.price,
            cnt:Cnt
        }

        axios.post(`/api/cart/${productId}`, body)
            .then(response => {
                if(response.data.success){
                    alert('장바구니 등록 완료!!');
                }else{
                    
                }
            })
    }

    const onNumberHandler = (value) => {
        setCnt(value);
    }

    return (
            <div style={{ width: '100%', margin: '0' }}>
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2>제품</h2>
                    
                    <Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <div style={{ position: 'relative' }}>
                                <img alt={Product.title} src={`http://localhost:5000/${Image}`}
                                    style={{ width: '100%', height: '345px' }} />
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div style={{width:"100%", height:'345px'}}
                            >
                                <form>
                                    <hr/>
                                    <h2>{Product.title}</h2>
                                    <hr/>
                                    <br/><br/>
                                    <label>가격</label>
                                    <h3>{Product.price}</h3>
                                    <hr/>
                                    <br/><br/>
                                    <label>설명</label>
                                    <h3>{Product.description}</h3>
                                    <hr/>
                                    <br/>
                                    <Row gutter={16}>
                                        <Col><InputNumber onChange={onNumberHandler} defaultValue={1}/></Col>
                                        <Col><Button type="primary">구매</Button></Col>
                                        <Col><Button type="primary" onClick={onCartHandler}>장바구니</Button></Col>
                                    </Row>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <div style={{marginTop:'100px'}}>
                        <hr/>
                        <h2>상품평</h2>
                        <hr/>
                        <Comment productId={productId}></Comment>
                    </div>
                </div>
            </div>
    )
}

export default ProductPage
