import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    isRemote: false,
    deadline: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Mock API call - Gerçek uygulamada API'dan ilan detayları çekilir
        const mockJobs = [
          {
            id: 1,
            title: "Senior React Developer",
            company: "Tech Corp",
            location: "Remote",
            jobType: "full-time",
            salary: "$90,000 - $120,000",
            description: "We are looking for an experienced React developer...",
            requirements: "5+ years of React experience\nProficient in TypeScript",
            benefits: "Flexible hours\nHealth insurance",
            isRemote: true,
            deadline: "2023-12-15",
            status: "active"
          },
          {
            id: 2,
            title: "UX Designer",
            company: "Design Studio",
            location: "Istanbul, Turkey",
            jobType: "contract",
            salary: "$40/hour",
            description: "Looking for a creative UX designer...",
            requirements: "3+ years of experience\nPortfolio required",
            benefits: "Creative freedom\nInternational team",
            isRemote: false,
            deadline: "2023-11-30",
            status: "active"
          }
        ];

        const job = mockJobs.find(job => job.id === parseInt(jobId));
        if (!job) throw new Error('Job not found');
        
        setFormData(job);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    // Mock API call
    setTimeout(() => {
      console.log('Job updated:', formData);
      setSubmitStatus('success');
      setTimeout(() => navigate('/my-posted-jobs'), 1500);
    }, 1000);
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
          <Alert.Heading>Error loading job</Alert.Heading>
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
          <h2 className="mt-3">Edit Job Posting</h2>
          <p className="text-muted">Update your job listing details</p>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          {submitStatus === 'success' && (
            <Alert variant="success" className="text-center">
              Job updated successfully! Redirecting...
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Type *</Form.Label>
                  <Form.Select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location *</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={formData.isRemote}
                    required={!formData.isRemote}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary Range</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="This is a remote position"
                name="isRemote"
                checked={formData.isRemote}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Requirements *</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Benefits</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Application Deadline *</Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status *</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/my-posted-jobs')}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditJob;