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
  message,
  DatePicker,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../redux/slices/todoSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-quill/dist/quill.snow.css";

dayjs.extend(customParseFormat);

const { Search } = Input;

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        user_id: user.id,
      };

      const result = await dispatch(createTodo(formattedValues)).unwrap();

      if (result.success) {
        message.success("Görev başarıyla eklendi!");
        setIsModalOpen(false);
        form.resetFields();
        dispatch(fetchTodos());
      } else {
        message.error(result.message || "Görev eklenemedi.");
      }
    } catch (error) {
      console.error("Validate Failed:", error);
      message.error("Görev eklenemedi.");
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      const updatedTodo = {
        ...editingTodo,
        ...values,
        dueDate: values.dueDate.format("YYYY-MM-DD"),
      };

      const result = await dispatch(updateTodo(updatedTodo)).unwrap();

      if (result.success) {
        message.success("Görev başarıyla güncellendi!");
        setIsEditModalOpen(false);
        editForm.resetFields();
        dispatch(fetchTodos());
      } else {
        message.error(result.message || "Görev güncellenemedi.");
      }
    } catch (error) {
      console.error("Validate Failed:", error);
      message.error("Görev güncellenemedi.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    editForm.resetFields();
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    editForm.setFieldsValue({
      title: todo.title,
      description: todo.description,
      dueDate: dayjs(todo.dueDate),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTodo(id)).unwrap();
      message.success("Görev başarıyla silindi");
      dispatch(fetchTodos());
    } catch (error) {
      message.error("Görev silinemedi");
    }
  };

  const columns = [
    {
      title: "Görev Başlığı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      ),
    },
    {
      title: "Son Tarih",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button
              type="danger"
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
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Görev Ekle
        </Button>
      </div>
      <Table columns={columns} dataSource={todos} rowKey="id" bordered />
      <Modal
        title="Yeni Görev Ekle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ekle"
        cancelText="İptal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Görev Başlığı"
            rules={[{ required: true, message: "Görev başlığını giriniz" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Açıklama"
            rules={[{ required: true, message: "Açıklama giriniz" }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Son Tarih"
            rules={[{ required: true, message: "Son tarihi seçiniz" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Görev Düzenle"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Kaydet"
        cancelText="İptal"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="title"
            label="Görev Başlığı"
            rules={[{ required: true, message: "Görev başlığını giriniz" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Açıklama"
            rules={[{ required: true, message: "Açıklama giriniz" }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Son Tarih"
            rules={[{ required: true, message: "Son tarihi seçiniz" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
      {loading && <p>Yükleniyor...</p>}
      {error && <p>Hata: {error}</p>}
    </div>
  );
};

export default TodoList;
