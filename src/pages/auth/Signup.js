import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('jobSeeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'İsim gerekli';
    if (!formData.email) newErrors.email = 'Email gerekli';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir email giriniz';
    if (!formData.password) newErrors.password = 'Şifre gerekli';
    else if (formData.password.length < 8) newErrors.password = 'Şifre en az 8 karakter olmalı';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Şifreler uyuşmuyor';
    if (userType === 'employer' && !formData.company) newErrors.company = 'Şirket adı gerekli';
    if (!termsAccepted) newErrors.terms = 'Kullanım koşullarını kabul etmelisiniz';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitStatus('loading');
      setTimeout(() => {
        console.log('Signup data:', { ...formData, userType });
        setSubmitStatus('success');
        navigate('/email-verification');
      }, 2000);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              <h2 className="mb-4 text-center fw-bold text-primary">Kayıt Ol</h2>
              <p className="text-center text-secondary mb-4">
                İş arayan veya işveren olarak katılın
              </p>

              <Tabs
                activeKey={userType}
                onSelect={(k) => setUserType(k)}
                className="mb-4 justify-content-center border-bottom-0"
                variant="pills"
                mountOnEnter
                unmountOnExit
              >
                <Tab eventKey="jobSeeker" title="İş Arayan" tabClassName="fw-semibold text-uppercase px-4 py-2" />
                <Tab eventKey="employer" title="İşveren" tabClassName="fw-semibold text-uppercase px-4 py-2" />
              </Tabs>

              {submitStatus === 'success' && (
                <Alert variant="success" className="text-center">
                  Kayıt başarılı! Lütfen e-postanızı kontrol edin.
                </Alert>
              )}

              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">İsim Soyisim</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    size="lg"
                    className="rounded-3"
                  />
                  <Form.Control.Feedback type="invalid" className="ps-3">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {userType === 'employer' && (
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Şirket Adı</Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      placeholder="Şirketinizin adı"
                      value={formData.company}
                      onChange={handleChange}
                      isInvalid={!!errors.company}
                      size="lg"
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid" className="ps-3">
                      {errors.company}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

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
                    placeholder="Şifreniz"
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

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Şifre Tekrar</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Şifrenizi tekrar girin"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    size="lg"
                    className="rounded-3"
                  />
                  <Form.Control.Feedback type="invalid" className="ps-3">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4 d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="terms"
                    label={
                      <>
                        <span>Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.</span>{' '}
                        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
                          Koşullar
                        </a>{' '}
                        ve{' '}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                          Gizlilik Politikası
                        </a>
                      </>
                    }
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                  />
                </Form.Group>

                <div className="d-grid mb-4">
                  <Button
                    variant="success"
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
                        Kayıt oluyor...
                      </>
                    ) : (
                      'Kayıt Ol'
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center">
                <p className="text-muted">
                  Zaten hesabınız var mı?{' '}
                  <Link to="/login" className="text-decoration-none fw-semibold text-success">
                    Giriş Yap
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
