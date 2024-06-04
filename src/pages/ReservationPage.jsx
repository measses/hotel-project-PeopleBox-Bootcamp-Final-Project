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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  addReservation,
  updateReservation,
  deleteReservation,
} from "../redux/slices/reservationSlice";
import moment from "moment";

const { Search } = Input;
const { Option } = Select;

const ReservationPage = () => {
  const dispatch = useDispatch();
  const { reservations, status } = useSelector((state) => state.reservations);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteReservation(id)).then(() => dispatch(fetchReservations()));
  };
  const handleEdit = (record) => {
    setEditingReservation(record);
    editForm.setFieldsValue({
      ...record,
      checkin_date: moment(record.checkin_date).format("YYYY-MM-DD"),
      checkout_date: moment(record.checkout_date).format("YYYY-MM-DD"),
    });
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

      const checkinDate = moment(values.checkin_date);
      const checkoutDate = moment(values.checkout_date);

      const formattedValues = {
        ...values,
        checkin_date: checkinDate.format("YYYY-MM-DD"),
        checkout_date: checkoutDate.format("YYYY-MM-DD"),
      };
      dispatch(addReservation(formattedValues)).then(() =>
        dispatch(fetchReservations())
      );
    } catch (error) {
      console.error("Validate Failed:", error);
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      editForm.resetFields();
      setIsEditModalOpen(false);

      const checkinDate = moment(values.checkin_date);
      const checkoutDate = moment(values.checkout_date);

      const updatedReservation = {
        ...editingReservation,
        ...values,
        checkin_date: checkinDate.format("YYYY-MM-DD"),
        checkout_date: checkoutDate.format("YYYY-MM-DD"),
      };

      dispatch(updateReservation(updatedReservation)).then(() =>
        dispatch(fetchReservations())
      );
    } catch (error) {
      console.error("Validate Failed:", error);
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
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Çıkış Tarihi",
      dataIndex: "checkout_date",
      key: "checkout_date",
      render: (text) => moment(text).format("YYYY-MM-DD"),
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
                <Input />
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
                  {
                    pattern: /^\d{4}-\d{2}-\d{2}$/,
                    message: "Geçerli bir tarih girin (YYYY-MM-DD)",
                  },
                ]}
              >
                {/* DatePicker yerine Input kullan */}
                <Input placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="checkout_date"
                label="Çıkış Tarihi"
                rules={[
                  { required: true, message: "Lütfen çıkış tarihini girin!" },
                  {
                    pattern: /^\d{4}-\d{2}-\d{2}$/,
                    message: "Geçerli bir tarih girin (YYYY-MM-DD)",
                  },
                ]}
              >
                {/* DatePicker yerine Input kullan */}
                <Input placeholder="YYYY-MM-DD" />
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
                <Input />
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
                  {
                    message: "Geçerli bir tarih girin (YYYY-MM-DD)",
                  },
                ]}
              >
                <Input placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="checkout_date"
                label="Çıkış Tarihi"
                rules={[
                  { required: true, message: "Lütfen çıkış tarihini girin!" },
                  {
                    pattern: /^\d{4}-\d{2}-\d{2}$/,
                    message: "Geçerli bir tarih girin (YYYY-MM-DD)",
                  },
                ]}
              >
                <Input placeholder="YYYY-MM-DD" />
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
