import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - API'dan gelecek gerçek verilerin yerine
  const mockNotifications = [
    {
      id: 1,
      title: "New application received",
      message: "Ahmet Yılmaz applied to your Senior React Developer position",
      date: "2023-10-20 14:30",
      isRead: false,
      type: "application"
    },
    {
      id: 2,
      title: "Application status updated",
      message: "Your application for UX Designer at Design Studio has been reviewed",
      date: "2023-10-19 09:15",
      isRead: true,
      type: "status"
    },
    {
      id: 3,
      title: "New message",
      message: "You have a new message from Tech Corp HR",
      date: "2023-10-18 16:45",
      isRead: false,
      type: "message"
    },
    {
      id: 4,
      title: "Job recommendation",
      message: "Based on your profile, we recommend the Backend Developer position at Data Systems",
      date: "2023-10-17 11:20",
      isRead: true,
      type: "recommendation"
    }
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Gerçek uygulamada API çağrısı yapılır
        setTimeout(() => {
          setNotifications(mockNotifications);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    // Gerçek uygulamada API çağrısı yapılır
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    // Gerçek uygulamada API çağrısı yapılır
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    // Gerçek uygulamada API çağrısı yapılır
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getBadgeVariant = (type) => {
    switch(type) {
      case 'application': return 'primary';
      case 'status': return 'info';
      case 'message': return 'warning';
      case 'recommendation': return 'success';
      default: return 'secondary';
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
          <Alert.Heading>Error loading notifications</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>Notifications</h1>
              <p className="text-muted">Your recent activities and updates</p>
            </div>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={markAllAsRead}
              disabled={notifications.every(n => n.isRead)}
            >
              Mark all as read
            </Button>
          </div>
        </Col>
      </Row>

      <Card>
        <ListGroup variant="flush">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <ListGroup.Item 
                key={notification.id}
                className={`py-3 ${!notification.isRead ? 'bg-light' : ''}`}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="me-3">
                    <div className="d-flex align-items-center mb-1">
                      <h5 className="mb-0 me-2">{notification.title}</h5>
                      <Badge bg={getBadgeVariant(notification.type)} className="text-capitalize">
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="mb-1">{notification.message}</p>
                    <small className="text-muted">{notification.date}</small>
                  </div>
                  <div className="d-flex gap-2">
                    {!notification.isRead && (
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center py-5">
              <h4 className="text-muted">No notifications yet</h4>
              <p>When you have new notifications, they'll appear here</p>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Notifications;