import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SkillsPage from "./pages/SkillsPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SkillsPage from './pages/SkillsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/skills" element={<SkillsPage />} />
            <Route path="/about" element={<AboutPage />} />
<Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;