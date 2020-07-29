import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Table } from 'antd';

function CartPage(props) {

    const [Product, setProduct] = useState([]);

    useEffect(() => {
        cartList();
    }, []);

    const cartList = () => {
        axios.post('/api/cart/', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                    setProduct(response.data.result);
                } else {
                    alert('장바구니 불러오기 실패!');
                }
            })
    }

    const columns = [
        {
            title: '상품명',
            dataIndex: 'title',
            render: text => <a href="/">{text}</a>,
        },
        {
            title: '가격',
            dataIndex: 'price',
        },
        {
            title: '수량',
            dataIndex: 'cnt',
        },
        {
            title:'삭제',
            render:record => 
            <Button type="primary" onClick={()=>onDeleteHandler(record.userFrom, record.productFrom)}>삭제</Button>
        }
    ];

    const dataSource = () => {
        let data = [];

       Product.map((value, index) => {
         data.push({key:index, title:value.title, 
            price:value.price, cnt:value.cnt, id:value._id, 
            userFrom:value.userFrom, productFrom:value.productFrom});
       });

       return data;
    }

    const onDeleteHandler = (userFrom, productFrom) => {

        axios.delete('/api/cart/', {data:{userFrom,productFrom}})
            .then(response => {
                if(response.data.success){
                    cartList();
                }else{
                    alert('삭제 실패!');
                }
            })
    }

    return (
        <div style={{width: '85%',margin:'120px'}}>
            <h2>장바구니</h2>
            <Table
                columns={columns}
                dataSource={dataSource()}
            />
            
            <Button type="primary">구매</Button>
                
        </div>
    )
}

export default CartPage
