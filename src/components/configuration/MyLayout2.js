import React from 'react'
import './MyLayout.css'
import { Layout } from 'antd';
import MyHeader from '../MyHeader'
import MySider from '../MySider';
import HeadConfig from './HeadConfig';
import EmailAccount from './EmailAccount';

const MyLayout2 = () => {
    return (
    <Layout>       
        <MyHeader />
        <HeadConfig />
        <Layout>
            <MySider />
            <EmailAccount />
            <MySider />
      </Layout>
    </Layout>
    )
}

export default MyLayout2;