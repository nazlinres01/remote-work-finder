import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

const Home = () => {
  // Örnek iş ilanları (API'dan gelecek gerçek verilerin yerine mock data)
  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      salary: "$70k - $90k",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      salary: "$60k - $80k",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "CodeWorks",
      location: "Remote",
      salary: "$80k - $100k",
    },
    {
      id: 4,
      title: "Full Stack Engineer",
      company: "InnovateX",
      location: "Remote",
      salary: "$90k - $110k",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloudify",
      location: "Remote",
      salary: "$85k - $105k",
    },
    {
      id: 6,
      title: "Data Analyst",
      company: "DataWave",
      location: "Remote",
      salary: "$65k - $85k",
    },
    {
      id: 7,
      title: "Product Manager",
      company: "Prodigy",
      location: "Remote",
      salary: "$100k - $120k",
    },
    {
      id: 8,
      title: "QA Tester",
      company: "BugSquashers",
      location: "Remote",
      salary: "$55k - $75k",
    },
    {
      id: 9,
      title: "Mobile Developer",
      company: "AppFusion",
      location: "Remote",
      salary: "$75k - $95k",
    },
    {
      id: 10,
      title: "Security Analyst",
      company: "SafeNet",
      location: "Remote",
      salary: "$85k - $110k",
    },
    {
      id: 11,
      title: "Marketing Specialist",
      company: "Brandify",
      location: "Remote",
      salary: "$60k - $80k",
    },
    {
      id: 12,
      title: "Graphic Designer",
      company: "PixelArt",
      location: "Remote",
      salary: "$50k - $70k",
    },
    {
      id: 13,
      title: "SEO Expert",
      company: "RankBoost",
      location: "Remote",
      salary: "$55k - $75k",
    },
    {
      id: 14,
      title: "Content Writer",
      company: "WriteWell",
      location: "Remote",
      salary: "$45k - $65k",
    },
    {
      id: 15,
      title: "Data Scientist",
      company: "Insight AI",
      location: "Remote",
      salary: "$95k - $125k",
    },
    {
      id: 16,
      title: "Cloud Architect",
      company: "SkyNet",
      location: "Remote",
      salary: "$110k - $140k",
    },
    {
      id: 17,
      title: "Systems Administrator",
      company: "InfraWorks",
      location: "Remote",
      salary: "$70k - $90k",
    },
    {
      id: 18,
      title: "HR Manager",
      company: "PeopleFirst",
      location: "Remote",
      salary: "$80k - $100k",
    },
    {
      id: 19,
      title: "Technical Support",
      company: "HelpDesk+",
      location: "Remote",
      salary: "$40k - $60k",
    },
    {
      id: 20,
      title: "Machine Learning Engineer",
      company: "ML Dynamics",
      location: "Remote",
      salary: "$100k - $130k",
    },
    {
      id: 21,
      title: "AI Researcher",
      company: "NeuroNet",
      location: "Remote",
      salary: "$120k - $150k",
    },
    {
      id: 22,
      title: "Blockchain Developer",
      company: "CryptoWorks",
      location: "Remote",
      salary: "$110k - $140k",
    },
    {
      id: 23,
      title: "Game Developer",
      company: "GameVerse",
      location: "Remote",
      salary: "$70k - $100k",
    },
    {
      id: 24,
      title: "Database Administrator",
      company: "DBSecure",
      location: "Remote",
      salary: "$80k - $100k",
    },
    {
      id: 25,
      title: "Network Engineer",
      company: "NetFix",
      location: "Remote",
      salary: "$75k - $95k",
    },
    {
      id: 26,
      title: "Business Analyst",
      company: "BizFlow",
      location: "Remote",
      salary: "$85k - $105k",
    },
    {
      id: 27,
      title: "Project Manager",
      company: "ManageIT",
      location: "Remote",
      salary: "$90k - $110k",
    },
    {
      id: 28,
      title: "Technical Writer",
      company: "DocuTech",
      location: "Remote",
      salary: "$55k - $75k",
    },
    {
      id: 29,
      title: "Social Media Manager",
      company: "ClickWave",
      location: "Remote",
      salary: "$50k - $70k",
    },
    {
      id: 30,
      title: "UI Designer",
      company: "FlowUX",
      location: "Remote",
      salary: "$60k - $80k",
    },
    {
      id: 31,
      title: "Scrum Master",
      company: "AgileHub",
      location: "Remote",
      salary: "$85k - $105k",
    },
    {
      id: 32,
      title: "Finance Analyst",
      company: "MoneyMatters",
      location: "Remote",
      salary: "$70k - $90k",
    },
    {
      id: 33,
      title: "Operations Manager",
      company: "OpsLogic",
      location: "Remote",
      salary: "$95k - $115k",
    },
    {
      id: 34,
      title: "Compliance Officer",
      company: "LegalEase",
      location: "Remote",
      salary: "$90k - $110k",
    },
    {
      id: 35,
      title: "Video Editor",
      company: "CutPro",
      location: "Remote",
      salary: "$50k - $70k",
    },
    {
      id: 36,
      title: "Customer Success Manager",
      company: "ClientHero",
      location: "Remote",
      salary: "$75k - $95k",
    },
    {
      id: 37,
      title: "Email Marketing Specialist",
      company: "InboxBoost",
      location: "Remote",
      salary: "$55k - $75k",
    },
    {
      id: 38,
      title: "Solutions Architect",
      company: "DesignOps",
      location: "Remote",
      salary: "$100k - $130k",
    },
    {
      id: 39,
      title: "Technical Recruiter",
      company: "TalentSource",
      location: "Remote",
      salary: "$60k - $80k",
    },
    {
      id: 40,
      title: "Sales Manager",
      company: "SellWell",
      location: "Remote",
      salary: "$90k - $110k",
    },
    {
      id: 41,
      title: "ETL Developer",
      company: "DataExtract",
      location: "Remote",
      salary: "$85k - $105k",
    },
    {
      id: 42,
      title: "No-Code Developer",
      company: "QuickBuild",
      location: "Remote",
      salary: "$70k - $90k",
    },
    {
      id: 43,
      title: "Animation Designer",
      company: "MotionPixel",
      location: "Remote",
      salary: "$60k - $80k",
    },
    {
      id: 44,
      title: "Accessibility Specialist",
      company: "InclusiveTech",
      location: "Remote",
      salary: "$75k - $95k",
    },
    {
      id: 45,
      title: "Legal Counsel",
      company: "LawBridge",
      location: "Remote",
      salary: "$110k - $140k",
    },
    {
      id: 46,
      title: "Economist",
      company: "EcoThink",
      location: "Remote",
      salary: "$95k - $120k",
    },
    {
      id: 47,
      title: "RPA Developer",
      company: "BotStream",
      location: "Remote",
      salary: "$85k - $110k",
    },
    {
      id: 48,
      title: "CRM Specialist",
      company: "Client360",
      location: "Remote",
      salary: "$65k - $85k",
    },
    {
      id: 49,
      title: "Localization Manager",
      company: "GlobalReach",
      location: "Remote",
      salary: "$70k - $90k",
    },
    {
      id: 50,
      title: "Voice UI Designer",
      company: "SpeakFlow",
      location: "Remote",
      salary: "$80k - $100k",
    },
  ];

  return (
    <>
      {/* Navbar (Basit versiyon) */}
      <nav className="bg-light p-3 d-flex justify-content-between align-items-center">
        <h4 className="m-0 text-primary">RemoteWorkFinder</h4>
        <div>
          <Button variant="outline-primary" className="me-2">
            Giriş Yap
          </Button>
          <Button variant="primary">Kayıt Ol</Button>
        </div>
      </nav>

      {/* Hero Bölümü */}
      <Container fluid className="bg-primary text-white py-5 text-center">
        <h1>Hayalindeki Remote İşi Bul!</h1>
        <p className="lead">
          Dünyanın her yerinden çalışma fırsatları seni bekliyor.
        </p>

        {/* Arama Çubuğu */}
        <Form className="mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <Row>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Pozisyon, teknoloji veya şirket adı..."
              />
            </Col>
            <Col md={4}>
              <Button variant="warning" className="w-100">
                İş Ara
              </Button>
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
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company}
                  </Card.Subtitle>
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

      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={4} className="mb-3">
              <h5>RemoteWorkFinder</h5>
              <p>Uzaktan iş bulmanın en kolay yolu.</p>
              <p>© 2025 Tüm hakları saklıdır.</p>
            </Col>
            <Col md={4} className="mb-3">
              <h5>Site Haritası</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/about" className="text-white">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-white">
                    İletişim
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-white">
                    SSS
                  </a>
                </li>
                <li>
                  <a href="/notifications" className="text-white">
                    Bildirimler
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4} className="mb-3">
              <h5>Yasal</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/privacy-policy" className="text-white">
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a href="/terms-of-service" className="text-white">
                    Kullanım Şartları
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;
