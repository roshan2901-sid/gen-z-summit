import React from 'react';
import { Users, Clock, Flame, Sparkles } from 'lucide-react';
import GeneralRegulations from './GeneralRegulations';
import BookingSection from './BookingSection';

export default function DanzoraSection() {
  const judgingCriteria = [
    {
      name: 'Choreography & Creativity',
      desc: 'Originality, creativity and quality of choreography.',
    },
    {
      name: 'Synchronization & Coordination',
      desc: 'Team synchronization, coordination and movement consistency.',
    },
    {
      name: 'Technique & Execution',
      desc: 'Precision, control, technique and quality of execution.',
    },
    {
      name: 'Musicality & Rhythm',
      desc: 'Interpretation of music, rhythm, timing and musical transitions.',
    },
    {
      name: 'Stage Presence & Energy',
      desc: 'Confidence, expressions, energy and audience engagement.',
    },
    {
      name: 'Overall Presentation',
      desc: 'Overall impact, presentation quality and performance coherence.',
    },
  ];

  const judgingRules = [
    'Time-limit violations may attract deduction of marks or other penalties as determined by the organizers.',
    'Rule violations may also result in deductions or disqualification.',
    "The Judging Panel's decision shall be final with respect to competition scoring and qualification.",
    'Participants shall not directly approach or influence judges regarding scores or results.',
  ];

  return (
    <section
      id="danzora"
      className="relative py-16 bg-[#070709] border-t border-amber-500/25 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Dance Championship Arena • 16 October 2026</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider flex items-center gap-3">
              <span className="text-gold-gradient">DANZORA</span>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300">
                REG: ₹1099
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-xl">
              Inter-College Dance Championship. Assemble your crew, own the floor, and make your mark.
            </p>
          </div>

          <a
            href="#danzora-booking"
            className="self-start md:self-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:brightness-110 text-black shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all"
          >
            Jump to Dance Booking (₹1099)
          </a>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Logo & Quick Specs Card */}
          <div className="lg:col-span-4 rounded-3xl p-6 bg-[#0e0e14] border border-amber-500/35 shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col items-center justify-between text-center relative overflow-hidden">

            <div className="w-full">
              <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.3)] mb-4">
                <img
                  src="/assets/danzora_logo.jpg"
                  alt="Danzora Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-cinzel text-xl font-bold text-white">
                DANZORA 2026
              </h3>

              <p className="text-xs text-amber-300/90 font-medium mt-1">
                Inter-College Dance Championship
              </p>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-zinc-800 text-left">

              <div className="p-3 rounded-xl bg-zinc-900/90 border border-amber-500/25">
                <Users className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] text-zinc-400">
                  Crew Size
                </span>
                <p className="text-xs font-bold text-white">
                  6 - 25 Dancers
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/90 border border-amber-500/25">
                <Clock className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] text-zinc-400">
                  Time Limit
                </span>
                <p className="text-xs font-bold text-white">
                  6 - 8 Minutes
                </p>
              </div>

            </div>
          </div>

          {/* Evaluation Section */}
          <div className="lg:col-span-8 flex flex-col justify-between">

            {/* OFFICIAL EVALUATION RUBRIC */}
            <div className="rounded-3xl p-6 bg-[#0e0e14] border border-amber-500/35 shadow-[0_0_25px_rgba(245,158,11,0.15)]">

              <h4 className="font-cinzel text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>OFFICIAL EVALUATION RUBRIC</span>
              </h4>

              {/* Evaluation Criteria */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

                {judgingCriteria.map((crit) => (
                  <div
                    key={crit.name}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-colors"
                  >
                    <p className="text-sm font-bold text-amber-200">
                      {crit.name}
                    </p>

                    <p className="text-xs text-zinc-400 mt-1.5 font-light leading-relaxed">
                      {crit.desc}
                    </p>
                  </div>
                ))}

              </div>

              {/* Judging Rules */}
              <div className="mt-6 pt-5 border-t border-zinc-800">

                <h5 className="text-sm font-bold text-white mb-3">
                  Judging & Competition Rules
                </h5>

                <div className="space-y-2.5">

                  {judgingRules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  ))}

                </div>

              </div>
            </div>

          </div>
        </div>

        {/* GENERAL REGULATIONS FOR DANCE */}
        <GeneralRegulations type="dance" />

        {/* INLINE BOOKING PORTAL FOR DANZORA */}
        <div id="danzora-booking">
          <BookingSection eventKey="danzora" />
        </div>

      </div>
    </section>
  );
}