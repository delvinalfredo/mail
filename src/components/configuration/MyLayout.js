import React from 'react'
import './MyLayout.css'
import { Layout } from 'antd';
import MyHeader from '../MyHeader'
import MailTemplate from './MailTemplate';
import MySider from '../MySider';
import HeadConfig from './HeadConfig';

const MyLayout = () => {
    return (
    <Layout>       
        <MyHeader />
        <HeadConfig />
        <Layout>
            <MySider />
            <MailTemplate />
            <MySider />
      </Layout>
    </Layout>
    )
}

export default MyLayout;