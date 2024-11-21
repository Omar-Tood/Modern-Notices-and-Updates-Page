import React, { useState } from 'react';
import { Calendar, ArrowRight, Trash2, Edit } from 'lucide-react';
import { Notice } from '../context/NoticesContext';
import DeleteDialog from './DeleteDialog';

interface NoticeCardProps {
  notice: Notice;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function NoticeCard({ notice, onDelete, onEdit }: NoticeCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(notice.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              notice.category === 'Events' ? 'bg-green-100 text-green-800' :
              notice.category === 'Announcements' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {notice.category}
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {notice.date}
              </div>
              <button
                onClick={() => onEdit(notice.id)}
                className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{notice.title}</h3>
          <p className="text-gray-600 mb-4">{notice.description}</p>
          <button className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
            Read More
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={notice.title}
      />
    </>
  );
}