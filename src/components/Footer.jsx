import React from 'react';
import { Zap, ArrowUp, Phone, MessageSquare, Star } from 'lucide-react';

export default function Footer({ onOpenRegister }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040406] border-t border-amber-500/20 text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col with Official Summit Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/genz_summit_logo.png"
                alt="Gen-Z Summit Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]"
              />
              <span className="font-cinzel text-lg font-black text-white tracking-wider">
                GEN-Z SUMMIT 2026
              </span>
            </div>
            <p className="text-zinc-400 text-xs max-w-md font-light leading-relaxed">
              16 & 17 October 2026. The official inter-college arts and performance championship. 16 Oct: Danzora Dance Championship • 17 Oct: MUSIC β & Creators Nation.
            </p>
            <div className="space-y-1 text-xs pt-1">
              <p className="text-white font-semibold flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Event Coordinators:</span>
              </p>
              <p className="text-zinc-300">K. Sai Mithil: <span className="font-mono text-amber-300 font-bold">8328070910</span></p>
              <p className="text-zinc-300">G. Roshan Siddarth: <span className="font-mono text-amber-300 font-bold">8328477757</span></p>
              <p className="text-zinc-300">T. K. Nawaz: <span className="font-mono text-amber-300 font-bold">8309407465</span></p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <img
                src="/assets/danzora_logo.jpg"
                alt="Danzora"
                className="w-10 h-10 rounded-lg object-cover border border-amber-500/30"
              />
              <img
                src="/assets/battle_of_bands_logo.jpg"
                alt="Battle of the Bands"
                className="w-10 h-10 rounded-lg object-cover border border-amber-500/30"
              />

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider text-xs mb-3">Quick Navigation</p>
            <ul className="space-y-2">
              <li><a href="#danzora" className="hover:text-amber-300 transition-colors">Danzora (16 Oct Dance)</a></li>
              <li><a href="#battle-of-bands" className="hover:text-amber-300 transition-colors">MUSIC β (17 Oct Music)</a></li>
              <li><a href="#influencers-card" className="hover:text-amber-300 transition-colors">Creators Nation (17 Oct • 🔒 Soon)</a></li>
              <li><a href="#prizes" className="hover:text-amber-300 transition-colors">Prize Bounties (₹30k)</a></li>
              <li><a href="#rules" className="hover:text-amber-300 transition-colors">Official Regulations</a></li>
              <li><a href="#faq" className="hover:text-amber-300 transition-colors">FAQ & Coordinators</a></li>
            </ul>
          </div>

          {/* Registrations */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider text-xs mb-3">Championship Slots</p>
            <div className="space-y-2 mb-4">
              <button
                onClick={() => onOpenRegister('danzora')}
                className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-200 text-xs font-bold text-left flex items-center justify-between transition-colors"
              >
                <span>Danzora Dance Crew (16 Oct)</span>
                <span className="text-white font-mono font-black">₹1,099</span>
              </button>
              <button
                onClick={() => onOpenRegister('bob')}
                className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-200 text-xs font-bold text-left flex items-center justify-between transition-colors"
              >
                <span>MUSIC β (17 Oct)</span>
                <span className="text-white font-mono font-black">₹899</span>
              </button>
              <div className="w-full py-2 px-3.5 rounded-xl bg-black/60 border border-zinc-800 text-zinc-400 text-xs font-semibold flex items-center justify-between">
                <span>Creators Nation (17 Oct)</span>
                <span className="text-amber-400 text-[10px] font-mono uppercase">🔒 Locked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© 2026 Gen-Z Summit Fest Council. 16 & 17 October 2026.</p>
          <div className="flex items-center gap-4">
            <span>Inter-College Dance & Music Extravaganza</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 text-amber-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
