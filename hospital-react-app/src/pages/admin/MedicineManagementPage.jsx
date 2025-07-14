import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Container
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'http://localhost:5247/api/Medicines';
const SUPPLIER_API = 'http://localhost:5247/api/MedicineSupplier';

const MedicineManagementPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '',
    expiryDate: '',
    supplierId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(API_URL).then(res => setMedicines(res.data));
    axios.get(SUPPLIER_API).then(res => setSuppliers(res.data));
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        code: item.code,
        name: item.name,
        type: item.type,
        expiryDate: item.expiryDate?.substring(0, 10) || '',
        supplierId: item.supplierId || ''
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', name: '', type: '', expiryDate: '', supplierId: '' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const method = editingId ? 'put' : 'post';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    axios[method](url, formData).then(() => {
      setShowModal(false);
      fetchData();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      axios.delete(`${API_URL}/${id}`).then(fetchData);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Quản lý thuốc</h3>
      <Button className="mb-3" onClick={() => openModal()}><FaPlus /> Thêm thuốc</Button>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã thuốc</th>
            <th>Tên thuốc</th>
            <th>Loại</th>
            <th>Nhà cung cấp</th>
            <th>Còn hạn?</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{m.code}</td>
              <td>{m.name}</td>
              <td>{m.type}</td>
              <td>{m.supplierName}</td>
              <td>
                <span className={`badge ${m.isExpired ? 'bg-danger' : 'bg-success'}`}>
                  {m.isExpired ? 'Hết hạn' : 'Còn hạn'}
                </span>
              </td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openModal(m)}><FaEdit /></Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(m.id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Cập nhật thuốc' : 'Thêm thuốc mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mã thuốc</Form.Label>
              <Form.Control value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên thuốc</Form.Label>
              <Form.Control value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại</Form.Label>
              <Form.Control value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày hết hạn</Form.Label>
              <Form.Control type="date" value={formData.expiryDate} onChange={e => setFormData({ ...formData, expiryDate: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nhà cung cấp</Form.Label>
              <Form.Select value={formData.supplierId} onChange={e => setFormData({ ...formData, supplierId: parseInt(e.target.value) })}>
                <option value="">-- Chọn nhà cung cấp --</option>
                {suppliers.map(s => (
                  <option key={s.supplierId} value={s.supplierId}>{s.supplierName}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant={editingId ? 'warning' : 'primary'} onClick={handleSave}>
            {editingId ? 'Cập nhật' : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MedicineManagementPage;
