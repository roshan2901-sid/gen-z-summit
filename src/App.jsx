import React, { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GeneralRegulations from './components/GeneralRegulations';
import DanzoraSection from './components/DanzoraSection';
import BattleOfBandsSection from './components/BattleOfBandsSection';
import RulesAndFAQ from './components/RulesAndFAQ';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import AdminPortal from './components/AdminPortal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('danzora');
  const [activeArena, setActiveArena] = useState('both');

  // Check if current URL is /admin or #admin
  const checkIsAdmin = () => {
    return (
      window.location.pathname === '/admin' ||
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin'
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdmin());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdmin());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Handle arena selection
  const handleSelectArena = (arenaKey) => {
    setActiveArena(arenaKey);

    if (arenaKey === 'danzora') {
      setTimeout(() => {
        const el = document.getElementById('danzora');

        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 50);
    }

    else if (arenaKey === 'bob') {
      setTimeout(() => {
        const el = document.getElementById('battle-of-bands');

        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 50);
    }

    else if (arenaKey === 'influencers') {
      setTimeout(() => {
        const el = document.getElementById('influencers-card');

        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 50);
    }
  };

  // Open registration modal
  const handleOpenRegister = (eventKey = 'danzora') => {
    setSelectedEvent(eventKey);
    setIsRegisterOpen(true);
  };

  // Close registration modal
  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  // Return from Admin Portal
  const handleBackToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SECRET /admin ROUTE
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#050507] text-zinc-100 selection:bg-amber-500 selection:text-black relative">
        <ParticleCanvas />

        <AdminPortal
          onBackToSite={handleBackToSite}
        />
      </div>
    );
  }

  // REGULAR PUBLIC FESTIVAL WEBSITE
  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 selection:bg-amber-500 selection:text-black relative">

      {/* Background Particles */}
      <ParticleCanvas />

      {/* Navigation */}
      <Navbar
        activeArena={activeArena}
        onSelectArena={handleSelectArena}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Content */}
      <main className="relative z-10">

        {/* Hero */}
        <Hero
          activeArena={activeArena}
          onSelectArena={handleSelectArena}
          onOpenRegister={handleOpenRegister}
        />

        {/* DANZORA */}
        {(activeArena === 'danzora' || activeArena === 'both') && (
          <DanzoraSection />
        )}

        {/* BATTLE OF THE BANDS */}
        {(activeArena === 'bob' || activeArena === 'both') && (
          <BattleOfBandsSection />
        )}

        {/* GENERAL REGULATIONS */}
        <GeneralRegulations
          type="dance"
        />

        {/* FAQ */}
        <RulesAndFAQ
          onOpenRegister={handleOpenRegister}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenRegister={handleOpenRegister}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={handleCloseRegister}
        initialEvent={selectedEvent}
      />

    </div>
  );
}