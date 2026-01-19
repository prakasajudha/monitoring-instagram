import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { GlobalDashboard } from './pages/GlobalDashboard';
import { UserDashboard } from './pages/UserDashboard';
import { Leaderboard } from './pages/Leaderboard';
import { UserDetail } from './pages/UserDetail';
import { CampaignInsights } from './pages/CampaignInsights';
import { CampaignDetail } from './pages/CampaignDetail';
import { BriefDetail } from './pages/BriefDetail';
import { Classes } from './pages/Classes';
import { ClassDetail } from './pages/ClassDetail';
import { UserManagement } from './pages/UserManagement';
import { PointSettings } from './pages/PointSettings';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/overview" replace />} />
            <Route
              path="overview"
              element={
                <ProtectedRoute requireAdmin>
                  <GlobalDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="per-personil" element={<UserDashboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route
              path="user/:userId"
              element={
                <ProtectedRoute requireAdmin>
                  <UserDetail />
                </ProtectedRoute>
              }
            />
            <Route path="campaign-insights" element={<CampaignInsights />} />
            <Route path="campaign/:campaignId" element={<CampaignDetail />} />
            <Route path="campaign/:campaignId/brief/:briefId" element={<BriefDetail />} />
            <Route path="classes" element={<Classes />} />
            <Route path="classes/:classId" element={<ClassDetail />} />
            <Route
              path="user-management"
              element={
                <ProtectedRoute requireAdmin>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="point-settings"
              element={
                <ProtectedRoute requireAdmin>
                  <PointSettings />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
