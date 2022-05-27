import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { Typography, Button, Input, Table, Modal, message, Pagination } from "antd";
import "./MailTemplate.css";
import { PlusOutlined } from "@ant-design/icons";
import { deletePublisher, emailSend } from "../../repository/DataRepository";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;

const Publisher = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [publisher, setPublisher] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    allPublisher();
  }, []);

  const allPublisher = () => {
    axios
      .get("/api/talent/publisher/")
      .then((response) => {
        setPublisher(response.data);
      })
  };

  const handleDelete = () => {
    allPublisher();
    deletePublisher(id);
    setIsModalVisible(false);
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

  const columns = [
    {
      title: "Email Account",
      dataIndex: "emailAccount",
    },
    {
      title: "Template Name",
      dataIndex: "emailTemplate",
    },
    {
      title: "Sending Start Date",
      dataIndex: "sendingStartDate",
      render: (record) => {
        return <div>{moment(record).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      title: "Sending End Date",
      dataIndex: "sendingEndDate",
      render: (record) => {
        return <div>{moment(record).format("DD-MM-YYYY")}</div>;
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    // },
    {
      title: "Last Status Update Date",
      dataIndex: "update",
      render: (record) => {
        return <div>{moment(record).format("DD-MM-YYYY, H:MM:SS A")}</div>;
      },
    },

    {
      title: "Action",
      render: (record) => {
        const handleMail = (e) => {
          const key = "updatable";
          e.preventDefault();
          setId(record.id);
          const newData = {
            id: record.id,
          };
          emailSend(newData, id);
          message.loading({ content: "Loading...", key });
          setTimeout(() => {
            message.success({ content: "Email sent!", key, duration: 10 });
          }, 1000);
        };

        return (
          <>
            <Button
              onClick={() => {
                setId(record.id);
                window.location.href = `/publisher/form/${record.id}`;
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


            {/* Delete button */}
            <Button
              onClick={() => {
                setIsModalVisible(true);
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
              visible={isModalVisible}
              title="Delete Confirmation"
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
                <Button key="submit" type="primary" onClick={handleDelete}>
                  Ok
                </Button>,
              ]}
            >
              <p>Are you sure going to delete?</p>
            </Modal>
            <Button
              className="send"
              onClick={handleMail}
              style={{
                color: "white",
                borderRadius: 5,
                marginLeft: 6,
              }}
            >
              Start
            </Button>
            <Modal
              visible={isModalVisible1}
              title="Delete Confirmation"
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
                <Button key="submit" type="primary" onClick={handleOk1}>
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
      <>
        <div className="kiri">
          <Title level={2}>List of Publisher</Title>
        </div>
        <div className="kanan">
          <Button
            onClick={() => {
              window.location.href = "/publisher/form";
            }}
            style={{
              backgroundColor: "#449342",
              color: "white",
              borderRadius: 5,
            }}
          >
            {<PlusOutlined />} Add New
          </Button>
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
        {/* Tabel publisher */}
        <Table
          bordered
          columns={columns}
          dataSource={publisher}
          onChange={publisher}
          pagination={false}
          scroll={{ x: 1400 }}
          style={{ marginTop: 70 }}
        />
        <Pagination
            style={{ marginTop: 18 }}
            total={publisher.length}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={10}
            defaultCurrent={1}
          />
      </>
    </Content>
  );
};

export default Publisher;
