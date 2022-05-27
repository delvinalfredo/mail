import React from 'react'
import './MyLayout.css'
import { Layout } from 'antd';
import MyHeader from '../MyHeader'
import MySider from '../MySider';
import HeadConfig2 from './HeadConfig2';
import PublisherForm from './PublisherForm';

const MylayoutPubForm = () => {
    return (
    <Layout>       
        <MyHeader />
        <HeadConfig2 />
        <Layout>
            <MySider />
            <PublisherForm />
            <MySider />
      </Layout>
    </Layout>
    )
}

export default MylayoutPubForm;