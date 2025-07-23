import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Card, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

const SupplierManagementPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/MedicineSupplier`);
      const data = response.data;
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      message.error('Failed to fetch suppliers');
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSupplier = () => {
    setSelectedSupplier(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    form.setFieldsValue({
      supplierName: supplier.supplierName,
      phone: supplier.phone,
      address: supplier.address
    });
    setModalVisible(true);
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/MedicineSupplier/${id}`);
      message.success('Supplier deleted successfully');
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
      message.error('Failed to delete supplier');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (selectedSupplier) {
        await axios.put(`${API_BASE_URL}/MedicineSupplier/${selectedSupplier.supplierId}`, values);
        message.success('Supplier updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/MedicineSupplier`, values);
        message.success('Supplier created successfully');
      }

      setModalVisible(false);
      fetchSuppliers();
    } catch (error) {
      if (error.isAxiosError) {
        console.error('Error saving supplier:', error);
        message.error('Failed to save supplier: ' + (error.response?.data?.message || error.message));
      }
      // Don't close modal if it's a validation error
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'supplierId',
      key: 'supplierId',
    },
    {
      title: 'Name',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEditSupplier(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Supplier"
            description="Are you sure you want to delete this supplier? This action cannot be undone."
            onConfirm={() => handleDeleteSupplier(record.supplierId)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Supplier Management">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateSupplier}
          style={{ marginBottom: 16 }}
        >
          Create New Supplier
        </Button>

        <Table
          columns={columns}
          dataSource={Array.isArray(suppliers) ? suppliers : []}
          loading={loading}
          rowKey="supplierId"
        />

        <Modal
          title={selectedSupplier ? 'Edit Supplier' : 'Create Supplier'}
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            validateMessages={{
              required: '${label} is required',
              types: {
                email: '${label} is not a valid email',
                number: '${label} is not a valid number',
              },
              pattern: {
                mismatch: '${label} is not in the correct format',
              },
            }}
          >
            <Form.Item
              name="supplierName"
              label="Supplier Name"
              rules={[
                { required: true },
                { min: 3, message: 'Supplier name must be at least 3 characters' },
                { max: 100, message: 'Supplier name cannot exceed 100 characters' }
              ]}
            >
              <Input placeholder="Enter supplier name" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true },
                { pattern: /^[0-9]{10,11}$/, message: 'Phone number must be 10-11 digits' }
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true },
                { min: 10, message: 'Address must be at least 10 characters' },
                { max: 200, message: 'Address cannot exceed 200 characters' }
              ]}
            >
              <Input.TextArea rows={3} placeholder="Enter address" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default SupplierManagementPage; 