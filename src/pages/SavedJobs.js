import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - API'dan gelecek gerçek verilerin yerine
  const mockSavedJobs = [
    {
      id: 1,
      jobId: 101,
      title: "Senior React Developer",
      company: "Tech Innovations Inc.",
      location: "Remote (Worldwide)",
      salary: "$90,000 - $120,000",
      type: "Full-time",
      postedDate: "2023-10-15",
      isRemote: true
    },
    {
      id: 2,
      jobId: 102,
      title: "UX/UI Designer",
      company: "Creative Minds",
      location: "Hybrid (Istanbul)",
      salary: "$40/hour",
      type: "Contract",
      postedDate: "2023-10-10",
      isRemote: false
    },
    {
      id: 3,
      jobId: 103,
      title: "Backend Engineer (Node.js)",
      company: "Data Systems",
      location: "Remote (EU)",
      salary: "€80,000 - €100,000",
      type: "Full-time",
      postedDate: "2023-10-05",
      isRemote: true
    }
  ];

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        // Gerçek uygulamada API çağrısı yapılır
        setTimeout(() => {
          setSavedJobs(mockSavedJobs);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemove = (jobId) => {
    // Gerçek uygulamada API çağrısı yapılır
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
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
          <Alert.Heading>Error loading saved jobs</Alert.Heading>
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
          <h1>Saved Jobs</h1>
          <p className="text-muted">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </Col>
      </Row>

      {savedJobs.length > 0 ? (
        <ListGroup variant="flush">
          {savedJobs.map((job) => (
            <ListGroup.Item key={job.id} className="py-3 px-0">
              <Row className="align-items-center">
                <Col md={8}>
                  <h4 className="mb-1">{job.title}</h4>
                  <div className="mb-2">
                    <span className="text-muted">{job.company}</span> • 
                    <span className="ms-1">{job.location}</span>
                  </div>
                  <div>
                    <Badge bg="info" className="me-2">
                      {job.type}
                    </Badge>
                    {job.isRemote && (
                      <Badge bg="success">Remote</Badge>
                    )}
                  </div>
                </Col>
                <Col md={4} className="text-md-end mt-3 mt-md-0">
                  <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleApply(job.jobId)}
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemove(job.id)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="text-muted small mt-2">
                    Saved on: {job.postedDate}
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body className="text-center py-5">
            <h4 className="text-muted mb-3">You haven't saved any jobs yet</h4>
            <p className="mb-4">Save interesting jobs to apply later</p>
            <Button variant="primary" onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default SavedJobs;