import React from 'react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userEmail?: string;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick, userEmail }) => {
  const titleMap: Record<string, string> = {
    'dashboard': 'Dashboard',
    'products': 'Produk',
    'users': 'user'
  };

  const getInitials = (email?: string) => {
    if (!email) return 'A';
    const username = email.split('@')[0];
    return username[0].toUpperCase();
  };

  const initials = getInitials(userEmail);

  return (
    <header className="sticky top-0 z-30 flex h-14 md:h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-3 md:px-8 backdrop-blur-md">
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 md:hidden transition-colors"
        >
          <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex items-center gap-1 text-[10px] md:text-xs text-slate-400">
          <span>Admin</span>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="capitalize font-medium">{titleMap[title] || title}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:block">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white">
            {initials}
          </div>
        </div>
        
        <div className="md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white border-2 border-slate-100">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;