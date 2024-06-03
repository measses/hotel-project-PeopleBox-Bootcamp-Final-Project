import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Typography,
  Badge,
  Input,
  Form,
  Modal,
  Row,
  Col,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // uuid paketini içe aktarın

const { Search } = Input;

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/room/rooms.php"
      );
      const roomsWithKey = response.data.map((room) => ({
        ...room,
        key: uuidv4(),
      }));
      setRooms(roomsWithKey);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(
        `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/room/delete_room.php`,
        {
          data: { key },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRooms(rooms.filter((room) => room.key !== key));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleEdit = (record) => {
    console.log("Edit record:", record);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      setIsModalOpen(false);
      const newRoom = {
        ...values,
        key: uuidv4(), // Benzersiz bir key oluşturun
      };
      const response = await axios.post(
        `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/room/create_room.php`,
        newRoom,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRooms([...rooms, newRoom]);
    } catch (error) {
      console.error("Validate Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredRooms = Array.isArray(rooms)
    ? rooms.filter(
        (item) =>
          item.room_number?.includes(searchText) ||
          item.type?.toLowerCase().includes(searchText.toLowerCase()) ||
          (item.guest_name &&
            item.guest_name.toLowerCase().includes(searchText.toLowerCase()))
      )
    : [];

  const columns = [
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        if (status === "Occupied") color = "volcano";
        if (status === "Available") color = "geekblue";
        return <Badge color={color} text={status} />;
      },
    },
    {
      title: "Check-in Date",
      dataIndex: "checkin_date",
      key: "checkin_date",
    },
    {
      title: "Check-out Date",
      dataIndex: "checkout_date",
      key: "checkout_date",
    },
    {
      title: "Guest Name",
      dataIndex: "guest_name",
      key: "guest_name",
    },
    {
      title: "Cleaning Status",
      dataIndex: "cleaning_status",
      key: "cleaning_status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${Number(price).toFixed(2)}`, // Düzeltilmiş render metodu
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: "#FFA500", borderColor: "#FFA500" }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this room?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              type="primary"
              danger
              style={{ backgroundColor: "#FF6347", borderColor: "#FF6347" }}
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography.Title level={2}>Room Page</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Room
        </Button>
      </div>
      <div className="mb-4">
        <Search
          placeholder="Search rooms"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredRooms}
        rowKey="key"
        bordered
      />
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
                rules={[
                  { required: true, message: "Please select the status!" },
                ]}
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
    </div>
  );
};

export default RoomPage;
