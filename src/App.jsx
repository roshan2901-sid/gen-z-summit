import React, { useState, useEffect } from 'react';

import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DanzoraSection from './components/DanzoraSection';
import BattleOfBandsSection from './components/BattleOfBandsSection';
import GeneralRegulations from './components/GeneralRegulations';
import RulesAndFAQ from './components/RulesAndFAQ';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';

// ============================================================
// STUDENT TRIBE REGISTRATION LINK
// ============================================================

const STUDENT_TRIBE_URL =
  'https://app.studenttribe.in/events/genz-summit';

export default function App() {
  const [activeArena, setActiveArena] = useState('both');

  // ============================================================
  // ADMIN ROUTE
  // ============================================================

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

  // ============================================================
  // STUDENT TRIBE REDIRECT
  // ============================================================

  const handleOpenRegister = () => {
    window.location.href = STUDENT_TRIBE_URL;
  };

  // ============================================================
  // ARENA SELECTION
  // ============================================================

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

    if (arenaKey === 'bob') {
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

    if (arenaKey === 'influencers') {
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

    if (arenaKey === 'both') {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 50);
    }
  };

  // ============================================================
  // ADMIN → BACK TO SITE
  // ============================================================

  const handleBackToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ============================================================
  // ADMIN PORTAL
  // ============================================================

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#050507] text-zinc-100 selection:bg-amber-500 selection:text-black relative">
        <ParticleCanvas />

        <AdminPortal onBackToSite={handleBackToSite} />
      </div>
    );
  }

  // ============================================================
  // MAIN WEBSITE
  // ============================================================

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 selection:bg-amber-500 selection:text-black relative">

      <ParticleCanvas />

      <Navbar
        activeArena={activeArena}
        onSelectArena={handleSelectArena}
        onOpenRegister={handleOpenRegister}
      />

      <main className="relative z-10">

        {/* HERO */}
        <Hero
          activeArena={activeArena}
          onSelectArena={handleSelectArena}
          onOpenRegister={handleOpenRegister}
        />

        {/* DANZORA */}
        {(activeArena === 'danzora' ||
          activeArena === 'both') && (
          <DanzoraSection
            onOpenRegister={handleOpenRegister}
          />
        )}

        {/* BATTLE OF THE BANDS */}
        {(activeArena === 'bob' ||
          activeArena === 'both') && (
          <BattleOfBandsSection
            onOpenRegister={handleOpenRegister}
          />
        )}

        {/* =====================================================
            SINGLE GENERAL REGULATIONS SECTION
            Appears ONLY here — below Battle of the Bands
            ===================================================== */}

        <section
          id="general-regulations"
          className="relative py-16 bg-[#070709] border-t border-amber-500/25"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GeneralRegulations type="dance" />
          </div>
        </section>

        {/* FAQ */}
        <RulesAndFAQ
          onOpenRegister={handleOpenRegister}
        />

      </main>

      <Footer
        onOpenRegister={handleOpenRegister}
      />

    </div>
  );
}