import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Typography,
  Input,
  Form,
  Modal,
  Row,
  Col,
  Select,
  message,
  DatePicker,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  addReservation,
  updateReservation,
  deleteReservation,
} from "../redux/slices/reservationSlice";
import { fetchRooms, updateRoom } from "../redux/slices/roomsSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Search } = Input;
const { Option } = Select;

const ReservationPage = () => {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservations);
  const { rooms } = useSelector((state) => state.rooms);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchReservations());
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteReservation(id))
      .then(() => dispatch(fetchReservations()))
      .then(() => message.success("Rezervasyon başarıyla silindi!"));
  };

  const handleEdit = (record) => {
    setEditingReservation(record);
    editForm.setFieldsValue({
      ...record,
      checkin_date: dayjs(record.checkin_date),
      checkout_date: dayjs(record.checkout_date),
      room_number:
        rooms.find((room) => room.id === record.room_id)?.room_number ||
        record.room_number,
    });
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const room = rooms.find(
        (room) => room.room_number === values.room_number
      );
      const checkinDate = dayjs(values.checkin_date);
      const checkoutDate = dayjs(values.checkout_date);
      const totalDays = checkoutDate.diff(checkinDate, "day");
      const totalPrice = room.price * totalDays;

      const formattedValues = {
        ...values,
        checkin_date: checkinDate.format("YYYY-MM-DD"),
        checkout_date: checkoutDate.format("YYYY-MM-DD"),
        total_price: totalPrice,
        room_id: room.id,
      };

      form.resetFields();
      setIsModalOpen(false);

      const result = await dispatch(addReservation(formattedValues)).unwrap();

      if (result.success) {
        dispatch(fetchReservations());
        message.success("Rezervasyon başarıyla eklendi!");
      } else {
        message.error(result.message || "Rezervasyon eklenemedi.");
      }
    } catch (error) {
      console.error("Validate Failed:", error);
      message.error("Rezervasyon eklenemedi.");
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      const room = rooms.find(
        (room) => room.room_number === values.room_number
      );
      const checkinDate = dayjs(values.checkin_date);
      const checkoutDate = dayjs(values.checkout_date);
      const totalDays = checkoutDate.diff(checkinDate, "day");
      const totalPrice = room.price * totalDays;

      const updatedReservation = {
        ...editingReservation,
        ...values,
        checkin_date: checkinDate.format("YYYY-MM-DD"),
        checkout_date: checkoutDate.format("YYYY-MM-DD"),
        total_price: totalPrice,
        room_id: room.id || editingReservation.room_id,
      };

      editForm.resetFields();
      setIsEditModalOpen(false);

      const result = await dispatch(
        updateReservation(updatedReservation)
      ).unwrap();

      if (result.success) {
        dispatch(fetchReservations());
        message.success("Rezervasyon başarıyla güncellendi!");
      } else {
        message.error(result.message || "Rezervasyon güncellenemedi.");
      }
    } catch (error) {
      console.error("Validate Failed:", error);
      message.error("Rezervasyon güncellenemedi.");
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

  const filteredReservations = Array.isArray(reservations)
    ? reservations.filter(
        (item) =>
          item.room_number?.includes(searchText) ||
          item.guest_name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.status?.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const columns = [
    {
      title: "Oda Numarası",
      dataIndex: "room_number",
      key: "room_number",
      render: (text, record) =>
        rooms.find((room) => room.id === record.room_id)?.room_number || text,
    },
    {
      title: "Misafir Adı",
      dataIndex: "guest_name",
      key: "guest_name",
    },
    {
      title: "Giriş Tarihi",
      dataIndex: "checkin_date",
      key: "checkin_date",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Çıkış Tarihi",
      dataIndex: "checkout_date",
      key: "checkout_date",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "total_price",
      key: "total_price",
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
            title="Bu rezervasyonu silmek istediğinize emin misiniz?"
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
        <Typography.Title level={2}>Rezervasyon Sayfası</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Rezervasyon Ekle
        </Button>
      </div>
      <div className="mb-4">
        <Search
          placeholder="Rezervasyon ara"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredReservations}
        rowKey="id"
        bordered
      />
      <Modal
        title="Yeni Rezervasyon Ekle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ekle"
        cancelText="İptal"
      >
        <Form
          form={form}
          layout="vertical"
          name="reservationForm"
          initialValues={{ status: "pending" }}
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
                <Select>
                  {rooms.map((room) => (
                    <Option key={room.id} value={room.room_number}>
                      {room.room_number}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="guest_name"
                label="Misafir Adı"
                rules={[
                  { required: true, message: "Lütfen misafir adını girin!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="checkin_date"
                label="Giriş Tarihi"
                rules={[
                  { required: true, message: "Lütfen giriş tarihini girin!" },
                ]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="checkout_date"
                label="Çıkış Tarihi"
                rules={[
                  { required: true, message: "Lütfen çıkış tarihini girin!" },
                ]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker format="YYYY-MM-DD" />
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
                  <Option value="confirmed">Onaylı</Option>
                  <Option value="pending">Beklemede</Option>
                  <Option value="cancelled">İptal Edilmiş</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="total_price"
                label="Toplam Fiyat"
                rules={[
                  { required: false, message: "Lütfen toplam fiyatı girin!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Rezervasyonu Düzenle"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Kaydet"
        cancelText="İptal"
      >
        <Form
          form={editForm}
          layout="vertical"
          name="editReservationForm"
          initialValues={editingReservation}
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
                <Select>
                  {rooms.map((room) => (
                    <Option key={room.id} value={room.room_number}>
                      {room.room_number}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="guest_name"
                label="Misafir Adı"
                rules={[
                  { required: true, message: "Lütfen misafir adını girin!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="checkin_date"
                label="Giriş Tarihi"
                rules={[
                  { required: true, message: "Lütfen giriş tarihini girin!" },
                ]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="checkout_date"
                label="Çıkış Tarihi"
                rules={[
                  { required: true, message: "Lütfen çıkış tarihini girin!" },
                ]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker format="YYYY-MM-DD" />
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
                  <Option value="confirmed">Onaylı</Option>
                  <Option value="pending">Beklemede</Option>
                  <Option value="cancelled">İptal Edilmiş</Option>
                  <Option value="Other">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="total_price"
                label="Toplam Fiyat"
                rules={[
                  { required: true, message: "Lütfen toplam fiyatı girin!" },
                ]}
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

export default ReservationPage;
