/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {

    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login');
                    window.localStorage.removeItem('userId');
                } else {
                    alert('로그아웃 실패!');
                }
            })
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode='horizontal' style={{float:"right", borderBottom:'none', fontSize:'16px'}}>
                <Menu.Item>
                    <a href="/login">로그인</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/register">회원가입</a>
                </Menu.Item>
            </Menu>
        )
    } else if (user.userData && user.userData.isAdmin) {
        return (
            <Menu mode='horizontal' style={{float:"right", borderBottom:'none', fontSize:'16px'}}>
                <Menu.Item>
                    <a href="/product/upload">Upload</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/cart">Cart</a>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={logoutHandler}>Logout</span>
                </Menu.Item>
            </Menu>
        )
    }else{
        return (
            <Menu mode='horizontal' style={{float:"right", borderBottom:'none', fontSize:'16px'}}>
                <Menu.Item>
                    <a href="/cart">Cart</a>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={logoutHandler}>Logout</span>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);

