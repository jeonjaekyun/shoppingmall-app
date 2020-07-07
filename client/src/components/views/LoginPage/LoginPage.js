import React from 'react'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginPage() {
    return (
        <div>
            <h2>Login</h2>
            <form>
                Email : <Input placeholder="Email" prefix={<UserOutlined />}/>
                Password : <Input placeholder="Password" prefix={<LockOutlined />}/>  
                <Button>Login</Button>  
            </form>
        </div>
    )
}

export default LoginPage
