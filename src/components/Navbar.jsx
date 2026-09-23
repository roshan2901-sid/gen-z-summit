import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({
  activeArena,
  onSelectArena,
  onOpenRegister,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookSlot = () => {
    window.open(
      'https://app.studenttribe.in/events/genz-summit',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#08080b]/90 backdrop-blur-xl border-b border-amber-500/25">

      {/* Top Micro Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-yellow-950/80 to-amber-950/70 text-amber-200 text-[11px] py-1 px-4 text-center border-b border-amber-500/20 flex items-center justify-center gap-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping"></span>

        <span className="font-semibold tracking-wider uppercase">
          16 & 17 Oct 2026 • 16 Oct Dance (₹1099) • 17 Oct Music (₹899) • 17 Oct Creators Nation (₹79)
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1500px] mx-auto px-5 lg:px-8 h-[84px] flex items-center gap-4">

        {/* Summit Brand */}
        <div
          onClick={() => {
            onSelectArena('both');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center shrink-0 group cursor-pointer w-[280px] lg:w-[300px]"
        >
          <div>
            <div className="flex items-center">
              <span className="font-syne text-lg sm:text-xl font-black tracking-wider text-white group-hover:brightness-125 transition-all">
                GEN-Z <span className="text-gold-gradient">SUMMIT</span>
              </span>
            </div>

            {/* Co-Powered By Student Tribe + Logo */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] sm:text-[11px] text-amber-200/70 tracking-widest uppercase font-semibold">
                CO-POWERED BY STUDENT TRIBE
              </span>

              <img
                src="/assets/student_tribe.png"
                alt="Student Tribe"
                className="w-6 h-6 rounded-full object-cover border border-amber-400/30"
              />
            </div>
          </div>
        </div>

        {/* Arena Selectors */}
        <div className="hidden lg:flex items-center justify-center gap-1 bg-[#121218] p-1 rounded-xl border border-amber-500/30 shadow-inner flex-1 max-w-[720px]">

          {/* Danzora */}
          <button
            onClick={() => onSelectArena('danzora')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeArena === 'danzora'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'text-amber-200/80 hover:text-white hover:bg-amber-950/40'
            }`}
          >
            <span>Danzora (16 Oct Dance)</span>
            <span className="text-[10px] font-mono opacity-90 font-black">
              ₹1099
            </span>
          </button>

          {/* Battle of Bands */}
          <button
            onClick={() => onSelectArena('bob')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeArena === 'bob'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'text-amber-200/80 hover:text-white hover:bg-amber-950/40'
            }`}
          >
            <span>MUSIC β (17 Oct)</span>
            <span className="text-[10px] font-mono opacity-90 font-black">
              ₹899
            </span>
          </button>

          {/* Creators Nation */}
          <button
            onClick={() => onSelectArena('influencers')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeArena === 'influencers'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'text-amber-200/80 hover:text-white hover:bg-amber-950/40'
            }`}
          >
            <span>Creators Nation (17 Oct)</span>

            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ₹79
            </span>
          </button>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 ml-auto shrink-0">

          <a
            href="#prizes"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
          >
            Prize Pool
          </a>

          <a
            href="#rules"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
          >
            Regulations
          </a>

          <a
            href="#faq"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
          >
            FAQ
          </a>

        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2 shrink-0">

          <button
            onClick={handleBookSlot}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:brightness-110 text-black shadow-[0_0_25px_rgba(245,158,11,0.45)] border border-yellow-200 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>Book Slot</span>
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-amber-950/60 text-amber-300 hover:text-white border border-amber-600/40"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e]/98 border-b border-amber-500/30 px-4 py-4 space-y-3 backdrop-blur-2xl">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-2 border-b border-zinc-800">

            <button
              onClick={() => {
                onSelectArena('danzora');
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center ${
                activeArena === 'danzora'
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-900 text-amber-200 border border-zinc-800'
              }`}
            >
              Danzora (16 Oct • ₹1099)
            </button>

            <button
              onClick={() => {
                onSelectArena('bob');
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center ${
                activeArena === 'bob'
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-900 text-amber-200 border border-zinc-800'
              }`}
            >
              MUSIC β (17 Oct • ₹899)
            </button>

            <button
              onClick={() => {
                onSelectArena('influencers');
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center ${
                activeArena === 'influencers'
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-900 text-amber-200 border border-zinc-800'
              }`}
            >
              Creators Nation (17 Oct • ₹79)
            </button>

          </div>

          <nav className="flex flex-col space-y-2">

            <a
              href="#prizes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-amber-400"
            >
              Prize Bounties (₹30k+)
            </a>

            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-amber-400"
            >
              Schedule (16 & 17 Oct)
            </a>

            <a
              href="#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-amber-400"
            >
              General Regulations
            </a>

            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-amber-400"
            >
              FAQ & Coordinators
            </a>

          </nav>

          {/* Mobile Book Slot */}
          <button
            onClick={handleBookSlot}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            Book Your Slot
          </button>

        </div>
      )}
    </header>
  );
}