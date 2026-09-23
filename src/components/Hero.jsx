import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Music2,
  ArrowRight,
  Star,
  Zap,
  Calendar,
  MapPin,
  Users,
  Lock,
  Crown,
} from 'lucide-react';

export default function Hero({
  activeArena,
  onSelectArena,
  onOpenRegister,
}) {
  // Target date: 16 October 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 25,
    hours: 18,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-16T08:30:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(
            difference / (1000 * 60 * 60 * 24)
          ),
          hours: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          ),
          minutes: Math.floor(
            (difference / 1000 / 60) % 60
          ),
          seconds: Math.floor(
            (difference / 1000) % 60
          ),
        });
      } else {
        setTimeLeft({
          days: 25,
          hours: 18,
          minutes: 30,
          seconds: 45,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBookClick = () => {
    if (onOpenRegister) {
      onOpenRegister(
        activeArena === 'bob' ? 'bob' : 'danzora'
      );
    } else {
      const el = document.getElementById('rules-faq');

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section className="relative pt-20 sm:pt-24 pb-16 overflow-hidden">

      {/* =======================================================
          CINEMATIC FESTIVAL STAGE HERO BANNER
          ======================================================= */}

      <div className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden border-b border-amber-500/30">

        {/* Stage Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.01]"
          style={{
            backgroundImage:
              "url('/assets/hero_concert_stage.jpg')",
            backgroundPosition: 'center 25%',
          }}
        />

        {/* Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/95 via-[#050507]/40 to-[#050507]/90" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/80" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050507_90%)] opacity-80" />

        {/* Golden Lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute top-12 right-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

            {/* =======================================================
                LEFT SIDE
                ======================================================= */}

            <div className="lg:col-span-6 text-left">

              {/* Category */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-extrabold tracking-[0.22em] text-zinc-300 uppercase mb-3">

                <span className="hover:text-amber-300 transition-colors">
                  MUSIC
                </span>

                <span className="text-amber-400">×</span>

                <span className="hover:text-amber-300 transition-colors">
                  DANCE
                </span>

                <span className="text-amber-400">×</span>

                <span className="hover:text-amber-300 transition-colors">
                  YOUTH
                </span>

                <span className="text-amber-400">×</span>

                <span className="hover:text-amber-300 transition-colors">
                  CULTURE
                </span>

              </div>

              {/* Main Festival Title */}
              <div className="relative mb-2">

                <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-[5.8rem] font-black tracking-wide leading-[0.88] text-white drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)]">
                  GEN-Z
                </h1>

                <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-[5.8rem] font-black tracking-wide leading-[0.88] bg-gradient-to-r from-[#FFF5B8] via-[#FFD700] to-[#E6A100] bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(245,158,11,0.55)]">
                  SUMMIT
                </h1>

              </div>

              {/* Subtitle */}
              <p className="font-syne text-xs sm:text-sm md:text-base font-extrabold tracking-[0.18em] uppercase text-amber-200 mt-2">
                THE FLAGSHIP EVENT OF NSS
              </p>

              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-amber-400/95 mt-1">
                BIGGER STAGES. BOLDER STORIES.
              </p>

              {/* Event Metadata */}
              <div className="flex flex-col gap-2.5 mt-6 mb-8 text-xs sm:text-sm text-zinc-200 font-medium">

                <div className="flex items-center gap-3">

                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    <Calendar className="w-4 h-4" />
                  </div>

                  <span className="font-bold tracking-wider text-white text-sm">
                    16 & 17 OCT 2026
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    <MapPin className="w-4 h-4" />
                  </div>

                  <span className="font-semibold tracking-wide text-zinc-200">
                    GCET, HYDERABAD
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    <Users className="w-4 h-4" />
                  </div>

                  <span className="font-medium tracking-wide text-zinc-300">
                    COLLEGES × CREATORS × COMMUNITIES
                  </span>

                </div>

              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center gap-4">

                <button
                  onClick={handleBookClick}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:shadow-[0_0_55px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span>BOOK YOUR SLOT</span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

            </div>

            {/* Center Spacer */}
            <div className="hidden lg:block lg:col-span-1 pointer-events-none" />

            {/* =======================================================
                RIGHT SIDE
                ======================================================= */}

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right mt-6 lg:mt-0">

              {/* Overall Cash Bounty */}
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/75 border border-amber-400/60 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />

                <span className="tracking-widest font-black text-amber-200">
                  ₹30,000+ CASH BOUNTY
                </span>
              </div>

              {/* Tagline */}
              <p className="max-w-xs text-xs sm:text-sm text-zinc-300/90 font-bold uppercase tracking-[0.18em] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                THE PREMIER COLLEGIATE CHAMPIONSHIP WHERE RHYTHM AND ROARING AMPS COLLIDE.
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* =======================================================
          ARENA GATEWAY & COUNTDOWN
          ======================================================= */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">

        {/* Arena Selector Tabs */}
        <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-[#121218]/90 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)] mb-10 backdrop-blur-xl gap-1">

          {/* Danzora */}
          <button
            onClick={() => onSelectArena('danzora')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeArena === 'danzora'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                : 'text-amber-200/80 hover:text-white hover:bg-amber-950/40'
            }`}
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Danzora (16 Oct • Dance)</span>
          </button>

          {/* Battle of Bands */}
          <button
            onClick={() => onSelectArena('bob')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeArena === 'bob'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                : 'text-amber-200/80 hover:text-white hover:bg-amber-950/40'
            }`}
          >
            <Music2 className="w-4 h-4" />
            <span>MUSIC β (17 Oct • Music)</span>
          </button>

          {/* Influencers Meet */}
          <button
            onClick={() => onSelectArena('influencers')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeArena === 'influencers'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                : 'text-zinc-400 hover:text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />

            <span>Influencers Meet (17 Oct)</span>

            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Coming Soon
            </span>
          </button>

          {/* View All */}
          <button
            onClick={() => onSelectArena('both')}
            className={`hidden sm:flex px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 items-center gap-2 ${
              activeArena === 'both'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <span>View All</span>
          </button>

        </div>

        {/* =======================================================
            GATEWAY CARDS
            ======================================================= */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-12">

          {/* =====================================================
              DANZORA
              ===================================================== */}

          <div
            onClick={() => onSelectArena('danzora')}
            className={`group relative rounded-3xl p-1 transition-all duration-300 cursor-pointer ${
              activeArena === 'danzora'
                ? 'bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-700 shadow-[0_0_55px_rgba(245,158,11,0.5)] scale-[1.02]'
                : 'bg-gradient-to-b from-amber-500/40 via-zinc-800/60 to-transparent hover:shadow-[0_0_40px_rgba(245,158,11,0.35)] hover:scale-[1.01]'
            }`}
          >

            <div className="relative h-full bg-[#0c0c10]/95 backdrop-blur-xl rounded-[22px] p-6 flex flex-col items-center justify-between border border-amber-500/30 overflow-hidden">

              <div className="relative w-full flex items-center justify-between mb-3">

                <span className="px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  16 Oct • Dance Championship
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[11px] font-bold text-emerald-300 font-mono">
                  Reg: ₹1099
                </span>

              </div>

              {/* Danzora Emblem — FULL IMAGE */}
              <div className="relative my-2 w-full max-w-[360px] rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.35)] group-hover:scale-[1.02] transition-transform duration-300 bg-black">

                <img
                  src="/assets/danzora_logo.jpg"
                  alt="Danzora Dance Championship"
                  className="w-full h-auto object-contain block"
                />

              </div>

              <h3 className="font-syne text-2xl font-extrabold text-white mt-3 tracking-wider">
                DANZORA
              </h3>

              <p className="text-xs text-amber-300/90 font-semibold uppercase tracking-widest mt-1">
                Inter-College Dance Championship
              </p>

              {/* Overall Cash Bounty */}
              <div className="w-full my-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-zinc-900 border border-amber-500/30 flex items-center justify-between text-left">

                

                <div className="text-right text-xs text-zinc-300 font-medium">
                  <p>Trophy + Certificates</p>
                </div>

              </div>

              {/* Action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectArena('danzora');
                }}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                  activeArena === 'danzora'
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-black shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-amber-200 border border-amber-500/40'
                }`}
              >
                <span>Click for Dance Details & Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* =====================================================
              BATTLE OF THE BANDS
              ===================================================== */}

          <div
            onClick={() => onSelectArena('bob')}
            className={`group relative rounded-3xl p-1 transition-all duration-300 cursor-pointer ${
              activeArena === 'bob'
                ? 'bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-700 shadow-[0_0_55px_rgba(245,158,11,0.5)] scale-[1.02]'
                : 'bg-gradient-to-b from-amber-500/40 via-zinc-800/60 to-transparent hover:shadow-[0_0_40px_rgba(245,158,11,0.35)] hover:scale-[1.01]'
            }`}
          >

            <div className="relative h-full bg-[#0c0c10]/95 backdrop-blur-xl rounded-[22px] p-6 flex flex-col items-center justify-between border border-amber-500/30 overflow-hidden">

              <div className="relative w-full flex items-center justify-between mb-3">

                <span className="px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  17 Oct • Music Championship
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[11px] font-bold text-emerald-300 font-mono">
                  Reg: ₹899
                </span>

              </div>

              {/* creator of Bands Emblem — FULL IMAGE */}
              <div className="relative my-2 w-full max-w-[360px] rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.35)] group-hover:scale-[1.02] transition-transform duration-300 bg-black">

                <img
                  src="/assets/battle_of_bands_logo.jpg"
                  alt="Battle of the Bands Championship"
                  className="w-full h-auto object-contain block"
                />

              </div>

              <h3 className="font-syne text-2xl font-extrabold text-white mt-3 tracking-wider">
                MUSIC β
              </h3>

              <p className="text-xs text-amber-300/90 font-semibold uppercase tracking-widest mt-1">
                Inter-College Music Championship
              </p>

              {/* Overall Cash Bounty */}
              <div className="w-full my-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-zinc-900 border border-amber-500/30 flex items-center justify-between text-left">

               

                <div className="text-right text-xs text-zinc-300 font-medium">
                  <p>Trophy + Recognition</p>
                </div>

              </div>

              {/* Action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectArena('bob');
                }}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                  activeArena === 'bob'
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-black shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-amber-200 border border-amber-500/40'
                }`}
              >
                <span>Click for Music Details & Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* =====================================================
              INFLUENCERS MEET
              ===================================================== */}

          <div
            id="influencers-card"
            onClick={() => onSelectArena('influencers')}
            className={`group relative rounded-3xl p-1 transition-all duration-300 cursor-pointer ${
              activeArena === 'influencers'
                ? 'bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-700 shadow-[0_0_55px_rgba(245,158,11,0.5)] scale-[1.02]'
                : 'bg-gradient-to-b from-amber-500/30 via-zinc-800/50 to-transparent hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:scale-[1.01]'
            }`}
          >

            <div className="relative h-full bg-[#0c0c10]/95 backdrop-blur-xl rounded-[22px] p-6 flex flex-col items-center justify-between border border-amber-500/30 overflow-hidden">

              <div className="relative w-full flex items-center justify-between mb-3">

                <span className="px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  17 Oct • Creator Conclave
                </span>

                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>LOCKED</span>
                </span>

              </div>

              {/* Creators Nation Logo */}
<div className="relative my-2 w-full max-w-[360px] rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black shadow-[0_0_35px_rgba(245,158,11,0.35)] group-hover:scale-[1.02] transition-transform duration-300">
  <img
    src="/assets/creators nation.png"
    alt="Creators Nation"
    className="w-full h-auto object-contain block"
  />

  {/* Subtle cinematic overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
</div>

                <span className="text-[11px] font-mono tracking-widest text-amber-300 font-bold uppercase bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  VIP ACCESS ONLY
                </span>

                <span className="text-[10px] text-zinc-400 mt-1">
                  Creator Pass Required
                </span>

              </div>

              <h3 className="font-syne text-2xl font-extrabold text-white mt-3 tracking-wider flex items-center gap-2">

                <span>INFLUENCERS MEET</span>

                <Lock className="w-4 h-4 text-amber-400" />

              </h3>

              <p className="text-xs text-amber-300/90 font-semibold uppercase tracking-widest mt-1">
                Creators, Artists & Youth Icons
              </p>

              {/* Locked Teaser */}
              <div className="w-full my-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-zinc-900 border border-amber-500/30 text-left">

                <div className="flex items-center justify-between mb-1.5">

                  <span className="text-[10px] uppercase text-amber-300 font-bold tracking-wider flex items-center gap-1">

                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />

                    <span>Exclusive Showcase</span>

                  </span>

                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                    Phase 2 Reveal
                  </span>

                </div>

                <p className="text-[11px] text-zinc-300 leading-snug">
                  Red carpet arrivals, creator panels, exclusive photo-ops, and private networking lounge.
                </p>

              </div>

              {/* Locked Action */}
              <div className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-black/80 text-amber-300/80 border border-amber-500/40 flex items-center justify-center gap-2 cursor-not-allowed shadow-inner backdrop-blur-md">

                <Lock className="w-3.5 h-3.5 text-amber-400" />

                <span>Coming Soon • Locked</span>

              </div>

            </div>
          </div>

        </div>

        {/* Countdown */}
        <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0f0f15]/90 border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.2)] backdrop-blur-xl">

          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 flex items-center justify-center gap-2">

            <Zap className="w-3.5 h-3.5 text-yellow-400" />

            <span>
              Countdown to 16 October 2026 (Fest Kickoff • Danzora)
            </span>

          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">

            <div className="p-2 sm:p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30">

              <span className="font-bebas text-2xl sm:text-4xl font-bold text-amber-300">
                {timeLeft.days}
              </span>

              <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-0.5 font-semibold">
                Days
              </p>

            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30">

              <span className="font-bebas text-2xl sm:text-4xl font-bold text-amber-300">
                {timeLeft.hours}
              </span>

              <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-0.5 font-semibold">
                Hours
              </p>

            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30">

              <span className="font-bebas text-2xl sm:text-4xl font-bold text-amber-300">
                {timeLeft.minutes}
              </span>

              <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-0.5 font-semibold">
                Mins
              </p>

            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30">

              <span className="font-bebas text-2xl sm:text-4xl font-bold text-yellow-400">
                {timeLeft.seconds}
              </span>

              <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-0.5 font-semibold">
                Secs
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}