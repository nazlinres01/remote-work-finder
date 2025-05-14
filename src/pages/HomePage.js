import React from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

const Home = () => {
  // Örnek iş ilanları (API'dan gelecek gerçek verilerin yerine mock data)
  const featuredJobs = [
    { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Remote", salary: "$70k - $90k" },
    { id: 2, title: "UX Designer", company: "Design Studio", location: "Remote", salary: "$60k - $80k" },
  ];

  return (
    <>
      {/* Navbar (Basit versiyon) */}
      <nav className="bg-light p-3 d-flex justify-content-between align-items-center">
        <h4 className="m-0 text-primary">RemoteWorkFinder</h4>
        <div>
          <Button variant="outline-primary" className="me-2">Giriş Yap</Button>
          <Button variant="primary">Kayıt Ol</Button>
        </div>
      </nav>

      {/* Hero Bölümü */}
      <Container fluid className="bg-primary text-white py-5 text-center">
        <h1>Hayalindeki Remote İşi Bul!</h1>
        <p className="lead">Dünyanın her yerinden çalışma fırsatları seni bekliyor.</p>
        
        {/* Arama Çubuğu */}
        <Form className="mt-4 mx-auto" style={{ maxWidth: '600px' }}>
          <Row>
            <Col md={8}>
              <Form.Control type="text" placeholder="Pozisyon, teknoloji veya şirket adı..." />
            </Col>
            <Col md={4}>
              <Button variant="warning" className="w-100">İş Ara</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Öne Çıkan İşler */}
      <Container className="my-5">
        <h2 className="mb-4">Öne Çıkan İşler</h2>
        <Row>
          {featuredJobs.map((job) => (
            <Col key={job.id} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                  <Card.Text>
                    📍 {job.location} | 💰 {job.salary}
                  </Card.Text>
                  <Button variant="outline-primary">Detay</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <h5>RemoteWorkFinder</h5>
              <p>© 2024 Tüm hakları saklıdır.</p>
            </Col>
            <Col md={4}>
              <h5>Hızlı Linkler</h5>
              <ul className="list-unstyled">
                <li><a href="/about" className="text-white">Hakkımızda</a></li>
                <li><a href="/contact" className="text-white">İletişim</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;