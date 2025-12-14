import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Sidebar from './Sidebar/Sidebar';
import HeaderLayout from './Header/HeaderLayout';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100/20">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-r-gray-200">
        <Sidebar />
      </aside>

      {/* Right content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header - chỉ nằm trên outlet */}
        <div className="h-16 shrink-0 border-b border-b-gray-200">
          <HeaderLayout />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="shrink-0 border-t border-t-gray-200 bg-white">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
