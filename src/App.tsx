import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// We don't import BrowserRouter here because it's already in main.tsx

// Components
import { LoginScreen as Login } from "./auth/LoginPage";
import { Sidebar } from "./layouts/Sidebar";

// Context
import { AlertProvider } from "./Context/AlertContext";
import { AuthProvider, useAuth } from "./Context/AuthContext";

// Pages
import { Dashboard as DashboardPage } from "./pages/Dasboard";
import SettingPage from "./pages/Setting";
import { ReportsPage } from "./pages/Report";

import AppUsers from "./pages/AppUser/AppIndex";
import { FeedbacksPage as Feedbacks } from "./pages/Feedback";
import Staffs from "./pages/Staff/Staff";

// Roles
import AddRole from "./pages/RolePermission/AddRole";
import EditRole from "./pages/RolePermission/EditRole";
import RolesPermissions from "./pages/RolePermission/RolePermission";
import ViewRole from "./pages/RolePermission/ViewRole";
import { initialRoles, type Role } from "./pages/RolePermission/types";

// Beacon
import AddBeaconDevice from "./pages/Beacon/AddBeaconDevice";
import BeaconDevices from "./pages/Beacon/Beacon";
import EditBeaconDevice from "./pages/Beacon/EditBeaconDevice";
import ViewBeaconDevice from "./pages/Beacon/ViewBeaconDevice";

// GPS
import AddGpsDevice from "./pages/Gps/AddGpsDevice";
import EditGpsDevice from "./pages/Gps/EditGpsDevice";
import GpsDevices from "./pages/Gps/Gps";
import ViewGpsDevice from "./pages/Gps/ViewGpsDevice";

// Plans
import AddPlan from "./pages/Plan/AddPlan";
import EditPlan from "./pages/Plan/EditPlan";
import Plans from "./pages/Plan/Plan";
import ViewPlan from "./pages/Plan/ViewPlan";

// Organisations
import OrgCreatePage from "./pages/Organisation/OrgCreatePage";
import OfficeEditPage from "./pages/Organisation/OfficeEditPage";
import InstitutionEditPage from "./pages/Organisation/InstitutionEditPage";
import MDSEditPage from "./pages/Organisation/MDSEditPage";
import VendorEditPage from "./pages/Organisation/VendorEditPage";
import Organisations from "./pages/Organisation/OrgIndexPage";
import OrgShowPage from "./pages/Organisation/OrgShowPage";
import {
  initialOrganisations,
  type Organisation,
} from "./pages/Organisation/organisation.types";

// users
import EditUser from "./pages/AppUser/EditUser";
import ViewUser from "./pages/AppUser/ViewUser";

const ProtectedLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [organisations] = useState<Organisation[]>(initialOrganisations);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleAddRole = (newRole: Omit<Role, "id" | "createdAt">) => {
    const role: Role = {
      ...newRole,
      id: roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setRoles((prev) => [...prev, role]);
  };

  const handleEditRole = (
    id: number,
    updated: Omit<Role, "id" | "createdAt">,
  ) => {
    setRoles((prev) =>
      prev.map((role) => (role.id === id ? { ...role, ...updated } : role)),
    );
  };

  const handleDeleteRole = (id: number) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      {/* Sidebar */}
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`} style={{ flexShrink: 0, height: '100vh' }}>
        {/* Mapping the mocked user to the Sidebar's expected user prop */}
        <Sidebar
          onLogout={logout}
          user={{
            name: user?.name || 'Admin',
            email: user?.email || 'admin@vanloka.com',
            initials: user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'
          }}
        />
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Layout */}
      <div className="app-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100vh', minWidth: 0 }}>
        <div className="app-content" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', height: 0 }}>
          <Routes>
            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardPage onViewSessions={() => { }} />} />

            {/* Roles */}
            <Route
              path="/roles-permissions"
              element={
                <RolesPermissions roles={roles} onDelete={handleDeleteRole} />
              }
            />
            <Route
              path="/roles-permissions/add"
              element={<AddRole onAdd={handleAddRole} />}
            />
            <Route
              path="/roles-permissions/edit/:id"
              element={<EditRole roles={roles} onEdit={handleEditRole} />}
            />
            <Route
              path="/roles-permissions/view/:id"
              element={<ViewRole roles={roles} />}
            />

            {/* Beacon Devices */}
            <Route path="/masters/beacon-devices" element={<BeaconDevices />} />
            <Route
              path="/masters/beacon-devices/add"
              element={<AddBeaconDevice />}
            />
            <Route
              path="/masters/beacon-devices/edit/:id"
              element={<EditBeaconDevice />}
            />
            <Route
              path="/masters/beacon-devices/view/:id"
              element={<ViewBeaconDevice />}
            />

            {/* GPS Devices */}
            <Route path="/masters/gps-devices" element={<GpsDevices />} />
            <Route path="/masters/gps-devices/add" element={<AddGpsDevice />} />
            <Route
              path="/masters/gps-devices/edit/:id"
              element={<EditGpsDevice />}
            />
            <Route
              path="/masters/gps-devices/view/:id"
              element={<ViewGpsDevice />}
            />

            {/* Plans */}
            <Route path="/Plan" element={<Plans />} />
            <Route path="/Plan/add" element={<AddPlan />} />
            <Route path="/Plan/edit/:id" element={<EditPlan />} />
            <Route path="/Plan/:id" element={<ViewPlan />} />

            {/* Organisations */}
            <Route
              path="/Organisation"
              element={<Organisations />}
            />
            <Route path="/Organisation/create" element={<OrgCreatePage />} />
            <Route path="/Organisation/edit/office/:id" element={<OfficeEditPage />} />
            <Route path="/Organisation/edit/institution/:id" element={<InstitutionEditPage />} />
            <Route path="/Organisation/edit/mds/:id" element={<MDSEditPage />} />
            <Route path="/Organisation/edit/vendor/:id" element={<VendorEditPage />} />
            <Route
              path="/Organisation/view/:id"
              element={<OrgShowPage organisations={[]} onDelete={function (id: number): void {
                throw new Error("Function not implemented.");
              }} />}
            />

            {/* users */}
            <Route path="/app-users/view/:id" element={<ViewUser />} />
            <Route path="/app-users/edit/:id" element={<EditUser />} />

            {/* Other Pages */}
            <Route path="/Staff" element={<Staffs />} />
            <Route path="/app-users" element={<AppUsers />} />

            <Route path="/Feedback" element={<Feedbacks openModal={() => { }} />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLogin={(u: any) => {
              login({ email: u.email, password: 'password' });
            }} />
          )
        }
      />

      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
};

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
