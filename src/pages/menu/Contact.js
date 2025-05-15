import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaPaperPlane } from 'react-icons/fa';
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
    if (!formData.name.trim()) newErrors.name = 'İsim zorunludur';
    if (!formData.email.trim()) newErrors.email = 'Email zorunludur';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçersiz email';
    if (!formData.subject.trim()) newErrors.subject = 'Konu zorunludur';
    if (!formData.message.trim()) newErrors.message = 'Mesaj zorunludur';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitStatus('loading');

      setTimeout(() => {
        console.log('Form gönderildi:', formData);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);
    }
  };

  return (
    <Container className="my-5 py-4" style={{ maxWidth: '1200px' }}>
      <Row className="mb-5 justify-content-center">
        <Col md={10} lg={8} className="text-center">
          <h6 className="text-uppercase mb-3" style={{ color: '#6c63ff', letterSpacing: '2px' }}>İletişim</h6>
          <h1 className="display-5 fw-bold mb-4" style={{ color: '#2c3e50' }}>Bizimle <span style={{ color: '#6c63ff' }}>Bağlantı Kurun</span></h1>
          <div style={{
            height: '4px',
            width: '80px',
            backgroundColor: '#6c63ff',
            margin: '0 auto 24px',
            borderRadius: '2px'
          }}></div>
          <p className="fs-5 text-muted">
            Size nasıl yardımcı olabileceğimizi öğrenmek için mesajınızı bekliyoruz. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
        </Col>
      </Row>

      <Row className="g-4 justify-content-center">
        <Col lg={5} className="mb-4 mb-lg-0">
          <Card className="h-100 border-0 shadow-sm" style={{
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
          }}>
            <Card.Body className="p-4 p-lg-5">
              <h3 className="mb-4 fw-bold" style={{ 
                background: 'linear-gradient(90deg, #6c63ff, #4a42e6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                İletişim Bilgilerimiz
              </h3>
              <p className="text-muted mb-5">
                Aşağıdaki bilgileri kullanarak bizimle iletişime geçebilir veya sağdaki formu doldurarak doğrudan mesaj gönderebilirsiniz.
              </p>

              <div className="d-flex align-items-start mb-4">
                <div style={{
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  marginRight: '16px'
                }}>
                  <FiMail size={24} style={{ color: '#6c63ff' }} />
                </div>
                <div>
                  <h5 className="mb-1 fw-semibold">Email Adresimiz</h5>
                  <a href="mailto:info@remoteworkfinder.com" className="text-decoration-none" style={{ color: '#495057' }}>
                    info@remoteworkfinder.com
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div style={{
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  marginRight: '16px'
                }}>
                  <FiPhone size={24} style={{ color: '#6c63ff' }} />
                </div>
                <div>
                  <h5 className="mb-1 fw-semibold">Telefon Numaramız</h5>
                  <p className="mb-0" style={{ color: '#495057' }}>+90 212 123 4567</p>
                  <small className="text-muted">Pzt-Cuma, 09:00 - 18:00</small>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div style={{
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  marginRight: '16px'
                }}>
                  <FiMapPin size={24} style={{ color: '#6c63ff' }} />
                </div>
                <div>
                  <h5 className="mb-1 fw-semibold">Ofis Adresimiz</h5>
                  <p className="mb-0" style={{ color: '#495057' }}>Maslak, İstanbul</p>
                  <small className="text-muted">Türkiye</small>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="mb-3 fw-semibold" style={{ color: '#6c63ff' }}>Sosyal Medyada Takip Edin</h5>
              <div className="d-flex gap-3">
                {[
                  { icon: <FaTwitter size={20} />, color: '#1DA1F2' },
                  { icon: <FaLinkedin size={20} />, color: '#0077B5' },
                  { icon: <FaFacebook size={20} />, color: '#4267B2' },
                  { icon: <FaInstagram size={20} />, color: '#E1306C' }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="rounded-circle d-flex align-items-center justify-content-center" 
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(108, 99, 255, 0.1)',
                      color: social.color,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(108, 99, 255, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)'}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <Card.Body className="p-4 p-lg-5">
              {submitStatus === 'success' && (
                <Alert variant="success" className="text-center border-0" style={{ 
                  background: 'rgba(40, 167, 69, 0.1)',
                  color: '#28a745',
                  borderRadius: '12px'
                }}>
                  Mesajınız başarıyla gönderildi! En kısa zamanda dönüş yapacağız.
                </Alert>
              )}

              <h3 className="mb-4 fw-bold" style={{ color: '#2c3e50' }}>Mesaj Gönder</h3>

              <Form onSubmit={handleSubmit} noValidate>
                <Row className="mb-3">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Group controlId="name">
                      <Form.Label className="fw-semibold">İsim *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        placeholder="Adınız"
                        style={{
                          borderRadius: '12px',
                          padding: '12px 16px',
                          borderColor: '#dee2e6'
                        }}
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label className="fw-semibold">Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        placeholder="email@ornek.com"
                        style={{
                          borderRadius: '12px',
                          padding: '12px 16px',
                          borderColor: '#dee2e6'
                        }}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="subject">
                  <Form.Label className="fw-semibold">Konu *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    isInvalid={!!errors.subject}
                    placeholder="Mesaj konusu"
                    style={{
                      borderRadius: '12px',
                      padding: '12px 16px',
                      borderColor: '#dee2e6'
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="message">
                  <Form.Label className="fw-semibold">Mesaj *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                    placeholder="Mesajınızı buraya yazınız..."
                    style={{
                      borderRadius: '12px',
                      padding: '12px 16px',
                      borderColor: '#dee2e6'
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    style={{
                      borderRadius: '12px',
                      padding: '12px',
                      background: 'linear-gradient(90deg, #6c63ff, #4a42e6)',
                      border: 'none',
                      fontWeight: '600',
                      letterSpacing: '0.5px'
                    }}
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
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <FiSend className="me-2" />
                        Mesajı Gönder
                      </>
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