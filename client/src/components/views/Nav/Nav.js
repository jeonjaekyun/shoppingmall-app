import React from 'react';
import {Input, Row, Col} from 'antd';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

const { Search } = Input;

function Nav() {

  return (
    <div>
      <Row>
        <Col span={12}>
          <LeftMenu/>
        </Col>
        <Col span={12}>
          <RightMenu/>
        </Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8} style={{ marginTop: "10px" }}>
          <Search placeholder="원하는 상품을 검색하세요" size="large"
            onSearch={value => console.log(value)} enterButton />
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  )
}

export default Nav
