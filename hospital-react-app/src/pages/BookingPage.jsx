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
import SubscribeSection from "../components/SubscribeSection";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingPage.css";
import { branches, doctors, generateTimeSlots } from "../data/mockData";
import LoadingSpinner from "../components/common/LoadingSpinner";

const BookingPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedService = searchParams.get("service");
  const servicePrice = searchParams.get("price");

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1500);
  }, []);

  // Filter doctors when branch is selected
  useEffect(() => {
    if (selectedBranch) {
      const filtered = doctors.filter(
        (doctor) => doctor.branchId === parseInt(selectedBranch)
      );
      setFilteredDoctors(filtered);
      setSelectedDoctor(""); // Reset selected doctor when branch changes
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedBranch]);

  // Set doctor details when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctors.find((d) => d.id === parseInt(selectedDoctor));
      setDoctorDetails(doctor);
    } else {
      setDoctorDetails(null);
    }
  }, [selectedDoctor]);

  // Update available slots when date or doctor changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const slots = generateTimeSlots(parseInt(selectedDoctor), selectedDate);
        setAvailableSlots(slots);
        setLoading(false);
      }, 1000);
    }
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedSlot || !selectedBranch) {
      toast.warning("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

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
                              {branches.map((branch) => (
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
                              {filteredDoctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                  Dr. {doctor.name} - {doctor.specialty}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>

                          {doctorDetails && (
                            <div className="doctor-info mt-3">
                              <h6>Doctor Information</h6>
                              <p className="mb-1">
                                Specialty: {doctorDetails.specialty}
                              </p>
                              <p className="mb-1">
                                Experience: {doctorDetails.experience} years
                              </p>
                              <p className="mb-0">
                                Languages: {doctorDetails.languages.join(", ")}
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
                                        selectedSlot === slot
                                          ? "primary"
                                          : "outline-primary"
                                      }
                                      onClick={() => setSelectedSlot(slot)}
                                      className="text-start"
                                    >
                                      {new Date(
                                        slot.startTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                      {" - "}
                                      {new Date(
                                        slot.endTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
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
