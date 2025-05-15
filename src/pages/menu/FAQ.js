import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top right corner. Choose whether you're a job seeker or employer, fill in your details, and verify your email address."
    },
    {
      id: 2,
      question: "Is there a fee to use RemoteWorkFinder?",
      answer: "No, creating an account and searching for jobs is completely free for job seekers. Employers may need to pay to post job listings depending on their subscription plan."
    },
    {
      id: 3,
      question: "How can I apply for a job?",
      answer: "When you find a job you're interested in, click the 'Apply Now' button. You'll need to upload your CV and may need to provide additional information requested by the employer."
    },
    {
      id: 4,
      question: "Can I apply for jobs outside my country?",
      answer: "Absolutely! RemoteWorkFinder specializes in remote positions that can often be performed from anywhere in the world. Check each job posting for any location-specific requirements."
    },
    {
      id: 5,
      question: "How do I post a job as an employer?",
      answer: "After creating an employer account, go to your dashboard and click 'Post a Job'. Fill in all the required details about the position and submit. Our team will review it before it goes live."
    },
    {
      id: 6,
      question: "What should I do if I forgot my password?",
      answer: "Click on 'Forgot Password' on the login page. Enter your email address, and we'll send you instructions to reset your password."
    },
    {
      id: 7,
      question: "How can I edit my profile information?",
      answer: "Go to your profile page and click the 'Edit Profile' button. Make your changes and remember to save them before leaving the page."
    }
  ];

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">Frequently Asked Questions</h1>
          <p className="text-center text-muted">
            Find answers to common questions about RemoteWorkFinder
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                {faqItems.map((item) => (
                  <Accordion.Item key={item.id} eventKey={item.id.toString()}>
                    <Accordion.Header>
                      <h5 className="mb-0">{item.question}</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{item.answer}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <h4 className="mb-3">Still have questions?</h4>
          <p className="mb-4">Can't find what you're looking for? Contact our support team for assistance.</p>
          <Button variant="primary" href="/contact">
            Contact Support
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;