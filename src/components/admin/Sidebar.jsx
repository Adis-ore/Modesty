import { NavLink, useNavigate } from 'react-router-dom';
import {
  User,
  Star,
  Wrench,
  Images,
  MessageSquare,
  Phone,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin/dashboard/about', label: 'About Me', icon: User },
  { to: '/admin/dashboard/whyme', label: 'Why Me', icon: Star },
  { to: '/admin/dashboard/tools', label: 'Tools', icon: Wrench },
  { to: '/admin/dashboard/projects', label: 'Projects', icon: Images },
  { to: '/admin/dashboard/reviews', label: 'Reviews', icon: MessageSquare },
  { to: '/admin/dashboard/contact', label: 'Contact', icon: Phone },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('admin_session');
    navigate('/admin');
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-navy-900/95 border-r border-violet-600/20 backdrop-blur-md flex flex-col z-40">
      <div className="p-6 border-b border-violet-600/20">
        <div className="flex items-center gap-2 mb-1">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <polygon points="11,2 20,19 2,19" fill="#7c3aed" />
          </svg>
          <span className="font-heading font-bold text-xs uppercase tracking-widest text-white leading-tight">
            Modesty Designs
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <LayoutDashboard size={12} className="text-violet-400" />
          <span className="text-violet-400 text-xs font-heading tracking-wider">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-violet-600/20 text-white border border-violet-500/30'
                  : 'text-violet-300 hover:text-white hover:bg-white/[0.04]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-violet-600/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-violet-300 hover:text-red-400 hover:bg-red-900/10 transition-all duration-200"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
