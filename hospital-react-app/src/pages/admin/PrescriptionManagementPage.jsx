import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Space, message, Card, Row, Col, Descriptions } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

const { Option } = Select;

const PrescriptionManagementPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [form] = Form.useForm();
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
    fetchMedicines();
    fetchMedicalRecords();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/Prescriptions`);
      const data = response.data;
      setPrescriptions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      message.error('Failed to fetch prescriptions');
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Medicines`);
      const data = response.data;
      setMedicines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      message.error('Failed to fetch medicines');
      setMedicines([]);
    }
  };

  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/MedicalRecords`);
      const data = response.data;
      setMedicalRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching medical records:', error);
      message.error('Failed to fetch medical records');
      setMedicalRecords([]);
    }
  };

  const handleMedicalRecordChange = async (recordId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/MedicalRecords/${recordId}`);
      const record = response.data;
      if (record && record.appointment) {
        setSelectedMedicalRecord({
          id: record.id,
          diagnosis: record.diagnosis,
          patientName: record.appointment.patientName,
          doctorName: record.appointment.doctorName,
          appointmentDate: new Date(record.appointment.appointmentDate).toLocaleDateString(),
          patientId: record.appointment.patientId,
          doctorId: record.appointment.doctorId
        });
      }
    } catch (error) {
      console.error('Error fetching medical record details:', error);
      message.error('Failed to fetch medical record details');
    }
  };

  const handleCreatePrescription = () => {
    setSelectedPrescription(null);
    setSelectedMedicalRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditPrescription = (record) => {
    setSelectedPrescription(record);
    handleMedicalRecordChange(record.medicalRecordId);
    form.setFieldsValue({
      medicalRecordId: record.medicalRecordId,
      prescribedBy: record.prescribedBy,
      details: prescriptionDetails
    });
    setModalVisible(true);
  };

  const handleDeletePrescription = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/Prescriptions/${id}`);
      message.success('Prescription deleted successfully');
      fetchPrescriptions();
    } catch (error) {
      console.error('Error deleting prescription:', error);
      message.error('Failed to delete prescription');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const prescriptionData = {
        ...values,
        id: selectedPrescription?.id
      };

      if (selectedPrescription) {
        await axios.put(`${API_BASE_URL}/Prescriptions/${selectedPrescription.id}`, prescriptionData);
        message.success('Prescription updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/Prescriptions`, prescriptionData);
        message.success('Prescription created successfully');
      }

      setModalVisible(false);
      fetchPrescriptions();
    } catch (error) {
      console.error('Error saving prescription:', error);
      message.error('Failed to save prescription');
    }
  };

  const handleCreateInvoice = async (prescriptionId) => {
    try {
      // Get prescription details
      const prescriptionResponse = await axios.get(`${API_BASE_URL}/Prescriptions/${prescriptionId}`);
      const prescription = prescriptionResponse.data;

      if (!prescription) {
        throw new Error('Prescription not found');
      }

      // Create invoice data
      const invoiceData = {
        appointmentId: prescription.medicalRecord?.appointmentId,
        patientId: prescription.medicalRecord?.appointment?.patientId,
        totalAmount: calculateTotalAmount(prescriptionDetails),
        status: 'Unpaid',
        invoiceDetails: prescriptionDetails.map(detail => ({
          itemType: 'Medicine',
          itemId: detail.medicineId,
          quantity: detail.quantity,
          unitPrice: medicines.find(m => m.id === detail.medicineId)?.price || 0,
          description: detail.instructions
        }))
      };

      // Create invoice
      await axios.post(`${API_BASE_URL}/Invoices`, invoiceData);
      message.success('Invoice created successfully');
      setInvoiceModalVisible(false);
    } catch (error) {
      console.error('Error creating invoice:', error);
      message.error('Failed to create invoice: ' + (error.message || 'Unknown error'));
    }
  };

  const calculateTotalAmount = (details) => {
    if (!Array.isArray(details)) return 0;
    return details.reduce((total, detail) => {
      const medicine = medicines.find(m => m.id === detail.medicineId);
      return total + (medicine?.price || 0) * (detail.quantity || 0);
    }, 0);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Medical Record ID',
      dataIndex: 'medicalRecordId',
      key: 'medicalRecordId',
    },
    {
      title: 'Patient',
      dataIndex: 'medicalRecord',
      key: 'patient',
      render: (record) => record?.appointment?.patientName || '-',
    },
    {
      title: 'Doctor',
      dataIndex: 'medicalRecord',
      key: 'doctor',
      render: (record) => record?.appointment?.doctorName || '-',
    },
    {
      title: 'Prescribed By',
      dataIndex: 'prescribedBy',
      key: 'prescribedBy',
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
            onClick={() => handleEditPrescription(record)}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            onClick={() => handleCreateInvoice(record.id)}
          >
            Create Invoice
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePrescription(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Prescription Management">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreatePrescription}
          style={{ marginBottom: 16 }}
        >
          Create New Prescription
        </Button>

        <Table
          columns={columns}
          dataSource={Array.isArray(prescriptions) ? prescriptions : []}
          loading={loading}
          rowKey="id"
        />

        <Modal
          title={selectedPrescription ? 'Edit Prescription' : 'Create Prescription'}
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
                  name="medicalRecordId"
                  label="Medical Record"
                  rules={[{ required: true, message: 'Please select a medical record' }]}
                >
                  <Select 
                    placeholder="Select medical record"
                    onChange={handleMedicalRecordChange}
                  >
                    {Array.isArray(medicalRecords) && medicalRecords.map(record => (
                      <Option key={record.id} value={record.id}>
                        {`Record #${record.id} - ${record.diagnosis || 'No diagnosis'}`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {selectedMedicalRecord && (
              <Descriptions title="Patient & Doctor Information" bordered style={{ marginBottom: 16 }}>
                <Descriptions.Item label="Patient Name" span={2}>
                  {selectedMedicalRecord.patientName}
                </Descriptions.Item>
                <Descriptions.Item label="Doctor Name" span={2}>
                  {selectedMedicalRecord.doctorName}
                </Descriptions.Item>
                <Descriptions.Item label="Appointment Date" span={2}>
                  {selectedMedicalRecord.appointmentDate}
                </Descriptions.Item>
                <Descriptions.Item label="Diagnosis" span={3}>
                  {selectedMedicalRecord.diagnosis}
                </Descriptions.Item>
              </Descriptions>
            )}

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="prescribedBy"
                  label="Prescribed By"
                  rules={[{ required: true, message: 'Please enter prescriber name' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.List name="details">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key}>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'medicineId']}
                          label="Medicine"
                          rules={[{ required: true, message: 'Please select medicine' }]}
                        >
                          <Select placeholder="Select medicine">
                            {Array.isArray(medicines) && medicines.map(medicine => (
                              <Option key={medicine.id} value={medicine.id}>
                                {medicine.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'quantity']}
                          label="Quantity"
                          rules={[{ required: true, message: 'Please enter quantity' }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'dosage']}
                          label="Dosage"
                          rules={[{ required: true, message: 'Please enter dosage' }]}
                        >
                          <Input placeholder="e.g., 1 pill 3 times a day" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'instructions']}
                          label="Instructions"
                        >
                          <Input placeholder="Special instructions" />
                        </Form.Item>
                      </Col>
                      <Button type="link" danger onClick={() => remove(name)}>
                        Delete
                      </Button>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Medicine
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default PrescriptionManagementPage; 