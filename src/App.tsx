import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Language, getTranslation } from './i18n';
import { CreateCardForm } from './components/CreateCardForm';
import { CardDisplay } from './components/CardDisplay';
import { Cake } from 'lucide-react';

function HomePage({ language, onLanguageChange }: { language: Language; onLanguageChange: (lang: Language) => void }) {
  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <Cake size={32} />
            {t.appTitle}
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                language === 'en'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.english}
            </button>
            <button
              onClick={() => onLanguageChange('bg')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                language === 'bg'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.bulgarian}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.appTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.appSubtitle}
          </p>
        </div>

        <CreateCardForm language={language} />
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage language={language} onLanguageChange={setLanguage} />} />
        <Route path="/card/:slug" element={<CardDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
