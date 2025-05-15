import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Tab,
  Tabs,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt, FaDollarSign, FaUsers, FaEye, FaClock } from "react-icons/fa";

import { featuredJobs } from "./HomePage"; // Import yolu kendi projenize göre ayarlayın

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const id = Number(jobId);
    const foundJob = featuredJobs.find((j) => j.id === id);

    if (!foundJob) {
      setError("Job not found");
      setLoading(false);
      return;
    }

    const detailedJob = {
      ...foundJob,
      type: "Full-time",
      postedDate: "2025-05-01",
      deadline: "2025-05-31",
      description: `We are looking for a talented ${foundJob.title} to join ${foundJob.company}. This is a remote position based in ${foundJob.location}.`,
      requirements: [
        "Relevant experience in the field",
        "Strong communication skills",
        "Ability to work independently",
      ],
      benefits: ["Flexible working hours", "Competitive salary", "Health insurance"],
      isRemote: foundJob.location.toLowerCase().includes("remote"),
      applicants: Math.floor(Math.random() * 50) + 1,
      views: Math.floor(Math.random() * 200) + 50,
    };

    setJob(detailedJob);
    setLoading(false);
  }, [jobId]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="shadow-sm">
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate("/jobs")}>
            Back to Jobs
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}
            className="fw-semibold"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            &larr; Back
          </Button>
        </Col>
      </Row>

      <Card
        className="mb-4 shadow-sm"
        style={{ borderRadius: "12px", border: "none" }}
      >
        <Card.Body>
          <Row>
            <Col md={8}>
              <h1 className="fw-bold" style={{ color: "#0d6efd" }}>
                {job.title}
              </h1>
              <h5 className="text-secondary mb-3">{job.company}</h5>

              <div className="d-flex align-items-center gap-2 mb-3">
                <Badge
                  bg="primary"
                  style={{ fontWeight: "600", fontSize: "0.9rem" }}
                  pill
                >
                  {job.type}
                </Badge>
                {job.isRemote && (
                  <Badge
                    bg="success"
                    style={{ fontWeight: "600", fontSize: "0.9rem" }}
                    pill
                  >
                    Remote
                  </Badge>
                )}
              </div>

              <p className="fs-5 d-flex align-items-center gap-2 text-muted">
                <FaMapMarkerAlt color="#0d6efd" /> <strong>Location:</strong>{" "}
                {job.location}
              </p>

              <p className="fs-5 d-flex align-items-center gap-2 text-muted">
                <FaDollarSign color="#0d6efd" /> <strong>Salary:</strong>{" "}
                {job.salary}
              </p>
            </Col>

            <Col
              md={4}
              className="d-flex flex-column justify-content-between"
              style={{ minHeight: "210px" }}
            >
              <div>
                <p className="text-muted d-flex align-items-center gap-2 mb-1">
                  <FaClock /> <small>Posted: {job.postedDate}</small>
                </p>
                <p className="text-muted d-flex align-items-center gap-2">
                  <FaClock /> <small>Deadline: {job.deadline}</small>
                </p>
              </div>

              <div className="d-grid gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="fw-semibold"
                  style={{
                    boxShadow: "0 4px 15px rgba(13, 110, 253, 0.4)",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(13, 110, 253, 0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(13, 110, 253, 0.4)")
                  }
                >
                  Apply Now
                </Button>

                <Button
                  variant="outline-secondary"
                  size="lg"
                  className="fw-semibold"
                  style={{ borderRadius: "8px" }}
                >
                  Save Job
                </Button>
              </div>

              <div className="mt-4 text-muted d-flex align-items-center justify-content-center gap-4 fs-6">
                <div className="d-flex align-items-center gap-1">
                  <FaUsers /> {job.applicants} applicants
                </div>
                <div className="d-flex align-items-center gap-1">
                  <FaEye /> {job.views} views
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        fill
        variant="pills"
        style={{ cursor: "pointer" }}
      >
        <Tab eventKey="description" title="Job Description">
          <Card className="mt-3 shadow-sm" style={{ borderRadius: "10px" }}>
            <Card.Body>
              <h4 className="fw-bold mb-3" style={{ color: "#0d6efd" }}>
                About the Job
              </h4>
              <p style={{ lineHeight: "1.7", fontSize: "1.05rem" }}>
                {job.description}
              </p>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="requirements" title="Requirements">
          <Card className="mt-3 shadow-sm" style={{ borderRadius: "10px" }}>
            <Card.Body>
              <h4 className="fw-bold mb-3" style={{ color: "#0d6efd" }}>
                Requirements
              </h4>
              <ul style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="benefits" title="Benefits">
          <Card className="mt-3 shadow-sm" style={{ borderRadius: "10px" }}>
            <Card.Body>
              <h4 className="fw-bold mb-3" style={{ color: "#0d6efd" }}>
                Benefits
              </h4>
              <ul style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                {job.benefits.map((ben, i) => (
                  <li key={i}>{ben}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <Row className="mt-5">
        <Col className="text-center">
          <Button
            variant="primary"
            size="lg"
            className="me-3 fw-semibold"
            style={{
              boxShadow: "0 4px 15px rgba(13, 110, 253, 0.5)",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              minWidth: "160px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(13, 110, 253, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(13, 110, 253, 0.5)")
            }
          >
            Apply Now
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            className="fw-semibold"
            style={{ borderRadius: "8px", minWidth: "160px" }}
          >
            Save for Later
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;
