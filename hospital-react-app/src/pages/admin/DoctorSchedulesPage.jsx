import React, { useState } from 'react';
import { mockDoctorSchedules, getDayName, formatTime } from '../../data/mockDoctorScheduleData';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DoctorScheduleModal from '../../components/admin/DoctorScheduleModal';
import Swal from 'sweetalert2';

const DoctorSchedulesPage = () => {
  const [schedules, setSchedules] = useState(mockDoctorSchedules);
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleAdd = () => {
    setSelectedSchedule(null);
    setShowModal(true);
  };

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the schedule
        setSchedules(schedules.filter(schedule => schedule.id !== id));
        Swal.fire(
          'Deleted!',
          'The schedule has been deleted.',
          'success'
        );
      }
    });
  };

  const handleSave = (formData) => {
    if (selectedSchedule) {
      // Update existing schedule
      setSchedules(schedules.map(schedule =>
        schedule.id === selectedSchedule.id
          ? {
              ...schedule,
              ...formData,
              doctor: schedule.doctor, // Preserve doctor details
              room: schedule.room // Preserve room details
            }
          : schedule
      ));
      Swal.fire('Success', 'Schedule updated successfully!', 'success');
    } else {
      // Create new schedule
      const newSchedule = {
        id: Math.max(...schedules.map(s => s.id)) + 1,
        ...formData,
        doctor: mockDoctorSchedules.find(s => s.doctor.id === parseInt(formData.doctorId))?.doctor,
        room: mockDoctorSchedules.find(s => s.room.id === parseInt(formData.roomId))?.room
      };
      setSchedules([...schedules, newSchedule]);
      Swal.fire('Success', 'New schedule created successfully!', 'success');
    }
    setShowModal(false);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Doctor Schedules</h2>
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" />
          Add New Schedule
        </Button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>Doctor</th>
                  <th>Room</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={schedule.doctor.imageUrl}
                          alt={schedule.doctor.name}
                          className="rounded-circle me-2"
                          width="40"
                          height="40"
                          style={{ objectFit: 'cover' }}
                        />
                        <div>
                          <div className="fw-bold">{schedule.doctor.name}</div>
                          <div className="text-muted small">{schedule.doctor.specialization}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold">{schedule.room.name}</div>
                      <div className="text-muted small">{schedule.room.floor}</div>
                    </td>
                    <td>
                      <Badge bg="info" className="rounded-pill">
                        {getDayName(schedule.dayOfWeek)}
                      </Badge>
                    </td>
                    <td>
                      <div className="text-nowrap">
                        {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                      </div>
                    </td>
                    <td>
                      <div className="text-muted small">{schedule.note}</div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(schedule)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(schedule.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <DoctorScheduleModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        schedule={selectedSchedule}
      />
    </div>
  );
};

export default DoctorSchedulesPage; 