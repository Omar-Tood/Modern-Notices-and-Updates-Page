import React from 'react';
import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Bell className="w-8 h-8" />
          <h1 className="text-4xl font-bold tracking-tight">Notices & Updates</h1>
        </div>
        <p className="text-center text-indigo-100 text-lg">
          Stay informed with the latest news and updates
        </p>
      </div>
    </header>
  );
}