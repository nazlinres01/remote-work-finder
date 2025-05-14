import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Envelope, ArrowRepeat } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailVerification = () => {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    // Mock resend email function
    console.log('Resending verification email...');
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="text-center py-4">
              <Envelope size={48} className="text-primary mb-3" />
              <h2>Verify Your Email Address</h2>
              <p className="mb-4">
                We've sent a verification link to your email address. 
                Please check your inbox and click the link to verify your account.
              </p>

              {resent && (
                <Alert variant="success" className="mb-4">
                  Verification email resent successfully!
                </Alert>
              )}

              <div className="d-flex flex-column gap-2">
                <Button 
                  variant="outline-primary"
                  onClick={handleResend}
                >
                  <ArrowRepeat className="me-2" />
                  Resend Verification Email
                </Button>
                <Button 
                  variant="link"
                  href="https://mail.google.com"
                  target="_blank"
                >
                  Open Gmail
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailVerification;