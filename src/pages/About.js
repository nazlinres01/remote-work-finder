import React from 'react';
import { Container, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Founder & CEO",
      bio: "10+ years of experience in tech industry",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      role: "CTO",
      bio: "Expert in software architecture and development",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Mehmet Demir",
      role: "Head of Product",
      bio: "Passionate about creating user-friendly experiences",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4">About RemoteWorkFinder</h1>
          <p className="lead text-center">
            Connecting talented professionals with remote work opportunities worldwide
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={6} className="mb-4 mb-lg-0">
          <Card className="h-100">
            <Card.Body>
              <h2 className="mb-4">Our Mission</h2>
              <p>
                At RemoteWorkFinder, we believe that talent knows no boundaries. 
                Our mission is to break down geographical barriers in employment 
                by connecting skilled professionals with companies offering remote 
                work opportunities.
              </p>
              <p>
                Founded in 2020, we've helped thousands of professionals find 
                fulfilling remote positions and assisted companies in building 
                diverse, global teams.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100">
            <Card.Body>
              <h2 className="mb-4">Our Values</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Flexibility:</strong> We champion work-life balance through remote work
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Inclusivity:</strong> We create opportunities regardless of location
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Innovation:</strong> We continuously improve our platform
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Transparency:</strong> We maintain open communication
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Community:</strong> We build connections beyond job placements
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Body className="text-center">
              <h2 className="mb-4">By The Numbers</h2>
              <Row>
                <Col md={4} className="mb-4 mb-md-0">
                  <h3 className="text-primary">10,000+</h3>
                  <p>Remote jobs posted</p>
                </Col>
                <Col md={4} className="mb-4 mb-md-0">
                  <h3 className="text-primary">50,000+</h3>
                  <p>Professionals connected</p>
                </Col>
                <Col md={4}>
                  <h3 className="text-primary">100+</h3>
                  <p>Countries represented</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="text-center mb-4">Meet Our Team</h2>
          <Row>
            {teamMembers.map(member => (
              <Col key={member.id} md={4} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Image 
                      src={member.image} 
                      roundedCircle 
                      width={120}
                      height={120}
                      className="mb-3"
                    />
                    <h4>{member.name}</h4>
                    <p className="text-primary">{member.role}</p>
                    <p>{member.bio}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;