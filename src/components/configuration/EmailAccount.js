import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import {
  Typography,
  Button,
  Input,
  Modal,
  Form,
  Col,
  Row,
  Checkbox,
  Table,
  Pagination,
} from "antd";
import "./MailTemplate.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  createAccount,
  editAccount,
  deleteAccount,
} from "../../repository/DataRepository.js";
import axios from "axios";

const { Title } = Typography;

const EmailAccount = () => {
  const [accountList, setAccountList] = useState([]);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [test, setTest] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    allAccount();
  }, []);

  const allAccount = () => {
    axios.get("/api/talent/email/").then((response) => {
      setAccountList(response.data);
    });
  };

  const handleName = (e) => {
    const val = e.target.value;
    setName(val);
  };

  const handleDescription = (e) => {
    const val = e.target.value;
    setDescription(val);
  };

  const handleEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
  };

  const handleUsername = (e) => {
    const val = e.target.value;
    setUsername(val);
  };

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  const handleConfirm = (e) => {
    const val = e.target.value;
    setConfirm(val);
  };

  const handleTest = (e) => {
    const val = e.target.checked;
    setTest(val);
  };

  const handleValidation = () => {
    // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
    if (password === "") {
      return alert("Input your password");
    } else if (password !== confirm) {
      return alert("Password required or Confirm password does not match");
    } else if (email === "") {
      return alert("Input your email");
    // } else if (email || regex.test(email) === true) {
    //   alert("Need @ on email");
    } 
    else {
      return true;
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const newData = {
        name: name,
        description: description,
        email: email,
        username: username,
        password: password,
        isTestAccount: test,
      };

      editAccount(newData, id);
      setName("");
      setDescription("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirm("");
      setTest("");
      setIsModalVisible1(false);
      allAccount();
    }
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const newData = {
        name: name,
        description: description,
        email: email,
        username: username,
        password: password,
        isTestAccount: test,
      };

      createAccount(newData);
      setName("");
      setDescription("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirm("");
      setTest("");
      setIsModalVisible(false);
      allAccount();
    } else {
    }
  };

  const handleDelete = () => {
    allAccount();
    deleteAccount(id);
    setIsModalVisible2(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },

    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
    },
    {
      title: "Is Test Account",
      dataIndex: "is_test_account",
      width: "1%",
      render : (test) => {
        return (
          <Checkbox value={test} onChange={handleTest}></Checkbox>
        )
      }
    },
    {
      title: "Action",
      width: "14%",
      render: (record) => {
        return (
          <>
            {/* edit button */}
            <Button
              onClick={() => {
                setIsModalVisible1(true);
                setId(record.id);
              }}
              style={{
                backgroundColor: "#1FBC6E",
                color: "white",
                marginRight: 4,
                borderRadius: 5,
              }}
            >
              Edit
            </Button>
            <Modal
              width={800}
              title="Edit Email Account"
              visible={isModalVisible1}
              onOk={handleOk1}
              onCancel={handleCancel1}
              footer={[
                <Button
                  key="back"
                  style={{
                    backgroundColor: "#e8e8e8",
                    borderColor: "#e8e8e8",
                    color: "#8a8d91",
                  }}
                  onClick={handleCancel1}
                >
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmitEdit}>
                  Ok
                </Button>,
              ]}
            >
              <Form layout="vertical" onSubmit={handleSubmitEdit}>
                <Form.Item label="Name :">
                  <Input
                    value={name}
                    onChange={handleName}
                    placeholder="Type Email Account Name"
                  />
                </Form.Item>
                <Form.Item label="Description :">
                  <Input
                    value={description}
                    onChange={handleDescription}
                    style={{ height: 80 }}
                    placeholder="Type Email Account Description"
                  />
                </Form.Item>
                <Row>
                  <Col span={10}>
                    <Form.Item label="Email">
                      <Input
                        placeholder="Type Email Account"
                        value={email}
                        onChange={handleEmail}
                      />
                    </Form.Item>
                    <Form.Item label="Password">
                      <Input.Password
                        placeholder="Type Email Password"
                        value={password}
                        onChange={handlePassword}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10} offset={4}>
                    <Form.Item label="Username">
                      <Input
                        placeholder="Type Email Username"
                        value={username}
                        onChange={handleUsername}
                      />
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                      <Input.Password
                        placeholder="Type Email Confirm Password"
                        value={confirm}
                        onChange={handleConfirm}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Checkbox checked={test} onChange={handleTest}>
                    Is Test Account
                  </Checkbox>
                </Form.Item>
              </Form>
            </Modal>

            {/* Delete button */}
            <Button
              onClick={() => {
                setIsModalVisible2(true);
                setId(record.id);
              }}
              style={{
                backgroundColor: "#EF2B2B",
                color: "white",
                borderRadius: 5,
                marginLeft: 6,
              }}
            >
              Delete
            </Button>
            <Modal
              width={800}
              visible={isModalVisible2}
              title="Delete Confirmation"
              onOk={handleOk2}
              onCancel={handleCancel2}
              footer={[
                <Button
                  key="back"
                  style={{
                    backgroundColor: "#e8e8e8",
                    borderColor: "#e8e8e8",
                    color: "#8a8d91",
                  }}
                  onClick={handleCancel2}
                >
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleDelete}>
                  Ok
                </Button>,
              ]}
            >
              <p>Are you sure going to delete?</p>
            </Modal>
          </>
        );
      },
    },
  ];

  return (
    <Content style={{ padding: 28, backgroundColor: "white" }}>
      {/* Adding new Email Account */}
      <>
        <div className="kiri">
          <Title level={2}>Email Account</Title>
        </div>
        <div className="kanan">
          <Button
            onClick={showModal}
            style={{
              backgroundColor: "#449342",
              color: "white",
              borderRadius: 5,
            }}
          >
            {<PlusOutlined />} Add New
          </Button>
          <Modal
            width={800}
            title="Add Email Account"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                style={{
                  backgroundColor: "#e8e8e8",
                  borderColor: "#e8e8e8",
                  color: "#8a8d91",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleSubmitNew}>
                Ok
              </Button>,
            ]}
          >
            {/* New Form */}
            <Form layout="vertical" onSubmit={handleSubmitNew}>
              <Form.Item label="Name :">
                <Input
                  value={name}
                  onChange={handleName}
                  placeholder="Type Email Account Name"
                />
              </Form.Item>
              <Form.Item label="Description :">
                <Input
                  value={description}
                  onChange={handleDescription}
                  style={{ height: 80 }}
                  placeholder="Type Email Account Description"
                />
              </Form.Item>
              <Row>
                <Col span={10}>
                  <Form.Item label="Email">
                    <Input
                      placeholder="Type Email Account"
                      value={email}
                      onChange={handleEmail}
                    />
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input.Password
                      placeholder="Type Email Password"
                      value={password}
                      onChange={handlePassword}
                    />
                  </Form.Item>
                </Col>
                <Col span={10} offset={4}>
                  <Form.Item label="Username">
                    <Input
                      placeholder="Type Email Username"
                      value={username}
                      onChange={handleUsername}
                    />
                  </Form.Item>
                  <Form.Item label="Confirm Password">
                    <Input.Password
                      placeholder="Type Email Confirm Password"
                      value={confirm}
                      onChange={handleConfirm}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Checkbox checked={test} onChange={handleTest}>
                  Is Test Account
                </Checkbox>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="kanan">
          <Button
            style={{
              backgroundColor: "#359D9E",
              color: "white",
              borderRadius: 5,
            }}
          >
            Search
          </Button>
        </div>
        <div className="kanan">
          <Input style={{ marginRight: 70 }} placeholder="Search Here...." />
        </div>
        {/* <TableConf2 /> */}
        {/* Tabel Email Account */}
        <Table
          bordered
          columns={columns}
          dataSource={accountList}
          pagination={false}
          scroll={{ x: 1500 }}
          style={{ marginTop: 70 }}
        />
        <Pagination
          style={{ marginTop: 18 }}
          total={accountList.length}
          showTotal={(total) => `Total ${total} items`}
          defaultPageSize={10}
          defaultCurrent={1}
        />
      </>
    </Content>
  );
};

export default EmailAccount;
