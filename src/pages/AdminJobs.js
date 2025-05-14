import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Form, 
  Button, 
  Spinner, 
  Alert,
  Dropdown,
  Badge,
  Pagination,
  Modal
} from 'react-bootstrap';
import { 
  Briefcase, 
  Search,
  Funnel,
  ThreeDotsVertical,
  Eye,
  Pencil,
  Trash,
  CheckCircle,
  XCircle
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Mock API call
        setTimeout(() => {
          const mockJobs = Array.from({ length: 45 }, (_, i) => ({
            id: i + 1,
            title: `Job ${i + 1}`,
            company: `Company ${(i % 5) + 1}`,
            type: ['Full-time', 'Part-time', 'Contract', 'Internship'][i % 4],
            location: i % 3 === 0 ? 'Remote' : `City ${(i % 10) + 1}`,
            status: i % 6 === 0 ? 'pending' : 'active',
            posted: `${i % 30 + 1} days ago`,
            applications: i % 10,
            employer: `employer${i + 1}@company.com`
          }));
          setJobs(mockJobs);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.employer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleStatusChange = (jobId, newStatus) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const handleDeleteJob = () => {
    if (selectedJob) {
      setJobs(prev => prev.filter(job => job.id !== selectedJob.id));
      setShowDeleteModal(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'expired': return 'secondary';
      case 'rejected': return 'danger';
      default: return 'primary';
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
          <Alert.Heading>Error loading jobs</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="px-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mt-4">Job Listings Management</h1>
          <p className="text-muted">Manage all job postings on the platform</p>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3 mb-4">
            <Col md={6}>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-md-end gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  <Funnel className="me-2" />
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Jobs</Dropdown.Item>
                  <Dropdown.Item>Active</Dropdown.Item>
                  <Dropdown.Item>Pending</Dropdown.Item>
                  <Dropdown.Item>Expired</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Full-time</Dropdown.Item>
                  <Dropdown.Item>Part-time</Dropdown.Item>
                  <Dropdown.Item>Remote</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.length > 0 ? (
                  currentJobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.type}</td>
                      <td>{job.location}</td>
                      <td>
                        <Badge bg={getStatusBadge(job.status)} className="text-capitalize">
                          {job.status}
                        </Badge>
                      </td>
                      <td>{job.applications}</td>
                      <td>{job.posted}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="link" className="text-dark p-0">
                            <ThreeDotsVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Eye className="me-2" /> View
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Pencil className="me-2" /> Edit
                            </Dropdown.Item>
                            {job.status === 'pending' && (
                              <>
                                <Dropdown.Item 
                                  onClick={() => handleStatusChange(job.id, 'active')}
                                >
                                  <CheckCircle className="me-2 text-success" /> Approve
                                </Dropdown.Item>
                                <Dropdown.Item 
                                  onClick={() => handleStatusChange(job.id, 'rejected')}
                                >
                                  <XCircle className="me-2 text-danger" /> Reject
                                </Dropdown.Item>
                              </>
                            )}
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              className="text-danger"
                              onClick={() => {
                                setSelectedJob(job);
                                setShowDeleteModal(true);
                              }}
                            >
                              <Trash className="me-2" /> Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No jobs found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {filteredJobs.length > jobsPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(currentPage - 1)} 
                />
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                {totalPages > 5 && <Pagination.Ellipsis />}
                <Pagination.Next 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(currentPage + 1)} 
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the job "{selectedJob?.title}" at {selectedJob?.company}?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteJob}>
            Delete Job
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminJobs;