import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Packages } from './components/Packages';
import { Coverage } from './components/Coverage';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { AdminModal } from './components/Admin/AdminModal';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bt-pink-light text-center">
          <h2 className="text-2xl font-bold font-serif text-bt-black mb-3">Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-md">{this.state.error?.message}</p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-bt-gold text-bt-black font-bold uppercase px-6 py-3 rounded shadow hover:bg-yellow-400 text-xs tracking-wider"
          >
            Reset Cache & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <div className="min-h-screen bg-white font-sans text-bt-text selection:bg-bt-pink-main selection:text-white">
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
    </ErrorBoundary>
  );
}

export default App;
