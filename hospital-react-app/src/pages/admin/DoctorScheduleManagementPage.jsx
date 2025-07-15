import React, { useState,useEffect  } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api'; // nếu bạn có sẵn BASE_URL

// Mock data - In a real app, this would come from an API
const initialDoctors = [
  { id: 1, name: 'Dr. John Doe' },
  { id: 2, name: 'Dr. Jane Smith' },
  { id: 3, name: 'Dr. Emily White' },
  { id: 4, name: 'Dr. Michael Brown' },
];

const initialSchedules = [
  { id: 1, doctorId: 1, doctorName: 'Dr. John Doe', date: '2024-08-01', startTime: '09:00', endTime: '12:00', status: 'Available' },
  { id: 2, doctorId: 1, doctorName: 'Dr. John Doe', date: '2024-08-01', startTime: '14:00', endTime: '17:00', status: 'Booked' },
  { id: 3, doctorId: 2, doctorName: 'Dr. Jane Smith', date: '2024-08-02', startTime: '10:00', endTime: '13:00', status: 'Available' },
  { id: 4, doctorId: 3, doctorName: 'Dr. Emily White', date: '2024-08-02', startTime: '09:00', endTime: '17:00', status: 'Unavailable' },
  { id: 5, doctorId: 4, doctorName: 'Dr. Michael Brown', date: '2024-08-03', startTime: '08:00', endTime: '11:00', status: 'Available' },
];

function DoctorScheduleManagementPage() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rooms, setRooms] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const h = hour.toString().padStart(2, '0');
        const m = min.toString().padStart(2, '0');
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };
  const timeOptions = generateTimeOptions();

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/Doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data.map(d => ({ id: d.id, name: d.fullName })));
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Room`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  fetchDoctors();
  fetchRooms();
  fetchSchedules();
}, []);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
};
const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hour, minute] = timeStr.split(':');
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
};

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSchedule(null);
    setIsEditing(false);
  };

  const handleShowModal = (schedule = null) => {
    if (schedule) {
      const formattedSchedule = {
      ...schedule,
      date: formatDate(schedule.date),
      startTime: formatTime(schedule.startTime),
      endTime: formatTime(schedule.endTime),
    };
      setCurrentSchedule(formattedSchedule);

      setIsEditing(true);
    } else {
      setCurrentSchedule({ doctorId: '', date: '', startTime: '', endTime: '', status: 'Available' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const fetchSchedules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/DoctorSchedule`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setSchedules(response.data);
  } catch (error) {
    console.error("Failed to fetch schedules:", error);
  }
};






  const handleSave =async  () => {
    const token = localStorage.getItem("authToken");
    const doctor = doctors.find(d => d.id === parseInt(currentSchedule.doctorId));
    const room = rooms.find(r => r.id === parseInt(currentSchedule.roomId));

    const scheduleWithDoctorName = { ...currentSchedule, doctorName: doctor ? doctor.name : 'N/A' };

    const payload = {
    doctorId: parseInt(currentSchedule.doctorId),
    roomId: parseInt(currentSchedule.roomId),
    date: currentSchedule.date,
    startTime: currentSchedule.startTime,
    endTime: currentSchedule.endTime,
    status: currentSchedule.status
  };

  try {
    if (isEditing) {
      await axios.put(`${API_BASE_URL}/DoctorSchedule/${currentSchedule.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${API_BASE_URL}/DoctorSchedule`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
      
    await fetchSchedules();  // refresh danh sách
    handleCloseModal();      // đóng modal
  } catch (error) {
    console.error("Save failed:", error);
    alert("Error saving schedule. Please try again.");
  }
};

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSchedule(prev => ({ ...prev, [name]: value }));
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = schedules.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(schedules.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return <Badge bg="success">Available</Badge>;
      case 'Booked':
        return <Badge bg="warning">Booked</Badge>;
      case 'Unavailable':
        return <Badge bg="danger">Unavailable</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaCalendarAlt className="me-2" /> Doctor Schedule Management
          </h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Schedules List</span>
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-2" /> Add Schedule
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Room</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((schedule, index) => (
                <tr key={schedule.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{schedule.doctorName}</td>
                  <td>
                      <div className="fw-bold">{schedule.roomName}</div>
                    </td>
                  <td>{formatDate(schedule.date)}</td>
                  <td>{`${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`}</td>
                  <td>{getStatusBadge(schedule.status)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowModal(schedule)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(schedule.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        {totalPages > 1 && (
            <Card.Footer>
                <Pagination className="justify-content-center mb-0">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                        {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Card.Footer>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Schedule' : 'Add New Schedule'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Doctor</Form.Label>
              <Form.Select name="doctorId" value={currentSchedule?.doctorId || ''} onChange={handleChange} required>
                <option value="" disabled>Select a doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={currentSchedule?.date || ''} onChange={handleChange} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
  <Form.Label>Start Time</Form.Label>
  <Form.Select name="startTime" value={currentSchedule?.startTime || ''} onChange={handleChange}>
    <option value="" disabled>Select time</option>
    {timeOptions.map(time => (
      <option key={time} value={time}>{time}</option>
    ))}
  </Form.Select>
</Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
  <Form.Label>End Time</Form.Label>
  <Form.Select name="endTime" value={currentSchedule?.endTime || ''} onChange={handleChange}>
    <option value="" disabled>Select time</option>
    {timeOptions.map(time => (
      <option key={time} value={time}>{time}</option>
    ))}
  </Form.Select>
</Form.Group>
              </Col>
            </Row>

  <Form.Group className="mb-3">
  <Form.Label>Room</Form.Label>
  <Form.Select
    name="roomId"
    value={currentSchedule?.roomId || ''}
    onChange={handleChange}
    required
  >
    <option value="">Select Room</option>
    {rooms.map((room) => (
      <option key={room.id} value={room.id}>
        {room.name}
      </option>
    ))}
  </Form.Select>
</Form.Group>




            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={currentSchedule?.status || ''} onChange={handleChange}>
                <option value="" disabled>Select a Status</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Unavailable">Unavailable</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? 'Save Changes' : 'Add Schedule'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DoctorScheduleManagementPage; 