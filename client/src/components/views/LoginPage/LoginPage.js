//import {functionRow} from '../../commons/functions/functionRow';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { Button, Input, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onEmailHandler = (event) =>{
        setEmail(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        let body = {
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
        .then(response => {
            //console.log(response);
            if(response.payload.loginSuccess){
                props.history.push('/');
            }else{
                alert('Error');
            }
        })
    }

    
    return (
        <div style={{
            width:"100%", height:'100vh', display:'flex', justifyContent:'center', 
            alignItems:'center',flexDirection:'column'}}
        >
            <h2>Login</h2>
            <br/>
            <form onSubmit={onSubmitHandler}>
                {/* {functionRow('Email :', 'Passoword', <UserOutlined />, onEmailHandler)}
                {functionRow('Password :', 'Password', <LockOutlined />, onPasswordHandler)} */}
                <Row gutter={16} style={{ width: '300px' }}>
                    <Col span={8}>Email :</Col>
                    <Col span={16}><Input type="email" placeholder="Email" 
                        prefix={<UserOutlined />} onChange={onEmailHandler}/></Col>
                </Row>
                <br/>
                <Row gutter={16} style={{ width: '300px' }}>
                    <Col span={8}>Password :</Col>
                    <Col span={16}><Input type="password" placeholder="Password" 
                    prefix={<LockOutlined />} onChange={onPasswordHandler}/></Col>
                </Row>
                <br/>
                <Button htmlType="submit" style={{marginLeft:'100px'}}>Login</Button>  
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
