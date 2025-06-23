import React, { useState } from 'react';
import { Table, Button, Modal, Form, Pagination, Image } from 'react-bootstrap';
import Avatar from '../../components/common/Avatar';

const UserManagementPage = () => {
  // Sample data - in a real app, this would come from an API
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Bác sĩ', avatar: 'https://broken.link/a.jpg' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'Bệnh nhân', avatar: null },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'Lễ tân', avatar: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'Bệnh nhân', avatar: null },
    { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com', role: 'Bác sĩ', avatar: null },
    { id: 6, name: 'Vũ Thị F', email: 'vuthif@example.com', role: 'Y tá', avatar: 'https://another.broken.link/f.png' },
    { id: 7, name: 'Đặng Văn G', email: 'dangvang@example.com', role: 'Bệnh nhân', avatar: null },
    { id: 8, name: 'Bùi Thị H', email: 'buithih@example.com', role: 'Bác sĩ', avatar: null },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', or 'delete'
  const [currentUser, setCurrentUser] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Modal handlers
  const handleShowModal = (type, user = null) => {
    setModalType(type);
    setCurrentUser(user);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  // CRUD operations
  const handleAddUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
    handleCloseModal();
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    handleCloseModal();
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(u => u.id !== currentUser.id));
    handleCloseModal();
  };
  
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="admin-header d-flex justify-content-between align-items-center">
        <h1>Quản lý Người dùng</h1>
        <Button variant="primary" onClick={() => handleShowModal('add')}>
          Thêm người dùng
        </Button>
      </div>
      <div className="admin-card">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Avatar</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                  <Avatar src={user.avatar} name={user.name} />
                </td>
                <td style={{ verticalAlign: 'middle' }}>{user.name}</td>
                <td style={{ verticalAlign: 'middle' }}>{user.email}</td>
                <td style={{ verticalAlign: 'middle' }}>{user.role}</td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowModal('edit', user)}>Sửa</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleShowModal('delete', user)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {totalPages > 1 && (
            <Pagination className="justify-content-center">
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )}

      </div>

      {/* Add/Edit Modal */}
      <UserFormModal show={showModal && (modalType === 'add' || modalType === 'edit')} type={modalType} user={currentUser} onClose={handleCloseModal} onSave={modalType === 'add' ? handleAddUser : handleEditUser} />

      {/* Delete Confirmation Modal */}
      <Modal show={showModal && modalType === 'delete'} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa người dùng <strong>{currentUser?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Hủy</Button>
          <Button variant="danger" onClick={handleDeleteUser}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const UserFormModal = ({ show, type, user, onClose, onSave }) => {
    const [formData, setFormData] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(null);

    React.useEffect(() => {
        const initialData = { id: user?.id || null, name: user?.name || '', email: user?.email || '', role: user?.role || 'Bệnh nhân', avatar: user?.avatar || null };
        setFormData(initialData);
        setAvatarPreview(initialData.avatar);
    }, [user, show]);

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatarPreview(newAvatarUrl);
            setFormData({ ...formData, avatar: newAvatarUrl });
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton><Modal.Title>{type === 'add' ? 'Thêm người dùng mới' : 'Cập nhật thông tin'}</Modal.Title></Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3 text-center">
                        <Avatar src={avatarPreview} name={formData.name} size={120} />
                        <Form.Control type="file" name="avatar" onChange={handleAvatarChange} className="mt-3" accept="image/*" />
                    </Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Tên</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Vai trò</Form.Label><Form.Select name="role" value={formData.role} onChange={handleChange}><option>Bệnh nhân</option><option>Bác sĩ</option><option>Y tá</option><option>Lễ tân</option></Form.Select></Form.Group>
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={onClose}>Đóng</Button><Button variant="primary" type="submit">Lưu thay đổi</Button></Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UserManagementPage;
