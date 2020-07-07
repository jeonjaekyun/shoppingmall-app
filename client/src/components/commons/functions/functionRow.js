import React from 'react'
import { Input, Row, Col} from 'antd';

const functionRow = (text, input, prefix=null,fn=null) =>{
    let icon = prefix;
    let inputZone = <Input placeholder={input} prefix={icon} onChange={fn}/>
    
    return(
        <Row gutter={16} style={{width:'300px'}}>
             <Col span={8}>{text}</Col><Col span={16}>{inputZone}</Col>
        </Row>
    )
}

export {functionRow}