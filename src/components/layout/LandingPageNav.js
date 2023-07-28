import { React, useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';



const LandingPageNav = () => {
    const navigate = useNavigate();

    const handleNav = (path) => {
        navigate(path);
    };



    const menuItems = [
        {
            label: 'Home',
            key: 'home',
            onClick: () => handleNav('/'),
        },
        {
            label: 'Login',
            key: 'login',
            onClick: () => handleNav('/login'),
        },
        {
            label: 'Register',
            key: 'registration',
            onClick: () => handleNav('/registration'),
        },
    ];


    return (
        <Menu
            mode="horizontal"
            items={menuItems}
            style={{
                background: '#615460',
                color: 'white',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                padding: '10px',
                zIndex: 9999,
            }}
            className='landingPageNav'
        />

    )
}

export default LandingPageNav;