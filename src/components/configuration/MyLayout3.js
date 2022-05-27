import React from 'react'
import './MyLayout.css'
import { Layout } from 'antd';
import MyHeader from '../MyHeader'
import MySider from '../MySider';
import HeadConfig2 from './HeadConfig2';
import Publisher from './Publisher';

const MyLayout3 = () => {
    return (
    <Layout>       
        <MyHeader />
        <HeadConfig2 />
        <Layout>
            <MySider />
            <Publisher />
            <MySider />
      </Layout>
    </Layout>
    )
}

export default MyLayout3;