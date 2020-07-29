import React from 'react'
import { Menu } from 'antd';
const { SubMenu } = Menu;
function LeftMenu() {
    return (
        <div>
            <Menu mode="horizontal" style={{borderBottom:'none', fontSize:'24px'}}>
                <Menu.Item>
                    <a href="/">HOME</a>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default LeftMenu
