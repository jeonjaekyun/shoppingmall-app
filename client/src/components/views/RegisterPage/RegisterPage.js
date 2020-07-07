import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {Button, Input, Row, Col} from 'antd';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Confirm, setConfirm] = useState('');
    const dispatch = useDispatch();

    const onEmailHandler = (event) =>{
        setEmail(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onConfirmHandler = (event) =>{
        setConfirm(event.target.value);
    }

    const onNameHandler = (event) =>{
        setName(event.target.value);
    }

    const onLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        if(Password !== Confirm){
            return alert('비밀번호와 확인을 똑같이 입력하시오!');
        }

        let body = {
            email:Email,
            password:Password,
            name:Name,
            lastname:LastName,
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push('/login');
                }else{
                    alert('회원가입 실패했습니다.');
                }
            });
    }

    return (
        <div style={{
            width:"100%", height:'100vh', display:'flex', justifyContent:'center', 
            alignItems:'center',flexDirection:'column'}}>
            <h2>Register</h2>
            <br/>
            <form onSubmit={onSubmitHandler}>
                <Row gutter={16} style={{ width: '300px' }}>
                    <Col span={8}>Email :</Col>
                    <Col span={16}><Input placeholder='Email' value={Email} onChange={onEmailHandler}/></Col>
                </Row>
                <br/>
                <Row gutter={16} style={{ width: '300px' }}>
                    <Col span={8}>Name :</Col>
                    <Col span={16}><Input placeholder='Name' value={Name} onChange={onNameHandler}/></Col>
                </Row>
                <br/>
                <Row gutter={16} style={{ width: '300px' }}>
                    <Col span={8}>Last Name :</Col>
                    <Col span={16}><Input placeholder='Last Name' value={LastName} onChange={onLastNameHandler}/></Col>
                </Row>
                <br/>
                <Row gutter={16} style={{ width: '300px' }}>
                    <Col span={8}>Password :</Col>
                    <Col span={16}><Input type='password' placeholder='Password' value={Password}
                        onChange={onPasswordHandler}/></Col>
                </Row>
                <br/>
                <Row gutter={16} style={{ width: '300px' }}>
                    <Col span={8}>Confirm :</Col>
                    <Col span={16}><Input type='password' placeholder='Confirm Password' value={Confirm}
                        onChange={onConfirmHandler}/></Col>
                </Row>
                <br/>
                <Button style={{marginLeft:'100px'}} htmlType="submit">Submit</Button>
            </form>
        </div>
    )
}

export default  withRouter(RegisterPage)
