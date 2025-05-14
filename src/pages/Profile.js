import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Tab, Tabs, Image, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+905551234567',
    location: 'İstanbul, Turkey',
    bio: 'Senior Frontend Developer with 5+ years of experience in React',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
    cvUrl: '/uploads/cv-ahmet-yilmaz.pdf'
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    }, 1500);
  };

  const handleRemoveCV = () => {
    setFormData(prev => ({ ...prev, cvUrl: '' }));
    // Gerçek uygulamada API çağrısı yapılır
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <Image 
                src="https://via.placeholder.com/150" 
                roundedCircle 
                width={150}
                height={150}
                className="mb-3"
              />
              <h4>{formData.name}</h4>
              <p className="text-muted">{formData.bio.split('.')[0]}</p>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => navigate('/upload-cv')}
              >
                {formData.cvUrl ? 'Update CV' : 'Upload CV'}
              </Button>
              {formData.cvUrl && (
                <div className="mt-2">
                  <a 
                    href={formData.cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <i className="bi bi-file-earmark-pdf me-1"></i>
                    View CV
                  </a>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-danger"
                    onClick={handleRemoveCV}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="mb-3">Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} bg="primary" pill>
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
              >
                <Tab eventKey="profile" title="Profile" />
                <Tab eventKey="settings" title="Account Settings" />
              </Tabs>

              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              {!editMode ? (
                <>
                  <div className="d-flex justify-content-end">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </Button>
                  </div>
                  <div className="mt-4">
                    <h5>Personal Information</h5>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Location:</strong> {formData.location}</p>
                    <p><strong>Bio:</strong> {formData.bio}</p>
                  </div>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Skills (comma separated)</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.skills.join(', ')}
                      onChange={handleSkillsChange}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => {
                        setEditMode(false);
                        setError(null);
                      }}
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
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;