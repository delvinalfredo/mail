import React from "react";
import "./MyHeader.css";
import { Layout, Avatar, Input, Typography, Menu, Dropdown, Space } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const menu = (
  <Menu
    items={[
      // {
      //   label: <a href="/">My Account</a>,
      //   key: "0",
      // },
      // {
      //   label: <a href="/">Edit Info</a>,
      //   key: "1",
      // },
      // {
      //   type: "divider",
      // },
      {
        label: <a href="/">Logout</a>,
        key: "3",
      },
    ]}
  />
);

const MyHeader = () => {
  return (
    <Header
      className="Head"
      style={{ position: "static", zIndex: 1, width: "100%", margin: 0 }}
    >
      <img
        style={{ margin: 10, float: "left", height: 42 }}
        src="/logo.png"
        alt="THRM"
        onClick={() => {
          window.location.href ="/mail-template";
        }}
      ></img>
      <Input placeholder="Search ..." style={{ width: 300, margin: 15 }} />
      <div className="Option" style={{ float: "right" }}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a href="a" onClick={(e) => e.preventDefault()}>
            <Space>
              <SettingOutlined />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <div className="Account">
          <Title
            style={{
              fontSize: 12,
              float: "right",
              marginTop: 18,
              marginRight: 12,
            }}
          >
            John Doe Joko
            <br /> Employee
          </Title>
          <Avatar
            size={40}
            src="/avatar.png"
            style={{ marginTop: 13, marginRight: 12, float: "right" }}
          />
        </div>
      </div>
    </Header>
  );
};

export default MyHeader;
