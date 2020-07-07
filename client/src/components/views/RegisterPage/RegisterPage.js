import React from 'react'
import { Input, Row, Col, Button } from 'antd';

function RegisterPage() {
    const functionRow = (text, input)=>{
        let inputZone = <Input placeholder={input}/>
        return(
            <Row gutter={16}>
                 <Col span={12}>{text}</Col><Col span={12}>{inputZone}</Col>
            </Row>
        )
    }

    return (
        <div style={{
            width:"100%", height:'100vh', display:'flex', justifyContent:'center', 
            alignItems:'center',flexDirection:'column'}}>
            <h2>Register</h2>
            <br/>
            <form>
                {functionRow('Name :', 'Name')}
                <br/>
                {functionRow('Last Name :', 'Last Name')}
                <br/>
                {functionRow('Email :', 'Email')}
                <br/>
                {functionRow('Password :', 'Password')}
                <br/>
                {functionRow('Confirm :', 'Confirm')}
                <br/>
                <Button style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Submit</Button>
            </form>
        </div>
    )
}

export default RegisterPage
