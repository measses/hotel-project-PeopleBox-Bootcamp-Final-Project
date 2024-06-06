import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Upload, message, Avatar } from "antd";
import { updateProfile } from "../redux/slices/authSlice";
import { fetchUsers } from "../redux/slices/userSlice";
import { UploadOutlined } from "@ant-design/icons";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
      });
      if (user.profile_picture) {
        setFileList([
          {
            uid: "-1",
            name: "profile_picture.jpg",
            status: "done",
            url: `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/uploads/${user.profile_picture}`,
          },
        ]);
      }
    }
  }, [user, form]);

  const handleUpdateProfile = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("profile_picture", fileList[0].originFileObj);
    }

    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
      if (result.success) {
        message.success("Profile updated successfully");
        // Kullanıcı güncellemelerinden sonra kullanıcıları yeniden fetch et
        dispatch(fetchUsers());
        // auth slice'daki kullanıcı verilerini de güncelle
        dispatch({
          type: "auth/updateProfile/fulfilled",
          payload: { user: result.user },
        });
      } else {
        message.error(result.message);
      }
    } catch (err) {
      message.error("Profile update failed");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <div
      className="container"
      style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "50px" }}
    >
      <Form form={form} onFinish={handleUpdateProfile} layout="vertical">
        <Form.Item style={{ textAlign: "center" }}>
          <Avatar
            size={100}
            src={
              user.profile_picture
                ? `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/uploads/${user.profile_picture}`
                : `https://ui-avatars.com/api/?name=${user.username}&background=random`
            }
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Profile Picture"
          name="profile_picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="profile_picture"
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
