import { useState } from 'react';
import API from '../api/axios';
import { Paperclip, Loader2 } from 'lucide-react';

const FileUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const { data } = await API.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUploadSuccess(data.url);
      alert('File uploaded successfully!');
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="flex items-center gap-2 cursor-pointer bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded transition w-fit">
        {uploading ? <Loader2 className="animate-spin" size={18} /> : <Paperclip size={18} />}
        <span className="text-sm">{uploading ? 'Uploading...' : 'Attach File'}</span>
        <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
      </label>
    </div>
  );
};

export default FileUpload;