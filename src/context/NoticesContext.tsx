import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
}

interface NoticesContextType {
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  updateNotice: (id: number, notice: Partial<Notice>) => void;
  deleteNotice: (id: number) => void;
}

const NoticesContext = createContext<NoticesContextType | undefined>(undefined);

const initialNotices: Notice[] = [
  {
    id: 1,
    title: "Annual Company Picnic",
    date: "2024-03-15",
    category: "Events",
    description: "Join us for our annual company picnic at Central Park. Food and entertainment will be provided."
  },
  {
    id: 2,
    title: "System Maintenance Notice",
    date: "2024-03-14",
    category: "Announcements",
    description: "Scheduled maintenance will be performed on the main server this weekend."
  },
  {
    id: 3,
    title: "Quarterly Review Deadline",
    date: "2024-03-13",
    category: "Reminders",
    description: "Please submit your quarterly review documents by the end of this week."
  }
];

const STORAGE_KEY = 'notices-data';
const USER_KEY = 'user-data';

export function getStoredUser() {
  const userData = localStorage.getItem(USER_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
  return null;
}

function getStoredNotices(): Notice[] {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing stored notices:', error);
    }
  }
  return initialNotices;
}

export function NoticesProvider({ children }: { children: React.ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>(getStoredNotices);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
  }, [notices]);

  const addNotice = useCallback((notice: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...notice,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setNotices(prev => [newNotice, ...prev]);
    toast.success('Notice added successfully!');
  }, []);

  const updateNotice = useCallback((id: number, updatedFields: Partial<Notice>) => {
    setNotices(prev => prev.map(notice => 
      notice.id === id ? { ...notice, ...updatedFields } : notice
    ));
    toast.success('Notice updated successfully!');
  }, []);

  const deleteNotice = useCallback((id: number) => {
    setNotices(prev => prev.filter(notice => notice.id !== id));
    toast.success('Notice deleted successfully!');
  }, []);

  return (
    <NoticesContext.Provider value={{ notices, addNotice, updateNotice, deleteNotice }}>
      {children}
    </NoticesContext.Provider>
  );
}

export function useNotices() {
  const context = useContext(NoticesContext);
  if (context === undefined) {
    throw new Error('useNotices must be used within a NoticesProvider');
  }
  return context;
}