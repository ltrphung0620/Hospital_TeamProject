import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message, Card } from 'antd';
import { SearchOutlined, DollarOutlined, PrinterOutlined } from '@ant-design/icons';
import PaymentModal from '../../components/common/PaymentModal';
import InvoiceModal from '../../components/common/InvoiceModal';

const LabTestPaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Mock data - thay thế bằng API call thực tế
    useEffect(() => {
        setData([
            {
                id: 1,
                testRequestId: 'TR001',
                patientId: 'PT001',
                patientName: 'Nguyễn Văn A',
                doctorName: 'Dr. Trần B',
                department: 'Khoa Xét nghiệm',
                date: '2024-03-20',
                totalAmount: 2500000,
                status: 'unpaid',
                items: [
                    { id: 1, name: 'Xét nghiệm máu', quantity: 1, unitPrice: 1500000 },
                    { id: 2, name: 'Xét nghiệm nước tiểu', quantity: 1, unitPrice: 1000000 }
                ]
            },
            // Thêm dữ liệu mẫu khác...
        ]);
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
        // Implement search logic
    };

    const handlePayment = async (values) => {
        setLoading(true);
        try {
            // Gọi API thanh toán
            await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
            message.success('Thanh toán thành công!');
            setPaymentModalVisible(false);
            setInvoiceModalVisible(true);
        } catch (error) {
            message.error('Thanh toán thất bại!');
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const columns = [
        {
            title: 'Mã yêu cầu xét nghiệm',
            dataIndex: 'testRequestId',
            key: 'testRequestId',
        },
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.patientName)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                    String(record.testRequestId)
                        .toLowerCase()
                        .includes(value.toLowerCase());
            },
        },
        {
            title: 'Bác sĩ yêu cầu',
            dataIndex: 'doctorName',
            key: 'doctorName',
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount) => `${amount?.toLocaleString('vi-VN')} VNĐ`,
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<DollarOutlined />}
                        onClick={() => {
                            setSelectedRecord(record);
                            setPaymentModalVisible(true);
                        }}
                        disabled={record.status === 'paid'}
                    >
                        Thanh toán
                    </Button>
                    <Button
                        icon={<PrinterOutlined />}
                        onClick={() => {
                            setSelectedRecord(record);
                            setInvoiceModalVisible(true);
                        }}
                    >
                        Xem hóa đơn
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card title="Quản lý thanh toán xét nghiệm">
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã xét nghiệm"
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 300 }}
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                />

                <PaymentModal
                    visible={paymentModalVisible}
                    onCancel={() => setPaymentModalVisible(false)}
                    onOk={handlePayment}
                    title="Thanh toán xét nghiệm"
                    totalAmount={selectedRecord?.totalAmount}
                    paymentData={{
                        patientName: selectedRecord?.patientName,
                        patientId: selectedRecord?.patientId
                    }}
                    loading={loading}
                />

                <InvoiceModal
                    visible={invoiceModalVisible}
                    onCancel={() => setInvoiceModalVisible(false)}
                    invoiceData={{
                        ...selectedRecord,
                        invoiceNumber: `INV${selectedRecord?.id.toString().padStart(6, '0')}`,
                        paymentMethod: 'cash' // Giả sử mặc định là tiền mặt
                    }}
                    onPrint={handlePrint}
                />
            </Card>
        </div>
    );
};

export default LabTestPaymentPage; 