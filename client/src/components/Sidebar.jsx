import { LayoutDashboard, MessageSquare, Kanban, BarChart2, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveView, activeView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { id: 'board', name: 'Kanban Board', icon: <Kanban size={20} /> },
    { id: 'chat', name: 'Live Chat', icon: <MessageSquare size={20} /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg"><LayoutDashboard size={20}/></div>
          <span className="text-xl font-bold tracking-tight text-white">CollabSpace</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeView === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-700">
        <div className="mb-4 px-2">
          <p className="text-xs text-gray-500 uppercase font-bold">User</p>
          <p className="text-sm font-medium text-gray-200 truncate">{user?.username || 'Member'}</p>
        </div>
        <button 
          onClick={() => { dispatch(logout()); navigate('/login'); }}
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;