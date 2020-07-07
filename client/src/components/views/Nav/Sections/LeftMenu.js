import React from 'react'
import { Menu } from 'antd';
const { SubMenu } = Menu;
function LeftMenu() {
    return (
        <div>
            <Menu mode="horizontal" style={{borderBottom:'none', fontSize:'16px'}}>
                <SubMenu title="카테고리">
                    <Menu.Item>Option 1</Menu.Item>
                    <Menu.Item>Option 2</Menu.Item>
                    <Menu.Item>Option 3</Menu.Item>
                </SubMenu>
                <Menu.Item>
                    <a href="/">HOME</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/">QA</a>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default LeftMenu
