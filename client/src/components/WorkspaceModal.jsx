import { useState } from 'react';
import API from '../api/axios';

const WorkspaceModal = ({ isOpen, onClose, onRefresh }) => {
  const [tab, setTab] = useState('create'); // 'create' or 'join'
  const [name, setName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const handleAction = async (e) => {
    e.preventDefault();
    try {
      if (tab === 'create') {
        await API.post('/workspaces/create', { name });
      } else {
        await API.post('/workspaces/join', { inviteCode });
      }
      onRefresh(); // Refresh the list of workspaces
      onClose(); // Close modal
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md border border-gray-700">
        <div className="flex mb-6 border-b border-gray-700">
          <button 
            className={`flex-1 pb-2 ${tab === 'create' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
            onClick={() => setTab('create')}
          >
            Create
          </button>
          <button 
            className={`flex-1 pb-2 ${tab === 'join' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
            onClick={() => setTab('join')}
          >
            Join
          </button>
        </div>

        <form onSubmit={handleAction}>
          {tab === 'create' ? (
            <input 
              type="text" placeholder="Workspace Name" required
              className="w-full p-2 mb-4 bg-gray-700 rounded border border-gray-600 outline-none focus:border-blue-500 text-white"
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <input 
              type="text" placeholder="Invite Code (e.g. 1A2B3C)" required
              className="w-full p-2 mb-4 bg-gray-700 rounded border border-gray-600 outline-none focus:border-blue-500 text-white"
              onChange={(e) => setInviteCode(e.target.value)}
            />
          )}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-600 p-2 rounded text-white">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-600 p-2 rounded text-white font-bold">
              {tab === 'create' ? 'Create' : 'Join'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceModal;