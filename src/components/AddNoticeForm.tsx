import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useNotices } from '../context/NoticesContext';

interface AddNoticeFormProps {
  editingNoticeId: number | null;
  onClose: () => void;
}

export default function AddNoticeForm({ editingNoticeId, onClose }: AddNoticeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { addNotice, notices, updateNotice } = useNotices();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Announcements',
    description: '',
  });

  useEffect(() => {
    if (editingNoticeId) {
      const notice = notices.find(n => n.id === editingNoticeId);
      if (notice) {
        setFormData({
          title: notice.title,
          category: notice.category,
          description: notice.description,
        });
        setIsOpen(true);
      }
    }
  }, [editingNoticeId, notices]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNoticeId) {
      updateNotice(editingNoticeId, formData);
    } else {
      addNotice(formData);
    }
    setFormData({ title: '', category: 'Announcements', description: '' });
    setIsOpen(false);
    onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormData({ title: '', category: 'Announcements', description: '' });
    onClose();
  };

  if (!isOpen && !editingNoticeId) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {editingNoticeId ? 'Edit Notice' : 'Add New Notice'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="Announcements">Announcements</option>
              <option value="Events">Events</option>
              <option value="Reminders">Reminders</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {editingNoticeId ? 'Update Notice' : 'Add Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}