import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Badge, Collapse } from 'react-bootstrap';
import { FaCheck, FaChevronDown, FaChevronUp, FaStethoscope } from 'react-icons/fa';
import api, { API_BASE_URL } from '../../services/api';
import LoadingSpinner from './LoadingSpinner';

// Định nghĩa các service packages
const SERVICE_PACKAGES = [
  {
    id: 'standard',
    name: 'Tiêu chuẩn',
    price: 1425000,
    isRecommended: false,
    services: [
      { name: 'Khám tổng quát', price: 500000 },
      { name: 'Xét nghiệm máu', price: 350000 },
      { name: 'Tư vấn sức khỏe', price: 250000 },
      { name: 'Đo điện tâm đồ', price: 325000 }
    ]
  },
  {
    id: 'basic',
    name: 'Cơ bản',
    price: 1990000,
    isRecommended: true,
    services: [
      { name: 'Khám tổng quát', price: 500000 },
      { name: 'Xét nghiệm máu', price: 350000 },
      { name: 'Tư vấn sức khỏe', price: 250000 },
      { name: 'Siêu âm ổ bụng', price: 450000 },
      { name: 'Đo điện tâm đồ', price: 440000 }
    ]
  },
  {
    id: 'advanced',
    name: 'Nâng cao',
    price: 2585000,
    isRecommended: false,
    services: [
      { name: 'Khám tổng quát', price: 500000 },
      { name: 'Xét nghiệm máu', price: 350000 },
      { name: 'Tư vấn sức khỏe', price: 250000 },
      { name: 'Đo điện tâm đồ', price: 325000 },
      { name: 'Siêu âm ổ bụng', price: 450000 },
      { name: 'Chụp X-quang', price: 710000 }
    ]
  },
  {
    id: 'comprehensive',
    name: 'Toàn diện',
    price: 4765000,
    isRecommended: false,
    services: [
      { name: 'Khám tổng quát', price: 500000 },
      { name: 'Xét nghiệm máu', price: 350000 },
      { name: 'Tư vấn sức khỏe', price: 250000 },
      { name: 'Đo điện tâm đồ', price: 325000 },
      { name: 'Siêu âm ổ bụng', price: 450000 },
      { name: 'Chụp X-quang', price: 710000 },
      { name: 'Nội soi dạ dày', price: 2180000 }
    ]
  }
];

const ServicePackageSelector = ({ selectedPackage, onSelectPackage, disabled = false }) => {
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [medicalServices, setMedicalServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicalServices();
  }, []);

  const fetchMedicalServices = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/MedicalService`);
      setMedicalServices(response.data);
    } catch (error) {
      console.error('Error fetching medical services:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  };

  const toggleExpanded = (packageId) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

  const handleSelectPackage = (pkg) => {
    if (!disabled) {
      onSelectPackage(pkg);
    }
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center">
          <LoadingSpinner />
          <p className="mt-2">Đang tải thông tin gói dịch vụ...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <FaStethoscope className="me-2" />
          Chọn gói dịch vụ
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="service-packages-grid">
          {SERVICE_PACKAGES.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`h-100 service-package-card ${
                selectedPackage?.id === pkg.id ? 'border-primary selected' : ''
              } ${pkg.isRecommended ? 'recommended' : ''} ${disabled ? 'disabled' : ''}`}
              style={{ 
                cursor: disabled ? 'not-allowed' : 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleSelectPackage(pkg)}
              >
                {pkg.isRecommended && (
                  <Badge 
                    bg="primary" 
                    className="position-absolute top-0 start-50 translate-middle px-3 py-2"
                    style={{ zIndex: 1 }}
                  >
                    Khuyến nghị
                  </Badge>
                )}
                
                <Card.Body className={`text-center ${pkg.isRecommended ? 'bg-primary text-white' : ''}`}>
                  <h6 className="mb-3">{pkg.name}</h6>
                  <h3 className="fw-bold mb-4">
                    {formatPrice(pkg.price)}
                  </h3>
                  
                  <div className="service-list mb-3">
                    {pkg.services.slice(0, 4).map((service, index) => (
                      <p key={index} className="mb-2">
                        <FaCheck className="me-2" />
                        {service.name}
                      </p>
                    ))}
                    {pkg.services.length > 4 && (
                      <p className="mb-2">
                        <FaCheck className="me-2" />
                        Và {pkg.services.length - 4} dịch vụ khác
                      </p>
                    )}
                  </div>

                  <Button
                    variant={pkg.isRecommended ? "light" : "primary"}
                    className={`mb-3 w-100 ${pkg.isRecommended ? 'text-primary' : ''}`}
                    disabled={disabled}
                  >
                    {selectedPackage?.id === pkg.id ? 'Đã chọn' : 'Chọn gói này'}
                  </Button>

                  <Button
                    variant="link"
                    size="sm"
                    className={`p-0 ${pkg.isRecommended ? 'text-white' : 'text-primary'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(pkg.id);
                    }}
                    disabled={disabled}
                  >
                    Chi tiết gói{' '}
                    {expandedPackage === pkg.id ? (
                      <FaChevronUp className="ms-1" />
                    ) : (
                      <FaChevronDown className="ms-1" />
                    )}
                  </Button>

                  <Collapse in={expandedPackage === pkg.id}>
                    <div className="mt-3">
                      <hr className={pkg.isRecommended ? 'text-white' : ''} />
                      <h6 className="mb-3">Chi tiết giá dịch vụ:</h6>
                      {pkg.services.map((service, index) => (
                        <div key={index} className="d-flex justify-content-between mb-2">
                          <span className="text-start">{service.name}</span>
                          <span className="fw-bold">{formatPrice(service.price)}</span>
                        </div>
                      ))}
                      <hr className={pkg.isRecommended ? 'text-white' : ''} />
                      <div className="d-flex justify-content-between">
                        <strong>Tổng cộng:</strong>
                        <strong>{formatPrice(pkg.price)}</strong>
                      </div>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
          ))}
        </div>

        {selectedPackage && (
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="text-primary mb-2">
              <FaCheck className="me-2" />
              Gói đã chọn: {selectedPackage.name}
            </h6>
            <p className="mb-0">
              Tổng giá trị: <strong className="text-primary">{formatPrice(selectedPackage.price)}</strong>
            </p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ServicePackageSelector; 