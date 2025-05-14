import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button, Dropdown, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // Mock data - API'dan gelecek gerçek verilerin yerine
  const mockApplications = [
    {
      id: 1,
      jobId: 101,
      position: "Frontend Developer (React)",
      company: "Tech Innovations Inc.",
      appliedDate: "2023-10-10",
      status: "review",
      statusText: "Under Review",
      lastUpdated: "2023-10-12"
    },
    {
      id: 2,
      jobId: 102,
      position: "UX Designer",
      company: "Creative Minds",
      appliedDate: "2023-10-05",
      status: "interview",
      statusText: "Interview Scheduled",
      lastUpdated: "2023-10-08"
    },
    {
      id: 3,
      jobId: 103,
      position: "Product Manager",
      company: "Digital Solutions",
      appliedDate: "2023-09-28",
      status: "rejected",
      statusText: "Not Selected",
      lastUpdated: "2023-10-01"
    },
    {
      id: 4,
      jobId: 104,
      position: "Backend Engineer",
      company: "Data Systems",
      appliedDate: "2023-10-15",
      status: "offer",
      statusText: "Offer Received",
      lastUpdated: "2023-10-18"
    }
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Gerçek uygulamada API çağrısı yapılır
        setTimeout(() => {
          setApplications(mockApplications);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const getStatusVariant = (status) => {
    switch(status) {
      case 'review': return 'info';
      case 'interview': return 'warning';
      case 'offer': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const handleWithdraw = (applicationId) => {
    // Gerçek uygulamada API çağrısı yapılır
    setApplications(prev => prev.filter(app => app.id !== applicationId));
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
          <h1>My Applications</h1>
          <p className="text-muted">Track your job applications and their status</p>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <h5 className="mb-0">
                Showing {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''}
              </h5>
            </Col>
            <Col md={6} className="text-md-end">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  Filter: {filter === 'all' ? 'All Applications' : 
                          filter === 'review' ? 'Under Review' :
                          filter === 'interview' ? 'Interview' :
                          filter === 'offer' ? 'Offers' : 'Rejected'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilter('all')}>All Applications</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('review')}>Under Review</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('interview')}>Interview</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('offer')}>Offers</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('rejected')}>Rejected</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {filteredApplications.length > 0 ? (
        <Card>
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Position</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <Button 
                      variant="link" 
                      className="p-0 text-start"
                      onClick={() => navigate(`/jobs/${application.jobId}`)}
                    >
                      {application.position}
                    </Button>
                  </td>
                  <td>{application.company}</td>
                  <td>{application.appliedDate}</td>
                  <td>
                    <Badge bg={getStatusVariant(application.status)}>
                      {application.statusText}
                    </Badge>
                    <div className="small text-muted">Updated: {application.lastUpdated}</div>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate(`/jobs/${application.jobId}`)}>
                          View Job
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate(`/apply/${application.jobId}`)}>
                          View Application
                        </Dropdown.Item>
                        {application.status === 'review' && (
                          <Dropdown.Item 
                            className="text-danger" 
                            onClick={() => handleWithdraw(application.id)}
                          >
                            Withdraw
                          </Dropdown.Item>
                        )}
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
            <h4 className="text-muted mb-3">
              {filter === 'all' 
                ? "You haven't applied to any jobs yet" 
                : `No ${filter} applications found`}
            </h4>
            <Button variant="primary" onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MyApplications;