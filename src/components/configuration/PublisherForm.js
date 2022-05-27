import React, { useState, useEffect } from "react";
import "./MyLayout.css";
import { Content } from "antd/lib/layout/layout";
import {
  Breadcrumb,
  Typography,
  Button,
  Form,
  Select,
  Row,
  Col,
  message,
  Checkbox,
  DatePicker,
  TimePicker,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import "./FormPub.css";
import moment from "moment";
// import ParticipationList from "./ParticipationList";
import { createPublisher } from "./../../repository/DataRepository";
import axios from "axios";
import ParticipationList from "./ParticipationList";

const { Title } = Typography;
const { Option } = Select;

const PublisherForm = () => {
  const [show, setShow] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [mailList, setMailList] = useState([]);
  const [emailAccountId, setEmailAccountId] = useState("");
  const [templateNameId, setTemplateNameId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [weekdays, setWeekdays] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    allMail();
    allAccount();
  }, []);

  const allMail = () => {
    axios
      .get("/api/talent/template")
      .then((response) => {
        setMailList(response.data);
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  const allAccount = () => {
    axios
      .get("/api/talent/email/")
      .then((response) => {
        setAccountList(response.data);
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  const handleEmailAccount = (e) => {
    setEmailAccountId(e);
  };

  const handleTemplateName = (e) => {
    setTemplateNameId(e);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (e) => {
    setEndDate(e);
  };

  const handleStartTime = (e) => {
    setStartTime(e);
  };

  const handleEndTime = (e) => {
    setEndTime(e);
  };

  const handleWeekdays = (e) => {
    const val = e.target.checked;
    setWeekdays(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      emailAccountId: emailAccountId,
      emailTemplateId: templateNameId,
      sendingStartDate: startDate,
      sendingEndDate: endDate,
      sendingStartTime: startTime,
      sendingEndTime: endTime,
      weekdays: weekdays,
    };
    createPublisher(newData).then((res) => {
      setId(res.data.data.id);
    });
    setEmailAccountId("");
    setTemplateNameId("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setWeekdays("");
    message.success("Publisher Created");
    setShow(!show);
  };

  const onSearch = (val) => {
    console.log("search:", val);
  };

  const showHide = (e) => {
    setShow(!show);
  };

  return (
    <Content style={{ padding: 28, backgroundColor: "white" }}>
      {/* <MyContentForm /> */}
      <Breadcrumb>
        <img
          alt="back"
          src="../back.png"
          style={{ marginRight: 8, marginBottom: 15 }}
          onClick={() => {
            window.location.href = "/publisher";
          }}
        ></img>
        <Breadcrumb.Item>List of Publisher</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="w">Publisher Form</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="kiri">
        <Title level={2}>Publisher Form</Title>
      </div>

      {/* <div className="kanan">
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#0FAFC9",
              color: "white",
              borderRadius: 5,
            }}
          >
            {" "}
            <SaveOutlined /> Save Publisher
          </Button>
        </div> */}

      <Form className="Format1" layout="vertical" onSubmit={handleSubmit}>
        <Row className="User">
          <Col span={11}>
            <Form.Item label="Email Account">
              <Select
                showSearch
                placeholder="Type Email Address"
                optionFilterProp="children"
                onSearch={onSearch}
                onChange={handleEmailAccount}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {accountList.map((item) => {
                  return <Option value={item.id}>{item.email}</Option>;
                })}
              </Select>
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="Start Date">
                  <DatePicker onChange={handleStartDate} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sending End Date">
                  <DatePicker onChange={handleEndDate} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Checkbox checked={weekdays} onChange={handleWeekdays}>
                {" "}
                Only Weekdays
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item label="Template Name">
              <Select
                showSearch
                placeholder="Type Template Name"
                optionFilterProp="children"
                onSearch={onSearch}
                onChange={handleTemplateName}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {mailList.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="Sending Start Time">
                  <TimePicker
                    onChange={handleStartTime}
                    defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sending End Time">
                  <TimePicker
                    onChange={handleEndTime}
                    defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Button
        style={{
          marginTop: 12,
          borderRadius: 5,
          marginLeft: 2,
          backgroundColor: "#0FAFC9",
          color: "white",
        }}
        onClick={handleSubmit}
      >
        {" "}
        <SaveOutlined />
        Submit
      </Button>

      <Button
        style={{
          marginTop: 12,
          borderRadius: 5,
          marginLeft: 2,
          backgroundColor: "green",
          color: "white",
        }}
        onClick={showHide}
      >
        Hide / Show
      </Button>
      {show && <ParticipationList publisherID={id} />}
    </Content>
  );
};

export default PublisherForm;
