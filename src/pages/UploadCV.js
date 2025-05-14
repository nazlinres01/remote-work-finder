import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadCV = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)) {
        setError('Only PDF, DOC, and DOCX files are allowed');
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);
    
    // Mock file upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSuccess('CV uploaded successfully!');
          setTimeout(() => navigate('/profile'), 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <h2>Upload Your CV</h2>
                <p className="text-muted">
                  Increase your chances by uploading an updated CV
                </p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Select CV File</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </Form.Text>
                </Form.Group>

                {file && (
                  <div className="mb-4">
                    <p>Selected file: {file.name}</p>
                    <p>File size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                )}

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <ProgressBar 
                    animated 
                    now={uploadProgress} 
                    label={`${uploadProgress}%`}
                    className="mb-4"
                  />
                )}

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={loading || !file}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Uploading...
                      </>
                    ) : (
                      'Upload CV'
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/profile')}
                  >
                    Back to Profile
                  </Button>
                </div>
              </Form>

              <div className="mt-4">
                <h5>CV Tips:</h5>
                <ul>
                  <li>Keep it concise (1-2 pages)</li>
                  <li>Highlight relevant skills and experience</li>
                  <li>Include measurable achievements</li>
                  <li>Update contact information</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadCV;