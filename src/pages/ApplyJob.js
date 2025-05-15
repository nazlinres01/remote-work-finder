import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { featuredJobs } from './HomePage';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cvFile: null
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const foundJob = featuredJobs.find(job => job.id.toString() === jobId);

    if (!foundJob) {
      setError('Job not found');
      setLoading(false);
      return;
    }

    setJob(foundJob);
    setLoading(false);
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      cvFile: e.target.files[0]
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.coverLetter.trim()) errors.coverLetter = 'Cover letter is required';
    if (!formData.cvFile) errors.cvFile = 'CV is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitStatus('submitting');

      setTimeout(() => {
        console.log('Form submitted:', {
          jobId,
          ...formData,
          fileName: formData.cvFile?.name
        });
        setSubmitStatus('success');
      }, 1500);
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

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2>Apply for: {job?.title}</h2>
              <h4 className="text-muted">{job?.company}</h4>
            </Card.Body>
          </Card>

          {submitStatus === 'success' ? (
            <Alert variant="success" className="text-center">
              <Alert.Heading>Application Submitted!</Alert.Heading>
              <p>Your application has been successfully submitted.</p>
              <Button 
                variant="success"
                onClick={() => {
                  navigate('/my-applications');
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    coverLetter: '',
                    cvFile: null
                  });
                }}
              >
                View My Applications
              </Button>
            </Alert>
          ) : (
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Cover Letter *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.coverLetter}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.coverLetter}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Explain why you're a good fit for this position
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Upload CV (PDF) *</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      isInvalid={!!validationErrors.cvFile}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.cvFile}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Max file size: 5MB
                    </Form.Text>
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                    >
                      {submitStatus === 'submitting' ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyJob;
