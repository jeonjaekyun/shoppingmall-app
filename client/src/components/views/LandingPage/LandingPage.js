import React from 'react';
import {Button} from 'antd';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {

    const onLogoutHandler = (event) => {
        event.preventDefault();

        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    props.history.push('/login');
                }else{
                    alert('로그아웃 실패!');
                }
            })
    }

    return (
        <div>
            Hello Ours Shopping Mall!!<br/><br/>
            <Button onClick={onLogoutHandler}>Logout</Button>
        </div>
    )
}

export default withRouter(LandingPage);
