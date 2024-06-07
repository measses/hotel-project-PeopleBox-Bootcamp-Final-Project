import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import { Spin, Alert } from "antd";
import UserCard from "../components/Home/UserCard";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" />;

  // İlk 3 kullanıcıyı almak için dilimleme işlemi
  const displayedUsers = users.slice(0, 3);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Kullanıcılar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
