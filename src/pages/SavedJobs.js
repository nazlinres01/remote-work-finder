import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { featuredJobs } from "./HomePage";

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSavedJobIds = () => {
    try {
      const saved = localStorage.getItem("savedJobIds");
      if (!saved) return [];
      return JSON.parse(saved);
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchSavedJobs = () => {
      try {
        const savedJobIds = getSavedJobIds();
        const matchedJobs = featuredJobs.filter((job) =>
          savedJobIds.includes(job.id)
        );
        setSavedJobs(matchedJobs);
        setLoading(false);
      } catch (err) {
        setError("Failed to load saved jobs");
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemove = (jobId) => {
    const updatedSavedJobs = savedJobs.filter((job) => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);

    const savedJobIds = getSavedJobIds();
    const updatedIds = savedJobIds.filter((id) => id !== jobId);
    localStorage.setItem("savedJobIds", JSON.stringify(updatedIds));
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

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
        <Alert variant="danger">
          <Alert.Heading>Error loading saved jobs</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: "900px" }}>
      {/* Back Butonu */}
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </Button>

      <h1 className="mb-3">Saved Jobs</h1>
      <p className="text-muted mb-4">
        {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved
      </p>

      {savedJobs.length > 0 ? (
        <ListGroup variant="flush">
          {savedJobs.map((job) => (
            <ListGroup.Item
              key={job.id}
              className="py-3 px-3 mb-3 shadow-sm rounded"
              style={{ transition: "background-color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-1" style={{ fontWeight: "600" }}>
                    {job.title}
                  </h5>
                  <div className="mb-2 text-secondary" style={{ fontSize: "0.9rem" }}>
                    {job.company} • {job.location}
                  </div>
                  <div>
                    <Badge bg="info" className="me-2 text-uppercase" style={{ fontSize: "0.75rem" }}>
                      {job.type}
                    </Badge>
                    {job.isRemote && (
                      <Badge bg="success" className="text-uppercase" style={{ fontSize: "0.75rem" }}>
                        Remote
                      </Badge>
                    )}
                  </div>
                </Col>
                <Col
                  md={4}
                  className="text-md-end mt-3 mt-md-0 d-flex flex-column flex-md-row justify-content-md-end gap-2"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemove(job.id)}
                  >
                    Remove
                  </Button>
                  <div className="text-muted small mt-2 mt-md-0 align-self-center">
                    Saved recently
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card className="shadow-sm rounded">
          <Card.Body className="text-center py-5">
            <h4 className="text-muted mb-3">You haven't saved any jobs yet</h4>
            <p className="mb-4">Save interesting jobs to apply later</p>
            <Button variant="primary" onClick={() => navigate("/jobs")}>
              Browse Jobs
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default SavedJobs;
