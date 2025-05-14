import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  People, 
  Briefcase, 
  Envelope, 
  GraphUp,
  Gear,
  ShieldLock
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call for admin dashboard stats
    const fetchStats = async () => {
      try {
        setTimeout(() => {
          setStats({
            totalUsers: 1243,
            newUsers: 28,
            totalJobs: 567,
            newJobs: 15,
            applications: 892,
            pendingVerifications: 7
          });
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
          <Alert.Heading>Error loading dashboard</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="px-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mt-4">Admin Dashboard</h1>
          <p className="text-muted">Overview of platform activities</p>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col xl={3} lg={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Users</h6>
                  <h3>{stats.totalUsers}</h3>
                  <small className="text-success">+{stats.newUsers} new</small>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <People size={24} className="text-primary" />
                </div>
              </div>
              <Link to="/admin/users" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Jobs</h6>
                  <h3>{stats.totalJobs}</h3>
                  <small className="text-success">+{stats.newJobs} new</small>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <Briefcase size={24} className="text-warning" />
                </div>
              </div>
              <Link to="/admin/jobs" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Applications</h6>
                  <h3>{stats.applications}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <Envelope size={24} className="text-info" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Verifications</h6>
                  <h3>{stats.pendingVerifications}</h3>
                </div>
                <div className="bg-danger bg-opacity-10 p-3 rounded">
                  <ShieldLock size={24} className="text-danger" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Recent Activities</h5>
                <Link to="/admin/activities">View All</Link>
              </div>
              <div className="list-group list-group-flush">
                {[1, 2, 3].map(item => (
                  <div key={item} className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-light rounded p-2 me-3">
                        <GraphUp size={18} />
                      </div>
                      <div>
                        <h6 className="mb-0">New {item === 1 ? 'user registration' : item === 2 ? 'job posting' : 'application'}</h6>
                        <small className="text-muted">2 hours ago</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Quick Actions</h5>
              </div>
              <Row className="g-3">
                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="text-center">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                        <Gear size={24} className="text-primary" />
                      </div>
                      <h6>System Settings</h6>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="text-center">
                      <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                        <People size={24} className="text-success" />
                      </div>
                      <h6>Manage Users</h6>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="text-center">
                      <div className="bg-warning bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                        <Briefcase size={24} className="text-warning" />
                      </div>
                      <h6>Job Listings</h6>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="text-center">
                      <div className="bg-info bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                        <ShieldLock size={24} className="text-info" />
                      </div>
                      <h6>Verifications</h6>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;