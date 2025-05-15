import React from 'react';
import { Container, Row, Col, Card, Image, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiLinkedin, FiTwitter, FiGlobe, FiAward, FiUsers, FiMapPin } from 'react-icons/fi';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Kurucu & CEO",
      bio: "10+ yıl teknoloji sektöründe deneyim sahibi",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      role: "CTO",
      bio: "Yazılım mimarisi ve geliştirme uzmanı",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 3,
      name: "Mehmet Demir",
      role: "Ürün Müdürü",
      bio: "Kullanıcı dostu deneyimler yaratmaya tutkulu",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  const stats = [
    { icon: <FiAward size={32} />, value: "10.000+", label: "Yayınlanan iş ilanı" },
    { icon: <FiUsers size={32} />, value: "50.000+", label: "Profesyonel" },
    { icon: <FiMapPin size={32} />, value: "100+", label: "Ülke" }
  ];

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-5 bg-gradient-primary" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      }}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="text-white">
              <h1 className="display-4 fw-bold mb-4">Sınırları Kaldırıyoruz</h1>
              <p className="lead mb-4 opacity-75">
                RemoteWorkFinder olarak, dünyanın her yerinden yetenekli profesyonelleri uzaktan çalışma fırsatlarıyla buluşturuyoruz.
              </p>
              <Button variant="light" size="lg" className="rounded-pill px-4">
                Bize Katılın
              </Button>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Remote work" 
                className="img-fluid rounded-4 shadow-lg" 
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Values */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="bg-primary bg-opacity-10 p-4">
                  <h2 className="text-primary mb-4">Misyonumuz</h2>
                  <p className="text-dark fs-5 mb-4">
                    Yeteneğin sınır tanımadığına inanıyoruz. Coğrafi engelleri ortadan kaldırarak profesyonelleri uzaktan çalışma fırsatlarıyla buluşturuyoruz.
                  </p>
                  <p className="text-dark fs-5">
                    2020'den beri binlerce profesyonelin tatmin edici işler bulmasına ve şirketlerin küresel ekipler kurmasına yardımcı olduk.
                  </p>
                </div>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="p-4">
                  <h2 className="text-primary mb-4">Değerlerimiz</h2>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 py-3 d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <FiGlobe className="text-primary" size={20} />
                      </div>
                      <div>
                        <h5 className="mb-1">Esneklik</h5>
                        <p className="mb-0 text-muted">İş ve yaşam dengesini destekliyoruz</p>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 py-3 d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <FiUsers className="text-primary" size={20} />
                      </div>
                      <div>
                        <h5 className="mb-1">Kapsayıcılık</h5>
                        <p className="mb-0 text-muted">Lokasyona bakmaksızın fırsatlar yaratıyoruz</p>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 py-3 d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <FiAward className="text-primary" size={20} />
                      </div>
                      <div>
                        <h5 className="mb-1">Yenilikçilik</h5>
                        <p className="mb-0 text-muted">Platformumuzu sürekli geliştiriyoruz</p>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Global Etkimiz</h2>
              <p className="text-muted lead">Dünya çapında binlerce insanın hayatını değiştiriyoruz</p>
            </Col>
          </Row>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={4} key={index}>
                <Card className="border-0 shadow-sm rounded-4 h-100 py-4">
                  <Card.Body className="text-center">
                    <div className="text-primary mb-3">{stat.icon}</div>
                    <h3 className="display-5 fw-bold mb-2">{stat.value}</h3>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Ekibimizle Tanışın</h2>
              <p className="text-muted lead">Uzaktan çalışma devrimine öncülük ediyoruz</p>
            </Col>
          </Row>
          <Row className="g-4">
            {teamMembers.map(member => (
              <Col lg={4} md={6} key={member.id}>
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100">
                  <div className="bg-primary bg-opacity-10 p-4 text-center">
                    <Image
                      src={member.image}
                      roundedCircle
                      width={150}
                      height={150}
                      className="mb-3 border border-3 border-white shadow"
                      style={{ objectFit: 'cover' }}
                    />
                    <h4 className="fw-bold mb-1">{member.name}</h4>
                    <p className="text-primary fw-medium mb-3">{member.role}</p>
                    <p className="text-muted mb-4">{member.bio}</p>
                    <div className="d-flex justify-content-center gap-3">
                      <Button variant="outline-primary" size="sm" className="rounded-circle p-2">
                        <FiLinkedin />
                      </Button>
                      <Button variant="outline-primary" size="sm" className="rounded-circle p-2">
                        <FiTwitter />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-white">
        <Container className="py-4 text-center">
          <h2 className="display-5 fw-bold mb-4">Siz de uzaktan çalışma dünyasına katılın</h2>
          <p className="lead mb-4 opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
            İster profesyonel olarak iş arayın, ister şirketiniz için yetenek bulun, sizi bekliyoruz.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="light" size="lg" className="rounded-pill px-4">
              İş Ara
            </Button>
            <Button variant="outline-light" size="lg" className="rounded-pill px-4">
              İlan Ver
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;