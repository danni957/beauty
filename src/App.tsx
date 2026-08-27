import React from 'react';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Packages } from './components/Packages';
import { Coverage } from './components/Coverage';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { AdminModal } from './components/Admin/AdminModal';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Beauty Trap Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border-2 border-pink-200">
            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ✨
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">The Beauty Trap Pamper Bus</h2>
            <p className="text-sm text-gray-600 mb-6">Updating luxury party experience...</p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-bt-black text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-bt-gold transition-all"
            >
              Refresh Site
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ContentProvider>
          <div className="min-h-screen bg-white dark:bg-bt-dark-bg font-sans text-bt-text dark:text-gray-200 selection:bg-bt-pink-main selection:text-white transition-colors duration-300">
            <Navbar />
            <main>
              <Hero />
              <Packages />
              <Coverage />
              <Testimonials />
              <Gallery />
              <BookingForm />
            </main>
            <Footer />
            <AdminModal />
          </div>
        </ContentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
