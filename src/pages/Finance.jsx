import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Row,
  Col,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../redux/slices/expenseSlice";
import {
  fetchRevenue,
  addRevenue,
  updateRevenue,
  deleteRevenue,
} from "../redux/slices/revenueSlice";

import dayjs from "dayjs";
import "antd/dist/reset.css";

const { Option } = Select;

const IncomeTable = ({ incomeData, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Gelir Türü",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Tarih",
      dataIndex: "revenue_date",
      key: "revenue_date",
      sorter: (a, b) => dayjs(a.revenue_date) - dayjs(b.revenue_date),
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Miktar",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Bu geliri silmek istediğinize emin misiniz?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={incomeData} rowKey="id" />;
};

const ExpensesTable = ({ expensesData, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Gider Türü",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Tarih",
      dataIndex: "expense_date",
      key: "expense_date",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Miktar",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Bu gideri silmek istediğinize emin misiniz?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={expensesData} rowKey="id" />;
};

const FinancePage = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const { revenue } = useSelector((state) => state.revenue);
  const [activeTable, setActiveTable] = useState("income");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchRevenue());
  }, [dispatch]);

  const handleTableChange = (table) => {
    setActiveTable(table);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      setIsModalOpen(false);

      if (activeTable === "income") {
        dispatch(addRevenue(values))
          .then(() => dispatch(fetchRevenue()))
          .then(() => message.success("Gelir başarıyla eklendi!"));
      } else if (activeTable === "expenses") {
        dispatch(addExpense(values))
          .then(() => dispatch(fetchExpenses()))
          .then(() => message.success("Gider başarıyla eklendi!"));
      }
    } catch (error) {
      console.error("Validate Failed:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    editForm.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setIsEditModalOpen(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      editForm.resetFields();
      setIsEditModalOpen(false);

      const updatedValues = {
        ...values,
        id: editingItem.id,
      };

      if (activeTable === "income") {
        dispatch(updateRevenue(updatedValues))
          .then(() => dispatch(fetchRevenue()))
          .then(() => message.success("Gelir başarıyla güncellendi!"));
      } else if (activeTable === "expenses") {
        dispatch(updateExpense(updatedValues))
          .then(() => dispatch(fetchExpenses()))
          .then(() => message.success("Gider başarıyla güncellendi!"));
      }
    } catch (error) {
      console.error("Validate Failed:", error);
    }
  };

  const handleDelete = (id) => {
    if (activeTable === "income") {
      dispatch(deleteRevenue(id))
        .then(() => dispatch(fetchRevenue()))
        .then(() => message.success("Gelir başarıyla silindi!"));
    } else if (activeTable === "expenses") {
      dispatch(deleteExpense(id))
        .then(() => dispatch(fetchExpenses()))
        .then(() => message.success("Gider başarıyla silindi!"));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Typography.Title level={2} className="text-center">
        Finans Yönetimi
      </Typography.Title>

      <div className="flex justify-between items-center mb-4">
        <Button.Group>
          <Button
            type={activeTable === "income" ? "primary" : "default"}
            onClick={() => handleTableChange("income")}
          >
            Gelir
          </Button>
          <Button
            type={activeTable === "expenses" ? "primary" : "default"}
            onClick={() => handleTableChange("expenses")}
          >
            Gider
          </Button>
        </Button.Group>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {activeTable === "income" ? "Gelir Ekle" : "Gider Ekle"}
        </Button>
      </div>

      <div className="overflow-x-auto">
        {activeTable === "income" && (
          <IncomeTable
            incomeData={revenue}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {activeTable === "expenses" && (
          <ExpensesTable
            expensesData={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <Modal
        title={activeTable === "income" ? "Yeni Gelir Ekle" : "Yeni Gider Ekle"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ekle"
        cancelText="İptal"
      >
        <Form form={form} layout="vertical" name="itemForm">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="description"
                label="Açıklama"
                rules={[
                  { required: true, message: "Lütfen açıklamayı girin!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="amount"
                label="Miktar"
                rules={[{ required: true, message: "Lütfen miktarı girin!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="date"
                label="Tarih"
                rules={[{ required: true, message: "Lütfen tarihi girin!" }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="Kategori"
                rules={[
                  { required: true, message: "Lütfen kategoriyi seçin!" },
                ]}
              >
                <Select>
                  {activeTable === "income" ? (
                    <>
                      <Option value="Kiralama">Oda Kiralama</Option>
                      <Option value="Servis">Hizmetler</Option>
                      <Option value="Diğer">Diğer</Option>
                    </>
                  ) : (
                    <>
                      <Option value="Maaş">Maaş</Option>
                      <Option value="Bakım">Bakım</Option>
                      <Option value="Fatura">Faturalar</Option>
                      <Option value="Malzeme">Malzemeler</Option>
                      <Option value="Diğer">Diğer</Option>
                    </>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title={activeTable === "income" ? "Geliri Düzenle" : "Gideri Düzenle"}
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Kaydet"
        cancelText="İptal"
      >
        <Form
          form={editForm}
          layout="vertical"
          name="editItemForm"
          initialValues={editingItem}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="description"
                label="Açıklama"
                rules={[
                  { required: true, message: "Lütfen açıklamayı girin!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="amount"
                label="Miktar"
                rules={[{ required: true, message: "Lütfen miktarı girin!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="date"
                label="Tarih"
                rules={[{ required: true, message: "Lütfen tarihi girin!" }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="Kategori"
                rules={[
                  { required: true, message: "Lütfen kategoriyi seçin!" },
                ]}
              >
                <Select>
                  {activeTable === "income" ? (
                    <>
                      <Option value="Oda Kiralama">Oda Kiralama</Option>
                      <Option value="Servis">Hizmetler</Option>
                      <Option value="Diğer">Diğer</Option>
                    </>
                  ) : (
                    <>
                      <Option value="Maaş">Maaş</Option>
                      <Option value="Bakım">Bakım</Option>
                      <Option value="Fatura">Faturalar</Option>
                      <Option value="Malzeme">Malzemeler</Option>
                      <Option value="Diğer">Diğer</Option>
                    </>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default FinancePage;
