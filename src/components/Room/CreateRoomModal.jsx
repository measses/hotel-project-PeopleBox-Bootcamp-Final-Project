import React from "react";
import { Modal, Form, Input, Row, Col, Button } from "antd";

const CreateRoomModal = ({ isModalOpen, handleOk, handleCancel, form }) => {
  return (
    <Modal
      title="Add New Room"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="roomForm"
        initialValues={{ status: "Available", cleaning_status: "Clean" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="room_number"
              label="Room Number"
              rules={[
                { required: true, message: "Please input the room number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Room Type"
              rules={[
                { required: true, message: "Please input the room type!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select the status!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cleaning_status"
              label="Cleaning Status"
              rules={[
                {
                  required: true,
                  message: "Please select the cleaning status!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="checkin_date" label="Check-in Date">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="checkout_date" label="Check-out Date">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="guest_name" label="Guest Name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateRoomModal;
