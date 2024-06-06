import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import { Table, Spin, Alert, Avatar } from "antd";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" />;

  const columns = [
    {
      title: "Fotoğraf",
      dataIndex: "profile_picture",
      key: "profile_picture",
      render: (text, record) => (
        <Avatar
          src={
            record.profile_picture
              ? `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/uploads/${record.profile_picture}`
              : `https://ui-avatars.com/api/?name=${record.username}&background=random`
          }
        />
      ),
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Kullanıcı Tipi",
      dataIndex: "user_type",
      key: "user_type",
      render: (text) => (text === "admin" ? "Admin" : "User"),
    },
  ];

  const dataSource = users.map((user) => ({
    key: user.id,
    ...user,
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Kullanıcılar</h1>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default Users;
