import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Badge, Spinner, Alert, Dropdown, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedApps, setSelectedApps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock API calls
        const mockJobs = [
          {
            id: 1,
            title: "Senior React Developer",
            company: "Tech Corp",
            status: "active"
          },
          {
            id: 2,
            title: "UX Designer",
            company: "Design Studio",
            status: "active"
          }
        ];

        const mockApplications = [
          {
            id: 1,
            jobId: 1,
            applicant: "Ahmet Yılmaz",
            email: "ahmet@example.com",
            applyDate: "2023-10-18",
            status: "pending",
            cvUrl: "/dummy-cv.pdf",
            coverLetter: "I'm excited to apply for this position...",
            skills: ["React", "JavaScript", "TypeScript"]
          },
          {
            id: 2,
            jobId: 1,
            applicant: "Ayşe Kaya",
            email: "ayse@example.com",
            applyDate: "2023-10-15",
            status: "reviewed",
            cvUrl: "/dummy-cv.pdf",
            coverLetter: "With my 5 years of experience...",
            skills: ["React", "Redux", "Node.js"]
          },
          {
            id: 3,
            jobId: 1,
            applicant: "Mehmet Demir",
            email: "mehmet@example.com",
            applyDate: "2023-10-10",
            status: "rejected",
            cvUrl: "/dummy-cv.pdf",
            coverLetter: "I believe I'm a great fit...",
            skills: ["JavaScript", "HTML", "CSS"]
          }
        ];

        const job = mockJobs.find(j => j.id === parseInt(jobId));
        if (!job) throw new Error('Job not found');
        
        const jobApplications = mockApplications.filter(app => app.jobId === parseInt(jobId));
        
        setJob(job);
        setApplications(jobApplications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const handleStatusChange = (applicationId, newStatus) => {
    // Gerçek uygulamada API çağrısı yapılır
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleSelectApp = (appId) => {
    setSelectedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId) 
        : [...prev, appId]
    );
  };

  const handleBulkAction = (action) => {
    // Gerçek uygulamada API çağrısı yapılır
    setApplications(prev => 
      prev.map(app => 
        selectedApps.includes(app.id) ? { ...app, status: action } : app
      )
    );
    setSelectedApps([]);
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'reviewed': return 'info';
      case 'interview': return 'primary';
      case 'hired': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Error loading applications</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate('/my-posted-jobs')}>
            Back to My Jobs
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
          <h2 className="mt-3">Applications for: {job?.title}</h2>
          <p className="text-muted">Manage applications for this position</p>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="me-2">
                  Filter: {filter === 'all' ? 'All' : filter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilter('all')}>All</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('pending')}>Pending</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('reviewed')}>Reviewed</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('interview')}>Interview</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('hired')}>Hired</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('rejected')}>Rejected</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              {selectedApps.length > 0 && (
                <Dropdown>
                  <Dropdown.Toggle variant="primary">
                    Bulk Actions ({selectedApps.length})
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleBulkAction('reviewed')}>
                      Mark as Reviewed
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBulkAction('interview')}>
                      Mark for Interview
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBulkAction('rejected')}>
                      Reject Applications
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {filteredApplications.length > 0 ? (
        <Card>
          <Table hover responsive>
            <thead>
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    checked={selectedApps.length === filteredApplications.length}
                    onChange={() => 
                      selectedApps.length === filteredApplications.length 
                        ? setSelectedApps([]) 
                        : setSelectedApps(filteredApplications.map(app => app.id))
                    }
                  />
                </th>
                <th>Applicant</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedApps.includes(application.id)}
                      onChange={() => handleSelectApp(application.id)}
                    />
                  </td>
                  <td>
                    <div className="fw-bold">{application.applicant}</div>
                    <div className="small text-muted">{application.email}</div>
                  </td>
                  <td>{application.applyDate}</td>
                  <td>
                    <Badge bg={getStatusVariant(application.status)}>
                      {application.status}
                    </Badge>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item 
                          onClick={() => navigate(`/application-detail/${application.id}`)}
                        >
                          View Details
                        </Dropdown.Item>
                        <Dropdown.Item 
                          href={application.cvUrl} 
                          target="_blank"
                        >
                          Download CV
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => handleStatusChange(application.id, 'reviewed')}
                        >
                          Mark as Reviewed
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => handleStatusChange(application.id, 'interview')}
                        >
                          Mark for Interview
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => handleStatusChange(application.id, 'hired')}
                        >
                          Mark as Hired
                        </Dropdown.Item>
                        <Dropdown.Item 
                          className="text-danger"
                          onClick={() => handleStatusChange(application.id, 'rejected')}
                        >
                          Reject Application
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      ) : (
        <Card>
          <Card.Body className="text-center py-5">
            <h4 className="text-muted">No applications found</h4>
            <p>You haven't received any applications for this job yet</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default JobApplications;