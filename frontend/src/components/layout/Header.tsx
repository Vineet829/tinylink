import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TinyLink</span>
          </Link>
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/healthz" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Health
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
