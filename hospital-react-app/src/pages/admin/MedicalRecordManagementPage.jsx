import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message, Card, Row, Col, Descriptions } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const MedicalRecordManagementPage = () => {
  const [records, setRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchRecords();
    fetchAppointments();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/MedicalRecords');
      const data = response.data;
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching medical records:', error);
      message.error('Failed to fetch medical records');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/Appointments');
      const data = response.data;
      // Chỉ lấy các cuộc hẹn đã xác nhận và chưa có bệnh án
      const confirmedAppointments = Array.isArray(data) ? data.filter(appointment => 
        appointment.status === 'Confirmed' && 
        !records.some(record => record.appointmentId === appointment.id)
      ) : [];
      setAppointments(confirmedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      message.error('Failed to fetch appointments');
      setAppointments([]);
    }
  };

  const handleAppointmentChange = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    setSelectedAppointment(appointment);
  };

  const handleCreateRecord = () => {
    setSelectedRecord(null);
    setSelectedAppointment(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    const appointment = appointments.find(a => a.id === record.appointmentId);
    setSelectedAppointment(appointment);
    form.setFieldsValue({
      appointmentId: record.appointmentId,
      diagnosis: record.diagnosis,
      conclusion: record.conclusion
    });
    setModalVisible(true);
  };

  const handleDeleteRecord = async (id) => {
    try {
      await axios.delete(`/api/MedicalRecords/${id}`);
      message.success('Medical record deleted successfully');
      fetchRecords();
      fetchAppointments(); // Refresh appointments to show the deleted record's appointment
    } catch (error) {
      console.error('Error deleting medical record:', error);
      message.error('Failed to delete medical record');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const recordData = {
        ...values,
        id: selectedRecord?.id,
        createdAt: new Date().toISOString()
      };

      if (selectedRecord) {
        await axios.put(`/api/MedicalRecords/${selectedRecord.id}`, recordData);
        message.success('Medical record updated successfully');
      } else {
        await axios.post('/api/MedicalRecords', recordData);
        message.success('Medical record created successfully');
      }

      setModalVisible(false);
      fetchRecords();
      fetchAppointments(); // Refresh appointments to hide the one we just created a record for
    } catch (error) {
      console.error('Error saving medical record:', error);
      message.error('Failed to save medical record');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient',
      dataIndex: 'appointment',
      key: 'patient',
      render: (appointment) => appointment?.patientName || '-',
    },
    {
      title: 'Doctor',
      dataIndex: 'appointment',
      key: 'doctor',
      render: (appointment) => appointment?.doctorName || '-',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointment',
      key: 'appointmentDate',
      render: (appointment) => appointment?.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : '-',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
      ellipsis: true,
    },
    {
      title: 'Conclusion',
      dataIndex: 'conclusion',
      key: 'conclusion',
      ellipsis: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => text ? new Date(text).toLocaleString() : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEditRecord(record)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRecord(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Medical Record Management">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateRecord}
          style={{ marginBottom: 16 }}
        >
          Create New Medical Record
        </Button>

        <Table
          columns={columns}
          dataSource={Array.isArray(records) ? records : []}
          loading={loading}
          rowKey="id"
        />

        <Modal
          title={selectedRecord ? 'Edit Medical Record' : 'Create Medical Record'}
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="appointmentId"
                  label="Appointment"
                  rules={[{ required: true, message: 'Please select an appointment' }]}
                >
                  <Select 
                    placeholder="Select appointment"
                    onChange={handleAppointmentChange}
                  >
                    {Array.isArray(appointments) && appointments.map(appointment => (
                      <Option key={appointment.id} value={appointment.id}>
                        {`${appointment.patientName} - Dr. ${appointment.doctorName} - ${new Date(appointment.appointmentDate).toLocaleDateString()}`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {selectedAppointment && (
              <Descriptions title="Appointment Information" bordered style={{ marginBottom: 16 }}>
                <Descriptions.Item label="Patient Name" span={2}>
                  {selectedAppointment.patientName}
                </Descriptions.Item>
                <Descriptions.Item label="Doctor Name" span={2}>
                  {selectedAppointment.doctorName}
                </Descriptions.Item>
                <Descriptions.Item label="Appointment Date" span={2}>
                  {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                  {selectedAppointment.status}
                </Descriptions.Item>
                {selectedAppointment.note && (
                  <Descriptions.Item label="Note" span={3}>
                    {selectedAppointment.note}
                  </Descriptions.Item>
                )}
              </Descriptions>
            )}

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="diagnosis"
                  label="Diagnosis"
                  rules={[{ required: true, message: 'Please enter diagnosis' }]}
                >
                  <TextArea rows={4} placeholder="Enter detailed diagnosis" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="conclusion"
                  label="Conclusion"
                  rules={[{ required: true, message: 'Please enter conclusion' }]}
                >
                  <TextArea rows={4} placeholder="Enter medical conclusion" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default MedicalRecordManagementPage; 