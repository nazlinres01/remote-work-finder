import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Badge, Spinner, Alert, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyPostedJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - API'dan gelecek gerçek verilerin yerine
  const mockJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "My Company",
      location: "Remote",
      type: "full-time",
      salary: "$90,000 - $120,000",
      postedDate: "2023-10-15",
      deadline: "2023-11-15",
      applications: 24,
      status: "active"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "My Company",
      location: "Istanbul, Turkey",
      type: "contract",
      salary: "$40/hour",
      postedDate: "2023-10-10",
      deadline: "2023-11-10",
      applications: 12,
      status: "active"
    },
    {
      id: 3,
      title: "Backend Engineer (Node.js)",
      company: "My Company",
      location: "Remote",
      type: "full-time",
      salary: "€80,000 - €100,000",
      postedDate: "2023-09-28",
      deadline: "2023-10-28",
      applications: 36,
      status: "expired"
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Gerçek uygulamada API çağrısı yapılır
        setTimeout(() => {
          setJobs(mockJobs);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleDelete = (jobId) => {
    // Gerçek uygulamada API çağrısı yapılır
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const handleViewApplications = (jobId) => {
    navigate(`/job-applications/${jobId}`);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'expired': return 'secondary';
      case 'draft': return 'warning';
      default: return 'primary';
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
          <Alert.Heading>Error loading jobs</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>My Posted Jobs</h1>
              <p className="text-muted">Manage your job listings and applications</p>
            </div>
            <Button 
              variant="primary"
              onClick={() => navigate('/post-job')}
            >
              Post New Job
            </Button>
          </div>
        </Col>
      </Row>

      {jobs.length > 0 ? (
        <Card>
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Applications</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="fw-bold">{job.title}</div>
                    <div className="small text-muted">Posted: {job.postedDate}</div>
                  </td>
                  <td>{job.location}</td>
                  <td>
                    <Badge bg="info" className="text-capitalize">
                      {job.type.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      variant="link" 
                      className="p-0"
                      onClick={() => handleViewApplications(job.id)}
                    >
                      {job.applications} applicants
                    </Button>
                  </td>
                  <td>
                    <Badge bg={getStatusBadge(job.status)} className="text-capitalize">
                      {job.status}
                    </Badge>
                    <div className="small text-muted">Deadline: {job.deadline}</div>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleViewApplications(job.id)}>
                          View Applications
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEdit(job.id)}>
                          Edit Job
                        </Dropdown.Item>
                        <Dropdown.Item 
                          className="text-danger" 
                          onClick={() => handleDelete(job.id)}
                        >
                          Delete Job
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
            <h4 className="text-muted mb-3">You haven't posted any jobs yet</h4>
            <p className="mb-4">Post your first job to start receiving applications</p>
            <Button variant="primary" onClick={() => navigate('/post-job')}>
              Post a Job
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MyPostedJobs;