import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/slices/userSlice";
import { Card, Button, Spin, Empty, Typography, Modal, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserCard from "../components/Home/UserCard";

const { Title } = Typography;
const { confirm } = Modal;
const { Meta } = Card;

const UserManagement = ({ compact }) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const showDeleteConfirm = (userId) => {
    confirm({
      title: "Kullanıcıyı silmek istediğinizden emin misiniz?",
      content: "Bu işlem geri alınamaz.",
      okText: "Evet",
      okType: "danger",
      cancelText: "Hayır",
      onOk() {
        dispatch(deleteUser(userId)).then(() => {
          dispatch(fetchUsers());
        });
      },
      onCancel() {
        console.log("Silme işlemi iptal edildi.");
      },
    });
  };

  if (loading) return <Spin />;
  if (error) return null;

  const displayedUsers = compact ? users.slice(0, 3) : users;

  return (
    <div className={`container mx-auto ${compact ? "p-2" : "p-4"}`}>
      {!compact && (
        <Title level={2} style={{ marginBottom: "28px" }}>
          Kullanıcılar
        </Title>
      )}
      {users.length === 0 ? (
        <Empty description="Henüz kullanıcı yok." />
      ) : (
        <div
          className={`grid ${
            compact
              ? "grid-cols-1 gap-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          }`}
        >
          {displayedUsers.map((user) => (
            <Card
              key={user.id}
              hoverable
              style={{
                width: compact ? 200 : 300,
                borderRadius: "8px",
                overflow: "hidden",
              }}
              cover={
                <img
                  alt="user"
                  src={
                    user.profile_picture
                      ? `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/uploads/${user.profile_picture}`
                      : `https://ui-avatars.com/api/?name=${user.username}&background=random`
                  }
                  style={{
                    height: compact ? "100px" : "200px",
                    objectFit: "cover",
                  }}
                />
              }
              actions={
                !compact && [
                  <Button
                    type="primary"
                    danger
                    onClick={() => showDeleteConfirm(user.id)}
                  >
                    Sil
                  </Button>,
                ]
              }
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      user.profile_picture
                        ? `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/uploads/${user.profile_picture}`
                        : `https://ui-avatars.com/api/?name=${user.username}&background=random`
                    }
                    icon={!user.profile_picture && <UserOutlined />}
                    size={compact ? "default" : "large"}
                  />
                }
                title={
                  <Typography.Title
                    level={compact ? 5 : 4}
                    style={{ margin: 0 }}
                  >
                    {user.username}
                  </Typography.Title>
                }
                description={
                  <Typography.Text type="secondary">
                    {user.email}
                  </Typography.Text>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
