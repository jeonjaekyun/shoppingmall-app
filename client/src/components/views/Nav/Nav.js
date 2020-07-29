import React from 'react';
import { Input, Row, Col } from 'antd';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Nav.css';

const { Search } = Input;

function Nav() {

  return (
    <div style={{ width: '100%', margin: '0' }}>
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <Row>
          <Col span={8}>
            <LeftMenu />
          </Col>
          <Col span={8} style={{ textAlign: 'center', alignContent:'center', fontSize:'36px', color:'black'}}>
            <span className="title">K-Mart Mall</span>
          </Col>
          <Col span={8}>
            <RightMenu />
          </Col>
        </Row>
        {/* <Row>
        <Col span={8}></Col>
        <Col span={8} style={{ marginTop: "10px" }}>
          <Search placeholder="원하는 상품을 검색하세요" size="large"
            onSearch={value => console.log(value)} enterButton />
        </Col>
        <Col span={8}></Col>
      </Row> */}
      </div>
    </div>
  )
}

export default Nav
