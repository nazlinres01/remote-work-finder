import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loginError, setLoginError] = useState(null);

  // validUsers dizisi içinde role bilgisini ekledim
  const validUsers = [
    { email: 'user1@example.com', password: 'password123', role: 'user' },
    { email: 'user2@example.com', password: 'mypassword', role: 'user' },
    { email: 'user3@example.com', password: 'secret456', role: 'user' },
    { email: 'admin@example.com', password: 'admin123', role: 'admin' }, // admin kullanıcı
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setLoginError(null); // Her input değişiminde önceki login hatasını temizle
    setErrors(prev => ({ ...prev, [name]: null })); // Input hata mesajını temizle
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email gerekli';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir email giriniz';
    if (!formData.password) newErrors.password = 'Şifre gerekli';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handleSubmit fonksiyonunda yönlendirmeyi role'a göre ayarladım
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitStatus('loading');

      setTimeout(() => {
        const userFound = validUsers.find(
          (user) =>
            user.email.toLowerCase() === formData.email.toLowerCase() &&
            user.password === formData.password
        );

        if (userFound) {
          setSubmitStatus('success');
          setLoginError(null);
          if (userFound.role === 'admin') {
            navigate('/admin'); // admin ise admin dashboard
          } else {
            navigate('/dashboard'); // normal kullanıcı dashboard
          }
        } else {
          setSubmitStatus(null);
          setLoginError('Email veya şifre yanlış');
        }
      }, 1500);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={8} lg={5} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              <h2 className="mb-4 text-center fw-bold text-primary">Giriş Yap</h2>

              {submitStatus === 'success' && (
                <Alert variant="success" className="text-center">
                  Giriş başarılı! Yönlendiriliyorsunuz...
                </Alert>
              )}

              {loginError && (
                <Alert variant="danger" className="text-center">
                  {loginError}
                </Alert>
              )}

              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Email Adresi</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    size="lg"
                    className="rounded-3"
                  />
                  <Form.Control.Feedback type="invalid" className="ps-3">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Şifrenizi girin"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    size="lg"
                    className="rounded-3"
                  />
                  <Form.Control.Feedback type="invalid" className="ps-3">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="shadow-sm"
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
                        Giriş yapılıyor...
                      </>
                    ) : (
                      'Giriş Yap'
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center mb-3">
                <p className="text-muted">
                  Hesabın yok mu?{' '}
                  <Link to="/signup" className="text-decoration-none fw-semibold text-primary">
                    Kayıt Ol
                  </Link>
                </p>
              </div>

              <div className="position-relative text-center mb-4">
                <hr className="border-secondary" />
                <span
                  className="position-absolute bg-white px-3 fs-6"
                  style={{ top: '-12px', left: '50%', transform: 'translateX(-50%)', color: '#6c757d' }}
                >
                  VEYA
                </span>
              </div>

              <div className="d-flex justify-content-center gap-4">
                <Button variant="outline-danger" className="rounded-circle shadow-sm" style={{ width: 50, height: 50 }}>
                  <i className="bi bi-google fs-4"></i>
                </Button>
                <Button variant="outline-primary" className="rounded-circle shadow-sm" style={{ width: 50, height: 50 }}>
                  <i className="bi bi-facebook fs-4"></i>
                </Button>
                <Button
                  variant="outline-info"
                  className="rounded-circle shadow-sm"
                  style={{ width: 50, height: 50, color: '#0A66C2', borderColor: '#0A66C2' }}
                >
                  <i className="bi bi-linkedin fs-4"></i>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
