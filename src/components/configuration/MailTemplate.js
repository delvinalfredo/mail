import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import {
  Typography,
  Button,
  Input,
  Modal,
  Form,
  Table,
  Pagination,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  createMail,
  editMail,
  deleteMail,
} from "../../repository/DataRepository";
import axios from "axios";
import "./MailTemplate.css";

const { Title } = Typography;

const MailTemplate = () => {
  const [mailList, setMailList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [subject, setSubject] = useState([]);
  const [html, setHtml] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    allMail();
  }, []);

  const allMail = () => {
    axios.get("/api/talent/template").then((response) => {
      console.log(response);
      setMailList(response.data);
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

  const handleHtml = (e) => {
    const val = e.target.value;
    setHtml(val);
  };

  const handleSubject = (e) => {
    const val = e.target.value;
    setSubject(val);
  };

  const handleValidation = () => {
    if (name === "") {
      return false;
    } else if (subject === "") {
      return false;
    } else if (html === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const newData = {
        name: name,
        description: description,
        subject: subject,
        htmlTemplate: html,
      };

      editMail(newData, id);
      setName("");
      setDescription("");
      setSubject("");
      setHtml("");
      setIsModalVisible1(false);
      allMail();
    } else {
      alert("Field must be not empty");
    }
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const newData = {
        name: name,
        description: description,
        subject: subject,
        htmlTemplate: html,
      };

      createMail(newData);
      setName("");
      setDescription("");
      setSubject("");
      setHtml("");
      setIsModalVisible(false);
      allMail();
    } else {
      alert("Name required");
    }
  };

  const handleDelete = () => {
    deleteMail(id);
    setIsModalVisible2(false);
    allMail();
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
      title: "Description",
      dataIndex: "description",
      width: "30%",
    },
    {
      title: "Email Subject",
      dataIndex: "subject",
      width: "40%",
    },
    {
      title: "Action",
      width: "15%",
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
              title="Edit Mail Template"
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
                <Button key="submit" onClick={handleSubmitEdit} type="primary">
                  Ok
                </Button>,
              ]}
            >
              <Form layout="vertical" onSubmit={handleSubmitEdit}>
                <Form.Item label="Name">
                  <Input
                    value={name}
                    onChange={handleName}
                    placeholder="Type Mail Template Name"
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    value={description}
                    onChange={handleDescription}
                    style={{ height: 80 }}
                    placeholder="Type Mail Template Description"
                  />
                </Form.Item>
                <Form.Item label="Email Subject">
                  <Input
                    value={subject}
                    onChange={handleSubject}
                    style={{ height: 80 }}
                    placeholder="Type Email Subject"
                  />
                </Form.Item>
                <Form.Item label="HTML Template:">
                  <Input
                    value={html}
                    onChange={handleHtml}
                    style={{ height: 200 }}
                    placeholder="Type HTML Template"
                  />
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
      {/* Adding new template */}
      <>
        <div className="kiri">
          <Title level={2}>Mail Template</Title>
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
            title="Add New Mail Template"
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
              <Button key="submit" onClick={handleSubmitNew} type="primary">
                Ok
              </Button>,
            ]}
          >
            <Form layout="vertical" onSubmit={handleSubmitNew}>
              <Form.Item label="Name">
                <Input
                  value={name}
                  onChange={handleName}
                  placeholder="Type Mail Template Name"
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  value={description}
                  onChange={handleDescription}
                  style={{ height: 80 }}
                  placeholder="Type Mail Template Description"
                />
              </Form.Item>
              <Form.Item label="Email Subject">
                <Input
                  value={subject}
                  onChange={handleSubject}
                  style={{ height: 80 }}
                  placeholder="Type Email Subject"
                />
              </Form.Item>
              <Form.Item label="HTML Template:">
                <Input
                  value={html}
                  onChange={handleHtml}
                  style={{ height: 200 }}
                  placeholder="Type HTML Template"
                />
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
        {/* Table Mail Template  */}
        <>
          <Table
            bordered
            columns={columns}
            dataSource={mailList}
            onChange={mailList}
            pagination={false}
            scroll={{ x: 1000 }}
            style={{ marginTop: 70 }}
          />
          <Pagination
            style={{ marginTop: 18 }}
            total={mailList.length}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={10}
            defaultCurrent={1}
          />
        </>
      </>
    </Content>
  );
};

export default MailTemplate;
