import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Tab, Tabs, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  // Mock API call
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Gerçek uygulamada burada API çağrısı yapılır
        const mockJobs = [
          {
            id: 1,
            title: "Senior React Developer",
            company: "Tech Innovations Inc.",
            location: "Remote (Worldwide)",
            type: "Full-time",
            salary: "$90,000 - $120,000",
            postedDate: "2023-10-15",
            deadline: "2023-11-15",
            description: "We're looking for an experienced React developer to join our team...",
            requirements: [
              "5+ years of React experience",
              "Proficient in TypeScript",
              "Experience with Redux or Context API"
            ],
            benefits: [
              "Flexible working hours",
              "Annual tech budget",
              "Health insurance"
            ],
            isRemote: true,
            applicants: 24,
            views: 156
          },
          {
            id: 2,
            title: "UX/UI Designer",
            company: "Creative Minds",
            location: "Hybrid (Istanbul)",
            type: "Contract",
            salary: "$40/hour",
            postedDate: "2023-10-20",
            deadline: "2023-11-10",
            description: "Join our design team to create beautiful interfaces...",
            requirements: [
              "3+ years of design experience",
              "Figma expertise",
              "Portfolio required"
            ],
            benefits: [
              "Remote work options",
              "Creative freedom",
              "International team"
            ],
            isRemote: false,
            applicants: 12,
            views: 89
          }
        ];

        const foundJob = mockJobs.find(job => job.id === parseInt(jobId));
        
        if (!foundJob) {
          throw new Error('Job not found');
        }

        setJob(foundJob);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

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
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate('/jobs')}>
            Back to Jobs
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
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <h1>{job.title}</h1>
              <h4 className="text-muted">{job.company}</h4>
              <div className="d-flex align-items-center my-3">
                <Badge bg="info" className="me-2">
                  {job.type}
                </Badge>
                {job.isRemote && (
                  <Badge bg="success">Remote</Badge>
                )}
              </div>
              <p className="fs-5">
                <strong>📍 Location:</strong> {job.location}
              </p>
              <p className="fs-5">
                <strong>💰 Salary:</strong> {job.salary}
              </p>
            </Col>
            <Col md={4} className="d-flex flex-column justify-content-between">
              <div>
                <p className="text-muted">
                  <small>Posted: {job.postedDate}</small>
                </p>
                <p className="text-muted">
                  <small>Deadline: {job.deadline}</small>
                </p>
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Apply Now
                </Button>
                <Button variant="outline-secondary">
                  Save Job
                </Button>
              </div>
              <div className="mt-3 text-muted">
                <small>{job.applicants} applicants • {job.views} views</small>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="description" title="Job Description">
          <Card className="mt-3">
            <Card.Body>
              <h4>About the Job</h4>
              <p>{job.description}</p>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="requirements" title="Requirements">
          <Card className="mt-3">
            <Card.Body>
              <h4>Requirements</h4>
              <ul>
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="benefits" title="Benefits">
          <Card className="mt-3">
            <Card.Body>
              <h4>Benefits</h4>
              <ul>
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <Row className="mt-5">
        <Col className="text-center">
          <Button variant="primary" size="lg" className="me-3">
            Apply Now
          </Button>
          <Button variant="outline-primary" size="lg">
            Save for Later
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;