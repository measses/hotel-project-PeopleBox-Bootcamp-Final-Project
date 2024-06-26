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
    dispatch(deleteRoom(id)).then((result) => {
      if (result.payload.success) {
        dispatch(fetchRooms());
        message.success("Oda başarıyla silindi!");
      } else {
        message.error(result.payload.message || "Oda silinemedi.");
      }
    });
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

      if (result.message === "Oda Eklendi") {
        dispatch(fetchRooms());
        message.success("Oda başarıyla eklendi!");
      } else if (result.message === "Oda Eklenemedi") {
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

      if (result.success) {
        dispatch(fetchRooms());
        message.success(result.message || "Oda başarıyla güncellendi!");
      } else {
        message.error(result.error || "Oda güncellenemedi.");
      }
    } catch (error) {
      console.error("Validate Failed:", error);
      message.error(
        "Oda güncellenemedi. Dolu odayı güncelliyor olabilirsiniz!"
      );
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
      sorter: (a, b) => a.room_number.localeCompare(b.room_number),
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
      sorter: (a, b) => a.status.localeCompare(b.status),
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
      sorter: (a, b) => a.cleaning_status.localeCompare(b.cleaning_status),
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
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
                  <Option value="Tek">Tek Kişilik</Option>
                  <Option value="Çift">Çift Kişilik</Option>
                  <Option value="Süit">Süit</Option>
                  <Option value="Diğer">Diğer</Option>
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
                  <Option value="Temiz">Temiz</Option>
                  <Option value="Kirli">Kirli</Option>
                  <Option value="Diğer">Diğer</Option>
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
                  <Option value="Tek">Tek Kişilik</Option>
                  <Option value="Çift">Çift Kişilik</Option>
                  <Option value="Süit">Süit</Option>
                  <Option value="Diğer">Diğer</Option>
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
                  <Option value="Temiz">Temiz</Option>
                  <Option value="Kirli">Kirli</Option>
                  <Option value="Diğer">Diğer</Option>
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
