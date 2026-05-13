import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import AboutAdmin from './About';
import WhyMeAdmin from './WhyMe';
import ToolsAdmin from './Tools';
import ProjectsAdmin from './Projects';
import ReviewsAdmin from './Reviews';
import ContactAdmin from './Contact';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-navy-950">
      <Sidebar />
      <main className="flex-1 ml-60 min-h-screen">
        <Routes>
          <Route index element={<Navigate to="about" replace />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="whyme" element={<WhyMeAdmin />} />
          <Route path="tools" element={<ToolsAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="reviews" element={<ReviewsAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
        </Routes>
      </main>
    </div>
  );
}
