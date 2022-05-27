import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Typography,
  Form,
  Row,
  Col,
  Upload,
  message,
  Pagination,
} from "antd";
import "./ParticipationList.css";
import { ExcelRenderer } from "react-excel-renderer";
import { PlusOutlined, SyncOutlined, InboxOutlined } from "@ant-design/icons";
import {
  createParticipantExcel,
  createParticipant,
  deleteParticipant,
  editParticipant,
} from "./../../repository/DataRepository";
import axios from "axios";

const { Title } = Typography;
const { Dragger } = Upload;
const { Column } = Table;

const ParticipantEdit = () => {
  const [newRows, setNewRows] = useState([]);
  const [participantList, setParticipant] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [title, setTitle] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [kid, setKid] = useState("");
  const [id, setId] = useState("");
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    var baseUrl = window.location.href;
    var kid = baseUrl.substring(baseUrl.lastIndexOf("/") + 1);
    setKid(kid);
    test(kid);
  }, []);

  const test = (kid) => {
    axios
      .get("/api/talent/participant/" + kid)
      .then((response) => {
        setParticipant(response.data);
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  const handleTitle = (e) => {
    const val = e.target.value;
    setTitle(val);
  };

  const handleFirstName = (e) => {
    const val = e.target.value;
    setFirstName(val);
  };

  const handleLastName = (e) => {
    const val = e.target.value;
    setLastName(val);
  };

  const handleEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
  };

  const handleValidation = () => {
    // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
    if (email === "") {
      return alert("Input your email");
    // } else if (email || regex.test(email) === false) {
    //   alert("Need @ on email");
    } else {
      return true;
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
    const newData = {
      publisherId: id,
      title: title,
      first_name: firstname,
      last_name: lastname,
      email: email,
    };
    test(kid);
    editParticipant(newData, id);
    setTitle("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setIsModalVisible(false);
  }
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    const idint = parseInt(kid);
    if (handleValidation()) {
    const newData = {
      publisherId: idint,
      title: title,
      first_name: firstname,
      last_name: lastname,
      email: email,
    };
    console.log(newData);
    createParticipant(newData);
    setTitle("");
    setFirstName("");
    setLastName("");
    setEmail("");
    test(kid);
    setIsModalVisible2(false);
  }
  };

  const handleDelete = () => {
    deleteParticipant(id);
    test(kid);
    setIsModalVisible1(false);
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

  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const showModal3 = () => {
    setIsModalVisible3(true);
  };

  const handleOk3 = () => {
    createParticipantExcel(newRows);
    console.log(newRows);
    setIsModalVisible3(false);
  };

  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };

  const handleRefresh = () => {
    test(kid);
  };

  const fileHandler = (fileList) => {
    let fileObj = fileList;

    if (!fileObj) {
      message.error("No file uploaded!");
      return false;
    }
    // console.log("fileObj.type:", fileObj.type);

    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      message.error("Unknown file format. Only Excel files are uploaded!");
    } else {
      message.success("File uploaded!");
    }

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        // console.log(err);
        message.error("Cannot render Excel!");
      } else {
        const copy = [...newRows];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            const idint = parseInt(kid);
            copy.push({
              publisher: idint,
              title: row[0],
              first_name: row[1],
              last_name: row[2],
              email: row[3],
              status: row[4],
            });
          }
          return copy;
        });
        const data = {participantData: copy, publisherId:copy[0].publisher}
        setNewRows(data);

        if (copy.length === 0) {
          message.error("No data found in file!");
          return false;
        } else {
          // console.log(resp);
          setCols(resp.cols);
          setRows(copy);
        }
      }
    });
    return false;
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "8%",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      width: "15%",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Email Sending Status",
      dataIndex: "status",
      width: "18%",
    },
    {
      title: "Action",
      width: "15%",
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => {
                setIsModalVisible(true);
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
              title="Add Participant List"
              visible={isModalVisible}
              onOk={handleSubmitEdit}
              onCancel={handleCancel}
            >
              <Form layout="vertical" onSubmit={handleSubmitEdit}>
                <Form.Item label="Title">
                  <Input
                    value={title}
                    onChange={handleTitle}
                    placeholder="e.g. Mr/Mrs/Ms"
                  />
                </Form.Item>
                <Row>
                  <Col span={10}>
                    <Form.Item label="First Name:">
                      <Input
                        value={firstname}
                        onChange={handleFirstName}
                        placeholder="e.g. John"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10} offset={4}>
                    <Form.Item label="Last Name:">
                      <Input
                        value={lastname}
                        onChange={handleLastName}
                        placeholder="e.g. Doe"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Email:">
                  <Input
                    value={email}
                    onChange={handleEmail}
                    style={{ width: 330 }}
                    placeholder="e.g. johndoe@mail.com"
                  />
                </Form.Item>
              </Form>
            </Modal>

            <Button
              onClick={() => {
                setIsModalVisible1(true);
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
    <div className="Participation-list">
      <div className="kiri">
        <Title level={4}>Participant List </Title>
      </div>
      <div className="kiri">
        <Button
          style={{
            backgroundColor: "#359D9E",
            color: "white",
            borderRadius: 5,
            marginLeft: 14,
          }}
        >
          Mail Test Trial
        </Button>
      </div>
      <div className="kiri">
        <Button
          onClick={showModal3}
          style={{
            backgroundColor: "#1D6770",
            color: "white",
            borderRadius: 5,
            marginLeft: 7,
          }}
        >
          Import CSV
        </Button>
        <Modal
          width={800}
          title="Import CSV"
          visible={isModalVisible3}
          onOk={handleOk3}
          onCancel={handleCancel3}
        >
          <div>
            <Dragger
              name="file"
              multiple={false}
              beforeUpload={fileHandler}
              onRemove={() => setRows()}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drag & Drop Files to Upload</p>
              <p className="ant-upload-hint">Or Click to Upload</p>
            </Dragger>
          </div>
          
          <div style={{ marginTop: 20 }}>
            <Table dataSource={rows}>
              <Column title="Title" dataIndex="title" />
              <Column title="First Name" dataIndex="first_name" />
              <Column title="Last Name" dataIndex="last_name" />
              <Column title="Email" dataIndex="email" />
              <Column title="Email Sending Status" dataIndex="status" />
            </Table>
          </div>
          
        </Modal>
      </div>

      <div className="kanan">
        <Button
          onClick={handleRefresh}
          style={{
            backgroundColor: "#1D6770",
            color: "white",
            borderRadius: 5,
            paddingRight: 8,
          }}
        >
          {<SyncOutlined />}{" "}
        </Button>
      </div>
      <div className="kanan">
        <Button
          onClick={showModal2}
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
          title="Add Participant List"
          visible={isModalVisible2}
          onOk={handleSubmitNew}
          onCancel={handleCancel2}
        >
          <Form layout="vertical" onSubmit={handleSubmitNew}>
            <Form.Item label="Title">
              <Input
                value={title}
                onChange={handleTitle}
                placeholder="e.g. Mr/Mrs/Ms"
              />
            </Form.Item>
            <Row>
              <Col span={10}>
                <Form.Item label="First Name:">
                  <Input
                    value={firstname}
                    onChange={handleFirstName}
                    placeholder="e.g. John"
                  />
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item label="Last Name:">
                  <Input
                    value={lastname}
                    onChange={handleLastName}
                    placeholder="e.g. Doe"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Email:">
              <Input
                value={email}
                onChange={handleEmail}
                style={{ width: 330 }}
                placeholder="e.g. johndoe@mail.com"
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
      <Table
        bordered
        columns={columns}
        dataSource={participantList}
        onChange={participantList}
        pagination={false}
        scroll={{ x: 1100 }}
        style={{ marginTop: 70 }}
      />
      <Pagination
        style={{ marginTop: 18 }}
        total={participantList.length}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={10}
        defaultCurrent={1}
      />
    </div>
  );
};
export default ParticipantEdit;
