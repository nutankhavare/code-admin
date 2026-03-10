import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Building2,
    ShieldCheck,
    Database,
    Radio,
    MapPin,
    CreditCard,
    Users,
    Smartphone,
    MessageSquare,
    BarChart2,
    Settings2,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';
import type { UserInfo } from '../types';

type NavChild = { label: string; path: string; icon: React.ReactNode };
type NavItem = {
    label: string;
    path: string;
    icon: React.ReactNode;
    children?: NavChild[];
};

const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={16} /> },
    { label: 'Organisation Mgmt', path: '/Organisation', icon: <Building2 size={16} /> },
    { label: 'Roles & Permissions', path: '/roles-permissions', icon: <ShieldCheck size={16} /> },
    {
        label: 'Masters',
        path: '/masters',
        icon: <Database size={16} />,
        children: [
            { label: 'Beacon Devices', path: '/masters/beacon-devices', icon: <Radio size={16} /> },
            { label: 'GPS Devices', path: '/masters/gps-devices', icon: <MapPin size={16} /> },
        ],
    },
    { label: 'Plan Management', path: '/Plan', icon: <CreditCard size={16} /> },
    { label: 'Staff Management', path: '/Staff', icon: <Users size={16} /> },
    { label: 'Supplier Management', path: '/dashboard', icon: <Users size={16} /> },
    { label: 'App Users', path: '/app-users', icon: <Smartphone size={16} /> },
    { label: 'Feedbacks', path: '/Feedback', icon: <MessageSquare size={16} /> },
    { label: 'Reports', path: '/reports', icon: <BarChart2 size={16} /> },
    { label: 'Settings', path: '/settings', icon: <Settings2 size={16} /> },
];

interface Props {
    onLogout: () => void;
    user: UserInfo;
}

export const Sidebar = ({ onLogout, user }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Auto-open Masters if currently on a child route
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        navItems.forEach((item) => {
            if (item.children?.some((c) => pathname.startsWith(c.path))) {
                init[item.path] = true;
            }
        });
        return init;
    });

    const toggleGroup = (path: string) => {
        setOpenGroups((prev) => ({ ...prev, [path]: !prev[path] }));
    };

    const isChildActive = (item: NavItem) =>
        item.children?.some((c) => pathname.startsWith(c.path)) ?? false;

    return (
        <aside className="sidebar">
            {/* ── Brand ── */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-inner">
                    <div className="brand-icon">
                        <span className="material-symbols-outlined ms">local_shipping</span>
                    </div>
                    <div>
                        <div className="brand-name">VANLOKA</div>
                        <div className="brand-sub">Admin Panel</div>
                    </div>
                </div>
            </div>

            <div className="sidebar-divider" />

            {/* ── Nav ── */}
            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isOpen = openGroups[item.path] ?? false;
                    const childActive = isChildActive(item);
                    const isActive =
                        !hasChildren &&
                        (pathname === item.path ||
                            (item.path !== '/dashboard' && pathname.startsWith(item.path)));

                    return (
                        <div key={item.path + item.label}>
                            {/* Parent row */}
                            <div
                                className={`nav-item ${isActive || (hasChildren && childActive && !isOpen) ? 'active' : ''}`}
                                onClick={() => {
                                    if (hasChildren) {
                                        toggleGroup(item.path);
                                    } else {
                                        navigate(item.path);
                                    }
                                }}
                                style={{ justifyContent: 'space-between' }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                                    <span className="nav-icon">{item.icon}</span>
                                    {item.label}
                                </span>
                                {hasChildren && (
                                    <span style={{ color: 'inherit', opacity: 0.7, flexShrink: 0 }}>
                                        {isOpen ? (
                                            <ChevronDown size={14} />
                                        ) : (
                                            <ChevronRight size={14} />
                                        )}
                                    </span>
                                )}
                            </div>

                            {/* Sub-items */}
                            {hasChildren && isOpen && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        marginTop: 2,
                                    }}
                                >
                                    {item.children!.map((child) => {
                                        const isChildItemActive = pathname.startsWith(child.path);
                                        return (
                                            <div
                                                key={child.path}
                                                className={`nav-item ${isChildItemActive ? 'active' : ''}`}
                                                onClick={() => navigate(child.path)}
                                                style={{ paddingLeft: 36, fontSize: 11 }}
                                            >
                                                <span className="nav-icon">{child.icon}</span>
                                                {child.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* ── User / Logout ── */}
            <div className="sidebar-user">
                <div className="user-row" onClick={onLogout} title="Logout">
                    <div
                        className="avi"
                        style={{
                            background: '#EDE9FE',
                            color: 'var(--primary)',
                            flexShrink: 0,
                        }}
                    >
                        {user.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                            style={{
                                fontSize: 12,
                                fontWeight: 800,
                                color: 'var(--text)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {user.name}
                        </div>
                        <div
                            style={{
                                fontSize: 10,
                                color: 'var(--muted)',
                                fontWeight: 600,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {user.email}
                        </div>
                    </div>
                    <span
                        className="material-symbols-outlined ms"
                        style={{ fontSize: 17, color: 'var(--muted)', flexShrink: 0 }}
                    >
                        logout
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
