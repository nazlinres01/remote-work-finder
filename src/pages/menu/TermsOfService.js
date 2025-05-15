import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TermsOfService = () => {
  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Terms of Service</h1>
          <p className="text-center text-muted">Last updated: October 25, 2023</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Card>
            <Card.Body>
              <section className="mb-5">
                <h2 className="mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the RemoteWorkFinder website and services, you agree to be bound 
                  by these Terms of Service. If you disagree with any part of the terms, you may not 
                  access the service.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">2. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide accurate and complete information. 
                  You are responsible for maintaining the confidentiality of your account credentials and 
                  for all activities that occur under your account.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">3. Job Postings and Applications</h2>
                <ul>
                  <li>
                    Employers are solely responsible for their job postings and the accuracy of the 
                    information provided.
                  </li>
                  <li>
                    Job seekers are responsible for the accuracy of their applications and materials.
                  </li>
                  <li>
                    We do not guarantee employment or specific results from using our service.
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">4. Prohibited Conduct</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use the service for any illegal purpose</li>
                  <li>Post false, misleading, or fraudulent information</li>
                  <li>Harass, discriminate, or harm other users</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use any automated means to access the service without permission</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">5. Intellectual Property</h2>
                <p>
                  The service and its original content, features, and functionality are owned by 
                  RemoteWorkFinder and are protected by international copyright, trademark, and other 
                  intellectual property laws.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">6. Termination</h2>
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, 
                  for any reason whatsoever, including without limitation if you breach these Terms.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">7. Limitation of Liability</h2>
                <p>
                  In no event shall RemoteWorkFinder, nor its directors, employees, partners, agents, 
                  suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of the service.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="mb-3">8. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Turkey, without 
                  regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="mb-3">9. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. We will provide notice 
                  of any changes by posting the new Terms on this page and updating the "last updated" date.
                </p>
              </section>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfService;