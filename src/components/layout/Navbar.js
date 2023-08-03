import { React, useState, useEffect } from 'react'
import { Layout, theme, Avatar, Row, Col } from 'antd';
import { FaSignOutAlt, FaCaretDown, FaUserCog } from "react-icons/fa"
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountModal from '../resources/modal_fields/AccountModal';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import NotifSwalAlert from '../resources/swal/NotifSwalAler';
import Swal from 'sweetalert2';
import Password from 'antd/es/input/Password';


const Toast = NotifSwalAlert();

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { token: { colorBgContainer } } = theme.useToken();
  const [modalTitle, setModalTitle] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [usersName, setUsersName] = useState("");


  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
   //confirmPassword: "",
  });

  const apiLink = "http://localhost:8000/api/logout";
  const apiUserLink = 'http://localhost:8000/api/user';
  const name = localStorage.getItem('name');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchUser = async (id) => {
    axios
      .get(apiUserLink + "/" + id)
      .then(function (response) {
        setUsers(response.data);
        setUsersName(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const updateUser = async (id) => {
    axios
      .get(apiUserLink + "/" + id)
      .then(function (response) {
        setUserFormData({
          ...userFormData,
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
        })
        console.log(response)
        setModalTitle("Update your Account");
        setIsModalOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const onSubmit = () => {
    const payload = {
      ...userFormData,
      user_id: localStorage.getItem('user_id'),
    };

    axios.post(apiUserLink, payload)
      .then(function (response) {
        console.log(response);
        Toast.fire({
          icon: 'success',
          title: response.data.status,
          text: response.data.message,
        });
        setIsModalOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response && error.response.status === 422) {
          Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            text: 'Make sure everything is filled up!',
          });
        }
      });
  };

  useEffect(() => {
    fetchUser(localStorage.getItem('user_id'));
  }, [usersName])

  const handleLogout = async () => {
    try {
      await axios.post(apiLink);
      localStorage.removeItem('token');
      console.log("Logout is clicked")
      navigate('/login');

    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const items = [
    {
      key: '1',
      success: true,
      icon: <FaUserCog />,
      label: 'Account Settings',
      onClick: () => updateUser(localStorage.getItem('user_id')),
    },

    {
      key: '2',
      danger: true,
      icon: <FaSignOutAlt />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Header style={{ background: "#50424F", color: 'white' }}>
      <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Dropdown menu={{ items }} >
          <a style={{ color: 'white' }} onClick={(e) => e.preventDefault()}>
            <Space className="navbar-settings">
              {usersName /* {localStorage.getItem('name')} */}
              <FaCaretDown />
            </Space>
          </a>
        </Dropdown>
      </Row>
      <ModalComponents
        modalContent={
          <AccountModal
            userFormData={userFormData}
            setUserFormData={setUserFormData}
            modalTitle={modalTitle}
          />
        }
        isShownModal={isModalOpen}
        handleOk={onSubmit}
        handleCancel={handleCancel}
        okText={"Submit"}
      />
    </Header>
  )
}

export default Navbar