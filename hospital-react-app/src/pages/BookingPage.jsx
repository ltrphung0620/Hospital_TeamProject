import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingPage.css";
import { generateTimeSlots } from "../data/mockData";

import LoadingSpinner from "../components/common/LoadingSpinner";
import { API_BASE_URL } from '../services/api'; 



const BookingPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);

const [branchList, setBranchList] = useState([]);
const [doctorList, setDoctorList] = useState([]);
const [doctorSchedules, setDoctorSchedules] = useState([]);
const [patientId, setPatientId] = useState(null);





  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedService = searchParams.get("service");
  const servicePrice = searchParams.get("price");


  
useEffect(() => {
  const fetchPatientId = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const userId = authData?.userId;

    if (!userId) return;

    try {
      const res = await axios.get(`${API_BASE_URL}/Patient/user/${userId}`);
      setPatientId(res.data.id); 
    } catch (error) {
      console.error("Error fetching patientId:", error);
    }
  };

  fetchPatientId();
}, []);

  
useEffect(() => {
  if (!selectedDoctor) return;

  axios
    .get(`${API_BASE_URL}/DoctorSchedule/doctor/${selectedDoctor}`)
    .then((res) => setDoctorSchedules(res.data))
    .catch((err) => console.error("Failed to load schedule", err));
}, [selectedDoctor]);



  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1500);
  }, []);

useEffect(() => {
  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Branch`);
      setBranchList(response.data);
    } catch (error) {
      console.error("Failed to fetch branches:", error);
    }
  };
  fetchBranches();
}, []);


useEffect(() => {
  if (!selectedBranch) {
    setDoctorList([]);
    return;
  }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/Doctor/branchId/${selectedBranch}`
      );
      setDoctorList(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setDoctorList([]);
    }
  };

  fetchDoctors();
}, [selectedBranch]);




useEffect(() => {
  if (!selectedDoctor || !selectedDate) {
    setAvailableSlots([]);
    return;
  }

  setLoading(true);

 const selectedDateString = selectedDate.toLocaleDateString("en-CA");
  const filtered = doctorSchedules.filter((s) => {
    const scheduleDate = s.date.split("T")[0];
     return scheduleDate === selectedDateString && s.status?.toLowerCase() === "available";
  });

  // Chuyển sang Date object để render giờ
const slots = filtered.map((s) => {
  return {
    id: s.id,
    startTime: new Date(`${s.date.split("T")[0]}T${s.startTime}`),
    endTime: new Date(`${s.date.split("T")[0]}T${s.endTime}`),
  };
});

  setAvailableSlots(slots);
  setLoading(false);
}, [selectedDate, doctorSchedules]);





  // Set doctor details when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctorList.find((d) => d.id === parseInt(selectedDoctor));
      setDoctorDetails(doctor);
    } else {
      setDoctorDetails(null); 
    }
  }, [selectedDoctor]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedSlot || !selectedBranch) {
      toast.warning("Please fill in all required fields");
      return;
    }

    try {
    setLoading(true);

    const payload = {
      doctorId: parseInt(selectedDoctor),
      branchId: parseInt(selectedBranch),
      patientId: patientId,
      appointmentDate: selectedDate.toISOString().split("T")[0],
      startTime: selectedSlot.startTime.toTimeString().substring(0, 5), // "HH:mm"
      endTime: selectedSlot.endTime.toTimeString().substring(0, 5),
      note: note || ""
    };

    console.log("Payload gửi đi:", payload);
    // Gửi payload tới API
    await axios.post(`${API_BASE_URL}/Appointment`, payload);

    toast.success("Appointment booked successfully!");
    setTimeout(() => {
      navigate("/appointments");
    }, 2000);
  } catch (err) {
    toast.error("Failed to book appointment. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (pageLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Booking</h1>
            <span className="item">
              <Link to="/" className="">
                Home
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className="item">Booking</span>
          </div>
        </div>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {selectedService && (
                    <Card className="mb-4">
                      <Card.Body>
                        <h5 className="mb-3">Selected Service Package</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="text-capitalize mb-2">
                              {selectedService} Package
                            </h6>
                            <p className="text-muted mb-0">
                              Package Price: ${servicePrice}
                            </p>
                          </div>
                          <Link
                            to="/pricing"
                            className="btn btn-outline-primary"
                          >
                            Change Package
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  )}

                  <Row>
                    <Col md={6} className="mb-4">
                      <Card className="h-100">
                        <Card.Body>
                          <h5 className="mb-3">Select Location & Doctor</h5>
                          <Form.Group className="mb-3">
                            <Form.Label>Branch Location</Form.Label>
                            <Form.Select
                              value={selectedBranch}
                              onChange={(e) =>
                                setSelectedBranch(e.target.value)
                              }
                              disabled={loading}
                            >
                              <option value="">Select a branch</option>
                              {branchList.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                  {branch.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Select
                              value={selectedDoctor}
                              onChange={(e) =>
                                setSelectedDoctor(e.target.value)
                              }
                              disabled={!selectedBranch || loading}
                            >
                              <option value="">Select a doctor</option>
                              {doctorList.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                  Dr. {doctor.fullName} - {doctor.specialization}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>

                          {doctorDetails && (
                            <div className="doctor-info mt-3">
                              <h6>Doctor Information</h6>
                              <p className="mb-1">
                                Specialty: {doctorDetails.specialization}
                              </p>
                              <p className="mb-1">
                                Experience: {doctorDetails.yearOfExperience} years
                              </p>
                              <p className="mb-0">
                                 Languages: {doctorDetails.languages ? doctorDetails.languages.join(", ") : "N/A"}
                              </p>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Card className="h-100">
                        <Card.Body>
                          <h5 className="mb-3">Select Date & Time</h5>

                          <div className="calendar-container mb-4">
                            <Calendar
                              onChange={setSelectedDate}
                              value={selectedDate}
                              minDate={new Date()}
                              className="w-100"
                              tileDisabled={({ date }) =>
                                date < new Date().setHours(0, 0, 0, 0)
                              }
                            />
                          </div>

                          <Form.Group>
                            <Form.Label>Available Time Slots</Form.Label>
                            <div className="time-slots-grid">
                              {loading ? (
                                <div className="text-center py-4">
                                  <LoadingSpinner />
                                </div>
                              ) : availableSlots.length > 0 ? (
                                  <div className="d-grid gap-2">
    {availableSlots.map((slot, index) => (
      <Button
        key={index}
        variant={
          selectedSlot === slot ? "primary" : "outline-primary"
        }
        onClick={() => setSelectedSlot(slot)}
        className="text-start"
      >
        {slot.startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, 
        })}{" "}
        -{" "}
        {slot.endTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, 
        })}
      </Button>
    ))}
  </div>
) : (
  <Alert variant="info">
    No available slots for the selected date.
  </Alert>
                              )}
                            </div>
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Card className="mb-4">
                    <Card.Body>
                      <h5 className="mb-3">Additional Information</h5>
                      <Form.Group>
                        <Form.Label>Notes for the Doctor (Optional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Describe your symptoms or any specific concerns..."
                          disabled={loading}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>

                  <div className="text-center">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={
                        loading ||
                        !selectedDoctor ||
                        !selectedDate ||
                        !selectedSlot ||
                        !selectedBranch
                      }
                    >
                      {loading ? "Booking..." : "Book Appointment"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingPage;
