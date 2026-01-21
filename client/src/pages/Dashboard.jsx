import { useEffect, useState } from 'react';
import API from '../api/axios';
import WorkspaceModal from '../components/WorkspaceModal';
import { Plus } from 'lucide-react'; // From the icon library we installed

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWorkspaces = async () => {
    try {
      // Note: You'll need to create this GET route in your backend later
      // For now, let's assume it returns the user's workspaces
      const { data } = await API.get('/workspaces/my-workspaces');
      setWorkspaces(data);
    } catch (err) {
      console.error("Failed to fetch workspaces");
    }
  };

  useEffect(() => { fetchWorkspaces(); }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Workspaces</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus size={20} /> New Workspace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workspaces.map((ws) => (
          <div key={ws.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">{ws.name}</h3>
            <p className="text-sm text-gray-400">Code: <span className="font-mono text-blue-400">{ws.inviteCode}</span></p>
          </div>
        ))}
        {workspaces.length === 0 && <p className="text-gray-500">No workspaces yet. Create one to get started!</p>}
      </div>

      <WorkspaceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchWorkspaces} 
      />
    </div>
  );
};

export default Dashboard;