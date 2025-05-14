import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow text-center py-4">
            <Card.Body>
              <ExclamationTriangle size={48} className="text-danger mb-3" />
              <h1>404 - Page Not Found</h1>
              <p className="lead mb-4">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button as={Link} to="/" variant="primary">
                  Go to Homepage
                </Button>
                <Button as={Link} to="/jobs" variant="outline-primary">
                  Browse Jobs
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;