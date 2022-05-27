import React from "react";
import "./HeadConfig2.css";
import { Layout, Dropdown, Space, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

const menu = (
  <Menu
    items={[
      {
        label: (
          <a target="_self" rel="noopener noreferrer" href="/mail-template">
            Mail Template
          </a>
        ),
      },
      {
        label: (
          <a target="_self" rel="noopener noreferrer" href="/email-account">
            Email Account
          </a>
        ),
      },
    ]}
  />
);

const HeadConfig2 = () => {
  return (
    <Header
      className="HeadConfig"
      style={{
        position: "static",
        zIndex: 1,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Space size={71}>
        <Dropdown className="InsideHead2" overlay={menu}>
          <a href="a" onClick={(e) => e.preventDefault()}>
            <Space>
              Configuration
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Button
          onClick={() => {
            window.location.href = "/publisher";
          }}
          className="Pubs"
          type="text"
          style={{ backgroundColor: "white" }}
        >
          Publisher
        </Button>
      </Space>
    </Header>
  );
};

export default HeadConfig2;
