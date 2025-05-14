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
  Pagination
} from 'react-bootstrap';
import { 
  Person, 
  PersonCheck, 
  PersonX,
  ThreeDotsVertical,
  Search,
  Funnel,
  Plus,
  Briefcase
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock API call
        setTimeout(() => {
          const mockUsers = Array.from({ length: 35 }, (_, i) => ({
            id: i + 1,
            name: i % 2 === 0 ? `User ${i + 1}` : `Employer ${i + 1}`,
            email: i % 2 === 0 ? `user${i + 1}@example.com` : `employer${i + 1}@company.com`,
            type: i % 2 === 0 ? 'job_seeker' : 'employer',
            status: i % 5 === 0 ? 'pending' : 'active',
            lastActive: `${i % 30 + 1} days ago`,
            registered: `${i % 12 + 1} months ago`
          }));
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleStatusChange = (userId, newStatus) => {
    // In a real app, this would be an API call
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'suspended': return 'danger';
      default: return 'secondary';
    }
  };

  const getUserIcon = (type) => {
    return type === 'job_seeker' ? 
      <Person className="text-primary" /> : 
      <Briefcase className="text-warning" />;
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
          <Alert.Heading>Error loading users</Alert.Heading>
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
          <h1 className="mt-4">User Management</h1>
          <p className="text-muted">Manage all user accounts on the platform</p>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3 mb-4">
            <Col md={6}>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search users..."
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
                  <Dropdown.Item>All Users</Dropdown.Item>
                  <Dropdown.Item>Job Seekers</Dropdown.Item>
                  <Dropdown.Item>Employers</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Active</Dropdown.Item>
                  <Dropdown.Item>Pending</Dropdown.Item>
                  <Dropdown.Item>Suspended</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="primary">
                <Plus className="me-2" />
                Add User
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="me-2">
                            {getUserIcon(user.type)}
                          </div>
                          <div>
                            <div className="fw-bold">{user.name}</div>
                            <small className="text-muted">ID: {user.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td className="text-capitalize">
                        {user.type.replace('_', ' ')}
                      </td>
                      <td>
                        <Badge bg={getStatusBadge(user.status)} className="text-capitalize">
                          {user.status}
                        </Badge>
                      </td>
                      <td>{user.lastActive}</td>
                      <td>{user.registered}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="link" className="text-dark p-0">
                            <ThreeDotsVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>View Profile</Dropdown.Item>
                            <Dropdown.Item>Edit</Dropdown.Item>
                            {user.status === 'active' ? (
                              <Dropdown.Item 
                                className="text-danger"
                                onClick={() => handleStatusChange(user.id, 'suspended')}
                              >
                                Suspend
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item 
                                className="text-success"
                                onClick={() => handleStatusChange(user.id, 'active')}
                              >
                                Activate
                              </Dropdown.Item>
                            )}
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {filteredUsers.length > usersPerPage && (
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
    </Container>
  );
};

export default AdminUsers;