import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoticeCard from './components/NoticeCard';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import AddNoticeForm from './components/AddNoticeForm';
import { NoticesProvider, useNotices } from './context/NoticesContext';
import { Toaster } from 'react-hot-toast';
import UserProfile from './components/UserProfile';

function NoticesApp() {
  const { notices, deleteNotice } = useNotices();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editingNotice, setEditingNotice] = React.useState<number | null>(null);
  const itemsPerPage = 10;

  const filteredNotices = React.useMemo(() => {
    return notices.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [notices, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <UserProfile />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNotices.map(notice => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onDelete={deleteNotice}
              onEdit={() => setEditingNotice(notice.id)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <AddNoticeForm editingNoticeId={editingNotice} onClose={() => setEditingNotice(null)} />
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <NoticesProvider>
      <NoticesApp />
    </NoticesProvider>
  );
}