import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Pagination, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobsPage = () => {
  // Mock data: API'dan gelecek gerçek verilerin yerine örnek iş ilanları
  const allJobs = [
    { id: 1, title: "Frontend Developer (React)", company: "Tech Corp", location: "Remote", type: "Full-time", salary: "$70k - $90k", isRemote: true, postedDate: "2 days ago" },
    { id: 2, title: "UX Designer", company: "Design Studio", location: "Remote (Worldwide)", type: "Contract", salary: "$50/hour", isRemote: true, postedDate: "1 week ago" },
    { id: 3, title: "Backend Engineer", company: "Data Systems", location: "Hybrid (İstanbul)", type: "Full-time", salary: "₺90k - ₺120k", isRemote: false, postedDate: "3 days ago" },
    { id: 4, title: "Product Manager", company: "Global Apps", location: "Remote (EU)", type: "Full-time", salary: "$80k - $110k", isRemote: true, postedDate: "5 days ago" },
  ];

  // State'ler
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2; // Sayfa başına 2 ilan göster (test için)

  // Filtreleme fonksiyonu
  const filteredJobs = allJobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
      (jobTypeFilter === "" || job.type === jobTypeFilter) &&
      (!remoteOnly || job.isRemote)
    );
  });

  // Sayfalama
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <Container fluid className="p-0">
      {/* Arama ve Filtre Bölümü */}
      <div className="bg-light p-4 mb-4">
        <Container>
          <Form>
            <Row className="g-3">
              <Col md={5}>
                <Form.Control
                  type="text"
                  placeholder="Pozisyon, teknoloji veya şirket adı..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Lokasyon (Remote, İstanbul...)"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Select 
                  value={jobTypeFilter} 
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                >
                  <option value="">Tüm Türler</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button variant="primary" className="w-100">
                  Ara
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Sadece Remote İşler"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      {/* Sonuç Bilgisi */}
      <Container>
        <Row>
          <Col>
            <h5>
              <Badge bg="secondary" className="me-2">
                {filteredJobs.length}
              </Badge>
              iş bulundu
            </h5>
          </Col>
        </Row>
      </Container>

      {/* İş İlanları Listesi */}
      <Container className="my-4">
        <Row>
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <Col key={job.id} md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company} • {job.location}
                    </Card.Subtitle>
                    <Card.Text className="d-flex justify-content-between">
                      <span className="text-success">{job.salary}</span>
                      <span className="text-muted">{job.postedDate}</span>
                    </Card.Text>
                    <div>
                      <Badge bg="info" className="me-2">
                        {job.type}
                      </Badge>
                      {job.isRemote && (
                        <Badge bg="success">Remote</Badge>
                      )}
                    </div>
                    <Button variant="outline-primary" className="mt-3">
                      Detaylı Gör
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h4>😕 Aradığınız kriterlere uygun iş bulunamadı</h4>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setJobTypeFilter("");
                  setRemoteOnly(false);
                }}
              >
                Filtreleri Temizle
              </Button>
            </Col>
          )}
        </Row>
      </Container>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <Container className="d-flex justify-content-center my-4">
          <Pagination>
            <Pagination.Prev 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(currentPage - 1)} 
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(currentPage + 1)} 
            />
          </Pagination>
        </Container>
      )}
    </Container>
  );
};

export default JobsPage;