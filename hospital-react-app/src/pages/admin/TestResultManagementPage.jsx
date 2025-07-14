import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import { FaClipboardCheck, FaEdit, FaEye, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://api.demoproject.software/api/TestResult';
const REQUEST_API_URL = 'https://api.demoproject.software/api/TestRequest';

function TestResultManagementPage() {
  const [results, setResults] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load test results and pending requests from API
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setResults(res.data))
      .catch(() => setResults([]));
    axios.get(REQUEST_API_URL)
      .then(res => setPendingRequests(res.data))
      .catch(() => setPendingRequests([]));
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentResult(null);
    setIsEditing(false);
  };

  const handleShowModal = (result = null, editMode = false) => {
    if (result) {
      setCurrentResult({ ...result });
    } else {
      setCurrentResult({ testRequestID: '', result: '', resultDate: new Date().toISOString() });
    }
    setIsEditing(editMode);
    setShowModal(true);
  };

  // Thêm hoặc sửa test result qua API
  const handleSave = () => {
    if (currentResult.id) {
      // Update
      axios.put(`${API_URL}/${currentResult.id}`, currentResult)
        .then(res => {
          setResults(results.map(r => (r.id === res.data.id ? res.data : r)));
          handleCloseModal();
        });
    } else {
      // Add new
      axios.post(API_URL, currentResult)
        .then(res => {
          setResults([...results, res.data]);
          handleCloseModal();
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentResult(prev => ({ ...prev, [name]: value }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper: get patient & test info from request
  const getRequestInfo = (testRequestID) => {
    const req = pendingRequests.find(r => r.id === parseInt(testRequestID));
    if (!req) return { patientName: '', testName: '' };
    return {
      patientName: req.patientName || req.PatientName || '',
      testName: req.labTestName || req.LabTestName || req.testName || ''
    };
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title"><FaClipboardCheck className="me-2" /> Test Result Management</h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Test Results List</span>
          <Button variant="primary" onClick={() => handleShowModal(null, true)}>
            <FaPlus className="me-2" /> Add Result
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Test Name</th>
                <th>Result Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((result, index) => {
                const info = getRequestInfo(result.testRequestID);
                return (
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{info.patientName}</td>
                    <td>{info.testName}</td>
                    <td>{new Date(result.resultDate).toLocaleString()}</td>
                    <td>
                      <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleShowModal(result, false)}>
                        <FaEye />
                      </Button>
                      <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(result, true)}>
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
        {totalPages > 1 && (
          <Card.Footer>
            <Pagination className="justify-content-center mb-0">
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>{i + 1}</Pagination.Item>
              ))}
            </Pagination>
          </Card.Footer>
        )}
      </Card>

      {/* Add/Edit/View Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? (currentResult?.id ? 'Edit Test Result' : 'Add Test Result') : 'View Test Result'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {currentResult?.id ? (
              // Viewing or Editing existing result
              <>
                <Row className="mb-3">
                  <Col><p><strong>Patient:</strong> {getRequestInfo(currentResult.testRequestID).patientName}</p></Col>
                  <Col><p><strong>Test:</strong> {getRequestInfo(currentResult.testRequestID).testName}</p></Col>
                </Row>
                <hr />
              </>
            ) : (
              // Adding a new result
              <Form.Group className="mb-3">
                <Form.Label>Pending Test Request</Form.Label>
                <Form.Select name="testRequestID" value={currentResult?.testRequestID || ''} onChange={handleChange}>
                  <option value="" disabled>Select a pending test...</option>
                  {pendingRequests.map(req => (
                    <option key={req.id} value={req.id}>
                      {getRequestInfo(req.id).patientName} - {getRequestInfo(req.id).testName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Result</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="result"
                value={currentResult?.result || ''}
                onChange={handleChange}
                placeholder="Enter test result details..."
                readOnly={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Result Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="resultDate"
                value={currentResult?.resultDate ? new Date(currentResult.resultDate).toISOString().slice(0, 16) : ''}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          {isEditing && <Button variant="primary" onClick={handleSave}>Save Changes</Button>}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TestResultManagementPage;