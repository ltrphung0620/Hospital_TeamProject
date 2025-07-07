import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaClock, FaCalendarAlt, FaDoorOpen, FaUserMd, FaStickyNote } from 'react-icons/fa';

const DoctorScheduleModal = ({ show, onHide, onSave, schedule }) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    roomId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    note: ''
  });

  // Mock data for doctors and rooms (replace with API data later)
  const doctors = [
    { id: 1, name: "Dr. John Smith", specialization: "Cardiology" },
    { id: 2, name: "Dr. Sarah Johnson", specialization: "Pediatrics" },
    { id: 3, name: "Dr. Michael Chen", specialization: "Neurology" },
    { id: 4, name: "Dr. Emily Brown", specialization: "Dermatology" },
    { id: 5, name: "Dr. Robert Wilson", specialization: "Orthopedics" }
  ];

  const rooms = [
    { id: 101, name: "Room 101", floor: "1st Floor" },
    { id: 102, name: "Room 102", floor: "1st Floor" },
    { id: 201, name: "Room 201", floor: "2nd Floor" },
    { id: 202, name: "Room 202", floor: "2nd Floor" },
    { id: 301, name: "Room 301", floor: "3rd Floor" }
  ];

  useEffect(() => {
    if (schedule) {
      setFormData({
        doctorId: schedule.doctorId,
        roomId: schedule.roomId,
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        note: schedule.note || ''
      });
    } else {
      setFormData({
        doctorId: '',
        roomId: '',
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        note: ''
      });
    }
  }, [schedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="doctor-schedule-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {schedule ? 'Edit Doctor Schedule' : 'Create New Doctor Schedule'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  <FaUserMd className="me-2" />
                  Doctor
                </Form.Label>
                <Form.Select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  <FaDoorOpen className="me-2" />
                  Room
                </Form.Label>
                <Form.Select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {room.floor}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FaCalendarAlt className="me-2" />
                  Day of Week
                </Form.Label>
                <Form.Select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Day</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                  <option value="0">Sunday</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FaClock className="me-2" />
                  Start Time
                </Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FaClock className="me-2" />
                  End Time
                </Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaStickyNote className="me-2" />
              Notes
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add any additional notes here..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {schedule ? 'Update Schedule' : 'Create Schedule'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorScheduleModal; 