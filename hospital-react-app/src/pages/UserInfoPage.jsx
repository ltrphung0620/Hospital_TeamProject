import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Form, Button, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Avatar from '../components/common/Avatar';
import { mockUserData } from '../data/mockData';
import axios from 'axios';
import api, { API_BASE_URL } from '../services/api';

const UserInfoPage = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'appointments';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [userData, setUserData] = useState([]);


  useEffect(() => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  if (!authData || !authData.token || !authData.userId) return;

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/User/${authData.userId}`, {
        headers: {
          Authorization: `Bearer ${authData.token}`
        }
      });
      setUserData(res.data);
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  fetchUserData();
}, []);


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSubmit = async  (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    try {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const token = authData?.token;
    console.log(token); 
    const response = await axios.post(
     `${API_BASE_URL}/Auth/change-password`,
      {
        currentPassword,
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPasswordSuccess('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    } catch (error) {
    if (error.response && error.response.data?.message) {
      setPasswordError(error.response.data.message);
    } else {
      setPasswordError('Something went wrong. Please try again.');
    }
  }
  };

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="position-relative d-inline-block mb-4">
                <Avatar name={userData.username} size={120} className="border-3 border-primary" />
                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2 border border-white"></span>
              </div>
              <h4 className="mb-1">{userData.fullName}</h4>
              <p className="text-muted mb-3">{userData.email}</p>
              <div className="d-grid">
                <Button variant="outline-primary" onClick={() => setShowPasswordForm(!showPasswordForm)}>
                  <i className="fas fa-key me-2"></i>
                  Change Password
                </Button>
              </div>
              
              {showPasswordForm && (
                <Form onSubmit={handlePasswordSubmit} className="mt-4 text-start">
                  {passwordError && <Alert variant="danger">{passwordError}</Alert>}
                  {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button type="submit" variant="primary">
                      Update Password
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h5 className="mb-3">Personal Information</h5>
              <div className="mb-3">
                <small className="text-muted d-block">Phone</small>
                <div>{mockUserData.phone}</div>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Address</small>
                <div>{mockUserData.address}</div>
              </div>
              <div>
                <small className="text-muted d-block">Member Since</small>
                <div>{new Date(mockUserData.joinDate).toLocaleDateString()}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="nav-fill border-bottom">
                  <Nav.Item>
                    <Nav.Link eventKey="appointments" className="border-0 px-4 py-3">
                      <i className="fas fa-calendar-check me-2"></i>
                      Appointments
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="waiting" className="border-0 px-4 py-3">
                      <i className="fas fa-clock me-2"></i>
                      Waiting List
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="prescriptions" className="border-0 px-4 py-3">
                      <i className="fas fa-prescription me-2"></i>
                      Prescriptions
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="invoices" className="border-0 px-4 py-3">
                      <i className="fas fa-file-invoice-dollar me-2"></i>
                      Invoices
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="appointments" className="p-4">
                    {mockUserData.appointments.map((appointment, index) => (
                      <Card key={index} className="border-0 shadow-sm mb-3">
                        <Card.Body className="p-3">
                          <Row className="align-items-center">
                            <Col xs={12} md={2} className="mb-3 mb-md-0">
                              <div className="text-center text-md-start">
                                <div className="fw-bold">{new Date(appointment.date).toLocaleDateString()}</div>
                                <div className="text-muted small">{appointment.time}</div>
                              </div>
                            </Col>
                            <Col xs={12} md={4} className="mb-3 mb-md-0">
                              <div className="d-flex align-items-center">
                                <Avatar name={appointment.doctorName} size={40} className="me-3" />
                                <div>
                                  <div className="fw-bold">{appointment.doctorName}</div>
                                  <div className="text-muted small">{appointment.department}</div>
                                </div>
                              </div>
                            </Col>
                            <Col xs={12} md={4} className="mb-3 mb-md-0">
                              <div className="text-muted small mb-1">Reason</div>
                              <div>{appointment.reason}</div>
                              <div className="text-muted small mt-1">Room {appointment.roomNumber}</div>
                              {appointment.notes && (
                                <div className="text-muted small mt-1">
                                  <i className="fas fa-info-circle me-1"></i>
                                  {appointment.notes}
                                </div>
                              )}
                            </Col>
                            <Col xs={12} md={2}>
                              <div className={`badge bg-${appointment.status === 'Completed' ? 'success' : appointment.status === 'Cancelled' ? 'danger' : 'primary'}`}>
                                {appointment.status}
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Tab.Pane>

                  <Tab.Pane eventKey="waiting" className="p-4">
                    {mockUserData.waitingList.map((item, index) => (
                      <Card key={index} className="border-0 shadow-sm mb-3">
                        <Card.Body className="p-3">
                          <Row className="align-items-center">
                            <Col xs={12} md={3} className="mb-3 mb-md-0">
                              <div className="text-center text-md-start">
                                <div className="fw-bold">{new Date(item.date).toLocaleDateString()}</div>
                                <div className="text-muted small">Queue #{item.queueNumber}</div>
                              </div>
                            </Col>
                            <Col xs={12} md={3} className="mb-3 mb-md-0">
                              <div className="text-muted small mb-1">Department</div>
                              <div>{item.department}</div>
                            </Col>
                            <Col xs={12} md={3} className="mb-3 mb-md-0">
                              <div className="text-muted small mb-1">Current Number</div>
                              <div>{item.currentNumber}</div>
                              <div className="text-muted small mt-1">
                                Est. Wait: {item.estimatedTime}
                              </div>
                            </Col>
                            <Col xs={12} md={3}>
                              <div className={`badge bg-${item.status === 'Called' ? 'success' : 'warning'} mb-2`}>
                                {item.status}
                              </div>
                              {item.priority === 'Urgent' && (
                                <div className="badge bg-danger ms-2">Urgent</div>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Tab.Pane>

                  <Tab.Pane eventKey="prescriptions" className="p-4">
                    {mockUserData.prescriptions.map((prescription, index) => (
                      <Card key={index} className="border-0 shadow-sm mb-3">
                        <Card.Body className="p-3">
                          <Row>
                            <Col xs={12} md={3} className="mb-3 mb-md-0">
                              <div className="text-center text-md-start">
                                <div className="fw-bold">{new Date(prescription.date).toLocaleDateString()}</div>
                                <div className="text-muted small">Prescription #{prescription.id}</div>
                                <div className="badge bg-success mt-2">{prescription.status}</div>
                              </div>
                            </Col>
                            <Col xs={12} md={4} className="mb-3 mb-md-0">
                              <div className="d-flex align-items-center">
                                <Avatar name={prescription.doctorName} size={40} className="me-3" />
                                <div>
                                  <div className="fw-bold">{prescription.doctorName}</div>
                                  <div className="text-muted small">{prescription.department}</div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <div className="text-muted small">Diagnosis</div>
                                <div>{prescription.diagnosis}</div>
                              </div>
                            </Col>
                            <Col xs={12}>
                              <hr className="my-3" />
                              <div className="text-muted mb-2">
                                Medications (Valid until: {new Date(prescription.validUntil).toLocaleDateString()})
                              </div>
                              {prescription.medications.map((med, idx) => (
                                <div key={idx} className="d-flex align-items-start mb-3">
                                  <i className="fas fa-capsules text-primary mt-1 me-2"></i>
                                  <div>
                                    <div className="fw-bold">{med.name}</div>
                                    <div className="text-muted small">{med.dosage} - {med.frequency}</div>
                                    <div className="text-muted small">{med.instructions}</div>
                                    <div className="text-muted small">
                                      Duration: {med.duration} | Quantity: {med.quantity} | Refills: {med.refills}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Tab.Pane>

                  <Tab.Pane eventKey="invoices" className="p-4">
                    {mockUserData.invoices.map((invoice, index) => (
                      <Card key={index} className="border-0 shadow-sm mb-3">
                        <Card.Body className="p-3">
                          <Row>
                            <Col xs={12} md={3} className="mb-3 mb-md-0">
                              <div className="text-center text-md-start">
                                <div className="fw-bold">{new Date(invoice.date).toLocaleDateString()}</div>
                                <div className="text-muted small">Invoice #{invoice.id}</div>
                              </div>
                            </Col>
                            <Col xs={12} md={6} className="mb-3 mb-md-0">
                              <div className="text-muted small mb-1">Description</div>
                              <div>{invoice.description}</div>
                              {invoice.paymentMethod && (
                                <div className="text-muted small mt-1">
                                  Paid via {invoice.paymentMethod} on {new Date(invoice.paymentDate).toLocaleDateString()}
                                </div>
                              )}
                              {invoice.insuranceClaim && (
                                <div className="text-muted small mt-1">
                                  Insurance: {invoice.insuranceClaim.provider} (Claim #{invoice.insuranceClaim.claimNumber})
                                </div>
                              )}
                            </Col>
                            <Col xs={12} md={3} className="text-md-end">
                              <div className="text-muted small mb-1">Amount</div>
                              <div className="fw-bold">${invoice.amount.toFixed(2)}</div>
                              <div className={`badge bg-${invoice.status === 'Paid' ? 'success' : 'warning'} mt-2`}>
                                {invoice.status}
                              </div>
                            </Col>
                            {invoice.items && (
                              <Col xs={12}>
                                <hr className="my-3" />
                                <div className="text-muted mb-2">Items:</div>
                                {invoice.items.map((item, idx) => (
                                  <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                      <div>{item.name}</div>
                                      <div className="text-muted small">{item.description}</div>
                                    </div>
                                    <div className="text-end">
                                      <div>${item.amount.toFixed(2)}</div>
                                      <div className="text-muted small">Qty: {item.quantity}</div>
                                    </div>
                                  </div>
                                ))}
                              </Col>
                            )}
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfoPage; 