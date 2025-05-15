import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CheckCircleFill } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Verified = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="shadow text-center py-4">
            <Card.Body>
              <CheckCircleFill size={48} className="text-success mb-3" />
              <h2>Email Verified Successfully!</h2>
              <p className="mb-4">
                Your email address has been confirmed. You can now access all features of your account.
              </p>
              <div className="d-grid gap-2">
                <Button 
                  variant="primary"
                  as={Link}
                  to="/login"
                >
                  Continue to Login
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Verified;