import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserData {
  name: string;
  email: string;
  role: string;
}

const defaultUser: UserData = {
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'viewer'
};

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>(() => {
    const stored = localStorage.getItem('user-data');
    return stored ? JSON.parse(stored) : defaultUser;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData);

  useEffect(() => {
    localStorage.setItem('user-data', JSON.stringify(userData));
  }, [userData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData(editForm);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    setUserData(defaultUser);
    toast.success('Logged out successfully!');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <User className="w-6 h-6 text-indigo-600" />
      </button>

      {isOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-xl z-50 p-4">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{userData.name}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Edit Profile
                </button>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>{userData.email}</p>
                <p className="capitalize">Role: {userData.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}