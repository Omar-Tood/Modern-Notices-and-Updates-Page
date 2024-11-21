import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
      <Bell className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
}