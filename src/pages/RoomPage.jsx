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
  Select,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../redux/slices/roomsSlice";
import {
  fetchReservations,
  updateReservation,
} from "../redux/slices/reservationSlice";

const { Search } = Input;
const { Option } = Select;

const RoomPage = () => {
  const dispatch = useDispatch();
  const { rooms, status } = useSelector((state) => state.rooms);
  const { reservations } = useSelector((state) => state.reservations);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchReservations());
  }, [dispatch]);

  useEffect(() => {
    rooms.forEach((room) => {
      const reservation = reservations.find(
        (res) => res.room_id === room.id && res.status === "confirmed"
      );
      if (reservation && room.status !== "Occupied") {
        dispatch(updateRoom({ ...room, status: "Occupied" }));
      } else if (!reservation && room.status === "Occupied") {
        dispatch(updateRoom({ ...room, status: "Available" }));
      }
    });
  }, [rooms, reservations, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRoom(id))
      .then(() => dispatch(fetchRooms()))
      .then(() => message.success("Oda başarıyla silindi!"));
  };

  const handleEdit = (record) => {
    setEditingRoom(record);
    editForm.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      setIsModalOpen(false);
      const result = await dispatch(addRoom(values)).unwrap();

      if (result.message === "Room Created") {
        dispatch(fetchRooms());
        message.success("Oda başarıyla eklendi!");
      } else if (result.message === "Room Not Created") {
        message.error("Oda numarası zaten mevcut!");
      } else {
        message.error("Oda eklenemedi.");
      }
    } catch (error) {
      console.error("Validate Failed:", error);
      message.error("Oda eklenemedi.");
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      editForm.resetFields();
      setIsEditModalOpen(false);
      const updatedRoom = {
        ...editingRoom,
        ...values,
      };
      const result = await dispatch(updateRoom(updatedRoom)).unwrap();

      if (result.message === "Room Updated") {
        dispatch(fetchRooms());
        message.success("Oda başarıyla güncellendi!");
      } else if (
        result.error === "Room number already exists or other error occurred"
      ) {
        message.error("Oda numarası zaten mevcut veya başka bir hata oluştu!");
      } else {
        message.error("Oda güncellenemedi.");
      }
    } catch (error) {
      console.error("Validate Failed:", error);
      message.error("Oda güncellenemedi.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredRooms = Array.isArray(rooms)
    ? rooms.filter(
        (item) =>
          item.room_number?.includes(searchText) ||
          item.type?.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const columns = [
    {
      title: "Oda Numarası",
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "Oda Tipi",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        if (status === "Occupied") color = "volcano";
        if (status === "Available") color = "geekblue";
        return (
          <Badge color={color} text={status === "Occupied" ? "Dolu" : "Boş"} />
        );
      },
    },
    {
      title: "Temizlik Durumu",
      dataIndex: "cleaning_status",
      key: "cleaning_status",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${Number(price).toFixed(2)}`,
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: "#FFA500", borderColor: "#FFA500" }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Bu odayı silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="primary"
              danger
              style={{ backgroundColor: "#FF6347", borderColor: "#FF6347" }}
              icon={<DeleteOutlined />}
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography.Title level={2}>Oda Sayfası</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Oda Ekle
        </Button>
      </div>
      <div className="mb-4">
        <Search
          placeholder="Oda ara"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredRooms}
        rowKey="id"
        bordered
      />
      <Modal
        title="Yeni Oda Ekle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ekle"
        cancelText="İptal"
      >
        <Form
          form={form}
          layout="vertical"
          name="roomForm"
          initialValues={{ status: "Available", cleaning_status: "Temiz" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="room_number"
                label="Oda Numarası"
                rules={[
                  { required: true, message: "Lütfen oda numarasını girin!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Oda Tipi"
                rules={[
                  { required: true, message: "Lütfen oda tipini girin!" },
                ]}
              >
                <Select>
                  <Option value="Single">Tek Kişilik</Option>
                  <Option value="Double">Çift Kişilik</Option>
                  <Option value="Suite">Süit</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Durum"
                rules={[{ required: true, message: "Lütfen durumu seçin!" }]}
              >
                <Select>
                  <Option value="Occupied">Dolu</Option>
                  <Option value="Available">Boş</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cleaning_status"
                label="Temizlik Durumu"
                rules={[
                  {
                    required: true,
                    message: "Lütfen temizlik durumunu seçin!",
                  },
                ]}
              >
                <Select>
                  <Option value="Clean">Temiz</Option>
                  <Option value="Dirty">Kirli</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Fiyat"
                rules={[{ required: true, message: "Lütfen fiyatı girin!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Odayı Düzenle"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Kaydet"
        cancelText="İptal"
      >
        <Form
          form={editForm}
          layout="vertical"
          name="editRoomForm"
          initialValues={editingRoom}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="room_number"
                label="Oda Numarası"
                rules={[
                  { required: true, message: "Lütfen oda numarasını girin!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Oda Tipi"
                rules={[
                  { required: true, message: "Lütfen oda tipini girin!" },
                ]}
              >
                <Select>
                  <Option value="Single">Tek Kişilik</Option>
                  <Option value="Double">Çift Kişilik</Option>
                  <Option value="Suite">Süit</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Durum"
                rules={[{ required: true, message: "Lütfen durumu seçin!" }]}
              >
                <Select>
                  <Option value="Occupied">Dolu</Option>
                  <Option value="Available">Boş</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cleaning_status"
                label="Temizlik Durumu"
                rules={[
                  {
                    required: true,
                    message: "Lütfen temizlik durumunu seçin!",
                  },
                ]}
              >
                <Select>
                  <Option value="Clean">Temiz</Option>
                  <Option value="Dirty">Kirli</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Fiyat"
                rules={[{ required: true, message: "Lütfen fiyatı girin!" }]}
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
