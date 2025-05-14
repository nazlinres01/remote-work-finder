import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetail from "./pages/JobDetail";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetail />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
        <Route path="/my-applications" element={<MyApplications />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
