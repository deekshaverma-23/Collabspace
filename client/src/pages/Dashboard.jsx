import { useEffect, useState } from 'react';
import API from '../api/axios';
import Sidebar from '../components/Sidebar';
import KanbanBoard from '../components/KanbanBoard';
import Chat from '../components/chat'; // Fixed capitalization
import Analytics from './Analytics'; // Kept the pages folder version
import WorkspaceModal from '../components/WorkspaceModal';
import { Plus, Copy, Check } from 'lucide-react';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [activeView, setActiveView] = useState('board');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchWorkspaces = async () => {
    try {
      const { data } = await API.get('/workspaces/my-workspaces');
      setWorkspaces(data);
      if (data.length > 0 && !selectedWorkspace) {
        setSelectedWorkspace(data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch workspaces");
    }
  };

  useEffect(() => { fetchWorkspaces(); }, []);

  const copyInviteCode = () => {
    if (selectedWorkspace?.inviteCode) {
      navigator.clipboard.writeText(selectedWorkspace.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (workspaces.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">Welcome to CollabSpace!</h2>
          <p className="text-gray-400 mb-6">Create a workspace to start collaborating.</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition text-white">
            Create Workspace
          </button>
        </div>
      );
    }

    if (!selectedWorkspace) return null;

    switch (activeView) {
      case 'board': return <KanbanBoard workspaceId={selectedWorkspace.id} />;
      case 'chat': return <Chat workspaceId={selectedWorkspace.id} />;
      case 'analytics': return <Analytics workspaceId={selectedWorkspace.id} />;
      default: return <KanbanBoard workspaceId={selectedWorkspace.id} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden text-white">
      <Sidebar setActiveView={setActiveView} activeView={activeView} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 border-b border-gray-700 px-6 flex items-center justify-between min-h-[64px] h-16 w-full shadow-sm">
          <div className="flex items-center gap-4">
            {workspaces.length > 0 ? (
              <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <select 
                  className="bg-transparent text-white text-sm py-2 pl-3 pr-2 outline-none cursor-pointer hover:text-blue-400 transition-colors"
                  value={selectedWorkspace?.id || ''}
                  onChange={(e) => setSelectedWorkspace(workspaces.find(ws => ws.id === e.target.value))}
                >
                  {workspaces.map(ws => (
                    <option key={ws.id} value={ws.id} className="bg-gray-800 text-white">
                      {ws.name}
                    </option>
                  ))}
                </select>
                <div className="w-[1px] h-6 bg-gray-700"></div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-gray-800 transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                <Plus size={18} />
                <span>Create Workspace</span>
              </button>
            )}
          </div>
          
          {selectedWorkspace && (
            <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 pl-4 pr-2 py-1.5 rounded-full">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Invite Code</span>
                <span className="text-blue-400 font-mono font-bold text-sm bg-blue-400/10 px-2 py-0.5 rounded">
                  {selectedWorkspace.inviteCode}
                </span>
              </div>
              <div className="h-4 w-[1px] bg-gray-700 mx-1"></div>
              <button 
                onClick={copyInviteCode} 
                className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all group relative"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </main>

      <WorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRefresh={fetchWorkspaces} />
    </div>
  );
};

export default Dashboard;