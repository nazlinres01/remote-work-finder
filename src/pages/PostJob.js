import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: 'My Company', // Varsayılan olarak kullanıcının şirketi
    location: '',
    jobType: 'full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    isRemote: false,
    deadline: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.location.trim() && !formData.isRemote) newErrors.location = 'Location is required for non-remote jobs';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      
      // Mock API call
      setTimeout(() => {
        console.log('Job posted:', formData);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => navigate('/my-posted-jobs'), 2000);
      }, 1500);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-4">
                <h2>Post a New Job</h2>
                <p className="text-muted">Fill in the details to attract the best candidates</p>
              </div>

              {success && (
                <Alert variant="success" className="text-center">
                  Job posted successfully! Redirecting to your jobs...
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
                        placeholder="e.g. Senior React Developer"
                        isInvalid={!!errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Job Type *</Form.Label>
                      <Form.Select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="temporary">Temporary</option>
                      </Form.Select>
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
                        placeholder="e.g. $90,000 - $120,000"
                      />
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
                        placeholder="e.g. Istanbul, Turkey"
                        disabled={formData.isRemote}
                        isInvalid={!!errors.location}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.location}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Application Deadline *</Form.Label>
                      <Form.Control
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        isInvalid={!!errors.deadline}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.deadline}
                      </Form.Control.Feedback>
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
                    placeholder="Describe the responsibilities and duties of the position..."
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Requirements *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List the required skills, experience, and qualifications..."
                    isInvalid={!!errors.requirements}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.requirements}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Separate requirements with bullet points or new lines
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Benefits (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="List any benefits or perks you offer..."
                  />
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/my-posted-jobs')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Posting Job...
                      </>
                    ) : (
                      'Post Job'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostJob;