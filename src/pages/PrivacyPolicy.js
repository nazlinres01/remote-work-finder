import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivacyPolicy = () => {
  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Privacy Policy</h1>
          <p className="text-center text-muted">Last updated: October 25, 2023</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Card>
            <Card.Body>
              <section className="mb-5">
                <h2 className="mb-3">1. Introduction</h2>
                <p>
                  At RemoteWorkFinder ("we", "us", or "our"), we are committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our website and services.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">2. Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, email address, phone number, 
                    professional details, and other identifiers when you register an account.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you interact with our website, 
                    including IP address, browser type, pages visited, and time spent.
                  </li>
                  <li>
                    <strong>Job Application Data:</strong> CVs, cover letters, and other documents 
                    you submit when applying for jobs.
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">3. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul>
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis to improve our service</li>
                  <li>To monitor usage of our service</li>
                  <li>To detect and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">4. Data Sharing and Disclosure</h2>
                <p>
                  We may share your information with third parties in the following situations:
                </p>
                <ul>
                  <li>
                    <strong>Employers:</strong> When you apply for a job, your application materials 
                    will be shared with the relevant employer.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> We may employ third-party companies to 
                    facilitate our service, provide the service on our behalf, or assist in analyzing 
                    how our service is used.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose your information if required 
                    by law or in response to valid requests by public authorities.
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  personal data against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">6. Your Data Protection Rights</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul>
                  <li>The right to access, update, or delete your information</li>
                  <li>The right to rectification if your information is inaccurate</li>
                  <li>The right to object to our processing of your data</li>
                  <li>The right to request restriction of processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3">7. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "last updated" date.
                </p>
              </section>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;