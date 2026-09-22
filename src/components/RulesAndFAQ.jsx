import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Download, Phone, MessageSquare, Mail, MapPin, AlertCircle, Scale } from 'lucide-react';

export default function RulesAndFAQ({ onOpenRegister }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('danzora');

  const faqs = [
    {
      q: 'Are cross-college teams or bands allowed?',
      a: 'NO. Cross-college teams are strictly NOT allowed. All performing members of a dance crew or music band must be bonafide students of the same college/institution and must present valid college identity cards during registration.',
    },
    {
      q: 'When and how should audio tracks for Danzora be submitted?',
      a: 'Audio tracks (.mp3 or .wav at 320kbps minimum) must be sent at least 48 hours prior to the event (by 14 October 2026, 10:00 AM for Danzora on 16 Oct) to tracks@genzsummit.org or via Google Drive link during registration. Crews must also carry a physical backup on a USB pen drive on festival day.',
    },
    {
      q: 'What are the championship dates and registration fees?',
      a: 'Danzora (Dance Championship) takes place on 16 October 2026 (Registration Fee: ₹1,099 / crew). Battle of the Bands (Music Championship) takes place on 17 October 2026 (Registration Fee: ₹899 / band). On 17 October, we also host an exclusive Influencers Meet (Creator Conclave - coming soon!).',
    },
    {
      q: 'What is the Influencers Meet scheduled on 17 October?',
      a: 'The Influencers Meet is an exclusive creator conclave taking place on 17 October 2026 alongside Battle of the Bands. Access is currently locked and marked Coming Soon as VIP guest announcements are underway. Stay tuned for registration and delegate passes!',
    },
    {
      q: 'How does the ticket approval and QR pass delivery work?',
      a: 'Once you submit your application with the 12-digit UTR reference number from your payment to 8328477757-2@axl, our admin team verifies the transaction. Upon approval, your official entry pass with scannable QR code is sent directly to your registered email.',
    },
    {
      q: 'What stage backline is provided for Battle of the Bands?',
      a: 'We provide a 5-piece acoustic drum kit with hardware, 2 guitar half-stack amplifiers, 1 bass amplifier rig, 4 vocal microphones, and DI channels. Bands must bring their own guitars, keyboards, cymbals, sticks, and effect boards.',
    },
    {
      q: 'Can an institution field multiple teams or bands?',
      a: 'Yes! A college can register up to 2 crews for Danzora and 2 bands for Battle of the Bands, as long as all performing members in each squad are unique.',
    },
  ];

  const coordinators = [
    {
      name: 'K. Sai Mithil',
      role: 'Event Coordinator',
      phone: '8328070910',
      whatsapp: 'https://wa.me/918328070910?text=Hi%20Sai%20Mithil,%20inquiring%20about%20Gen-Z%20Summit',
    },
    {
      name: 'G. Roshan Siddarth',
      role: 'Event Coordinator',
      phone: '8328477757',
      whatsapp: 'https://wa.me/918328477757?text=Hi%20Roshan,%20inquiring%20about%20Gen-Z%20Summit',
    },
    {
      name: 'M. Hujith',
      role: 'Event Coordinator',
      phone: '7780111178',
      whatsapp: 'https://wa.me/917780111178?text=Hi%20Hujith,%20inquiring%20about%20Gen-Z%20Summit',
    },
  ];

  const handleDownloadRulebook = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `GEN-Z SUMMIT 2026 - OFFICIAL REGULATIONS & GUIDELINES\n` +
      `=======================================================\n` +
      `Dates: 16 October (Danzora Dance) & 17 October (Battle of the Bands & Influencers Meet)\n` +
      `Venue: GCET, Hyderabad (Geethanjali College of Engineering & Technology)\n` +
      `Beneficiary UPI: 8328477757-2@axl\n\n` +
      `• GENERAL REGULATIONS (DANZORA DANCE - 16 OCT):\n` +
      `1. All participants are expected to maintain discipline, sportsmanship and mutual respect throughout the event.\n` +
      `2. Any form of misconduct or inappropriate behaviour may lead to disqualification.\n` +
      `3. Performances must not contain content that is offensive, discriminatory or inappropriate.\n` +
      `4. Teams must respect the event schedule and instructions provided by the organizing committee.\n` +
      `5. Any damage caused to the venue or equipment by a team may result in appropriate action.\n` +
      `- Audio Submission: Must be sent 48 HOURS PRIOR to the event (by 14 Oct, 10:00 AM).\n` +
      `- Cross-College: NOT ALLOWED. All members must be from the same college.\n` +
      `- Reg Fee: ₹1,099 / crew | Prizes: 1st ₹8k, 2nd ₹4.5k, 3rd ₹2.5k\n\n` +
      `• GENERAL REGULATIONS (BATTLE OF THE BANDS - 17 OCT):\n` +
      `1. All participants are expected to maintain discipline, sportsmanship and mutual respect throughout the event.\n` +
      `2. Any form of misconduct or inappropriate behaviour may lead to disqualification.\n` +
      `3. Performances must not contain content that is offensive, discriminatory or inappropriate.\n` +
      `4. Bands must respect the event schedule and instructions provided by the organizing committee.\n` +
      `5. Any damage caused to the venue or equipment by a band may result in appropriate action.\n` +
      `- Cross-College: NOT ALLOWED. All members must be from the same college.\n` +
      `- Reg Fee: ₹899 / band | Prizes: 1st ₹6.5k, 2nd ₹3.5k\n\n` +
      `• INFLUENCERS MEET (17 OCT):\n` +
      `- Creator Conclave & VIP Red Carpet (Registration / Passes Currently Locked - Coming Soon)\n\n` +
      `EVENT COORDINATORS:\n` +
      `- K. Sai Mithil: 8328070910\n` +
      `- G. Roshan Siddarth: 8328477757\n` +
      `- M. Hujith: 7780111178\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Gen-Z_Summit_2026_Official_Rules.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="rules" className="relative py-20 bg-[#060608] border-t border-amber-500/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rules & Guidelines Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Fair Play & Official Protocol</span>
              </div>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-black text-white">
                <span className="text-gold-gradient">CHAMPIONSHIP REGULATIONS</span>
              </h3>
            </div>
            <button
              onClick={handleDownloadRulebook}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-200 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Rulebook (.txt)</span>
            </button>
          </div>

          {/* Rulebook Tabs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveTab('danzora')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'danzora'
                  ? 'bg-amber-500 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Danzora Dance Regulations (Teams)
            </button>
            <button
              onClick={() => setActiveTab('bob')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'bob'
                  ? 'bg-amber-500 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Battle of the Bands Regulations (Bands)
            </button>
          </div>

          {/* Exact General Regulations Box */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0e0e14] border border-amber-500/35">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-amber-400" />
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white">
                  {activeTab === 'danzora' ? '• GENERAL REGULATIONS FOR DANCE CREWS' : '• GENERAL REGULATIONS FOR MUSIC BANDS'}
                </h4>
                <p className="text-xs text-zinc-400">
                  {activeTab === 'danzora'
                    ? 'Code of conduct applicable to all participating teams in Danzora (16 Oct 2026)'
                    : 'Code of conduct applicable to all participating bands in Battle of the Bands (17 Oct 2026)'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <p className="text-xs sm:text-sm text-zinc-200">
                  All participants are expected to maintain discipline, sportsmanship and mutual respect throughout the event.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <p className="text-xs sm:text-sm text-zinc-200">
                  Any form of misconduct or inappropriate behaviour may lead to disqualification.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <p className="text-xs sm:text-sm text-zinc-200">
                  Performances must not contain content that is offensive, discriminatory or inappropriate.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <p className="text-xs sm:text-sm text-zinc-200">
                  {activeTab === 'danzora'
                    ? 'Teams must respect the event schedule and instructions provided by the organizing committee.'
                    : 'Bands must respect the event schedule and instructions provided by the organizing committee.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                <p className="text-xs sm:text-sm text-zinc-200">
                  {activeTab === 'danzora'
                    ? 'Any damage caused to the venue or equipment by a team may result in appropriate action.'
                    : 'Any damage caused to the venue or equipment by a band may result in appropriate action.'}
                </p>
              </div>
            </div>

            {/* Special Notice Bar */}
            <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-200">
              <div>
                <p className="font-bold text-white">⚡ Critical Submission Protocols:</p>
                <p className="text-zinc-300 mt-0.5">
                  • <strong>Audio tracks</strong> must be sent <strong>48 hours prior</strong> to the event. <br />
                  • <strong>Cross-college participation is NOT allowed</strong> (All members must be from the same college).
                </p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                Strict Adherence
              </span>
            </div>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div id="faq" className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
              <span>Answers to Common Inquiries</span>
            </div>
            <h3 className="font-cinzel text-3xl sm:text-4xl font-black text-white">
              <span className="text-gold-gradient">FREQUENTLY ASKED QUESTIONS</span>
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-[#0e0e14] overflow-hidden transition-all duration-200 hover:border-amber-500/30"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base text-zinc-100">{faq.q}</span>
                    <span className="p-1 rounded-lg bg-zinc-900 text-amber-300">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed border-t border-zinc-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COORDINATOR CONTACTS */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#14141c] to-[#0c0c10] border border-amber-500/30">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Connect With Us</span>
            <h4 className="font-cinzel text-2xl font-bold text-white mt-1">EVENT COORDINATORS</h4>
            <p className="text-xs text-zinc-400 mt-1">Reach out directly on WhatsApp or call for registrations and queries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coordinators.map((c) => (
              <div key={c.name} className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
                <div>
                  <h5 className="font-bold text-base text-white">{c.name}</h5>
                  <p className="text-xs text-amber-300 font-medium">{c.role}</p>
                  <p className="text-sm font-mono font-bold text-amber-200 mt-2">{c.phone}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center gap-2">
                  <a
                    href={c.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${c.phone}`}
                    className="py-2 px-3.5 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Campus Auditorium Complex • 16 & 17 October 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>support@genzsummit.org</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
