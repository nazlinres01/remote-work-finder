import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitStatus('loading');
      
      // Mock API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">Contact Us</h1>
          <p className="text-center text-muted">
            Have questions? We're here to help!
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={5} className="mb-4 mb-lg-0">
          <Card className="h-100">
            <Card.Body>
              <h3 className="mb-4">Get in Touch</h3>
              
              <div className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <Envelope size={24} />
                </div>
                <div>
                  <h5>Email</h5>
                  <p className="text-muted">info@remoteworkfinder.com</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <Telephone size={24} />
                </div>
                <div>
                  <h5>Phone</h5>
                  <p className="text-muted">+90 212 123 4567</p>
                  <p className="text-muted">Mon-Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3 text-primary">
                  <GeoAlt size={24} />
                </div>
                <div>
                  <h5>Headquarters</h5>
                  <p className="text-muted">Maslak, Istanbul</p>
                  <p className="text-muted">Turkey</p>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-twitter"></i>
                </Button>
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-linkedin"></i>
                </Button>
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-facebook"></i>
                </Button>
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-instagram"></i>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card>
            <Card.Body>
              {submitStatus === 'success' && (
                <Alert variant="success" className="text-center">
                  Your message has been sent successfully! We'll get back to you soon.
                </Alert>
              )}

              <h3 className="mb-4">Send Us a Message</h3>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Subject *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
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
                        Sending...
                      </>
                    ) : (
                      'Send Message'
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

export default Contact;