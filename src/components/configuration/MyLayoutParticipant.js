import React from 'react'
import './MyLayout.css'
import { Layout } from 'antd';
import MyHeader from '../MyHeader'
import MySider from '../MySider';
import HeadConfig2 from './HeadConfig2';
import EditPublisher from './EditPublisher';

const MyParticipant = () => {
    return (
    <Layout>       
        <MyHeader />
        <HeadConfig2 />
        <Layout>
            <MySider />
            <EditPublisher />
            <MySider />
      </Layout>
    </Layout>
    )
}

export default MyParticipant;