import React from 'react';
import { Users, Clock, Flame, Volume2, Sparkles } from 'lucide-react';

export default function BattleOfBandsSection() {
  const judgingCriteria = [
    {
      name: 'Musical Tightness & Instrument Mastery',
      desc: 'Timekeeping, groove precision, instrumental clarity and overall band chemistry.',
    },
    {
      name: 'Vocal Dynamics, Pitch & Harmonies',
      desc: 'Lead vocal projection, intonation, vocal range and harmony between performers.',
    },
    {
      name: 'Song Arrangement & Originality',
      desc: 'Creative song structure, musical interpretation, transitions and originality.',
    },
    {
      name: 'Stage Energy, Hype & Crowd Connection',
      desc: 'Performance charisma, stage presence, energy and audience engagement.',
    },
  ];

  const judgingRules = [
    'Time-limit violations may attract deduction of marks or other penalties as determined by the organizers.',
    'Rule violations may also result in deductions or disqualification.',
    "The Judging Panel's decision shall be final with respect to competition scoring and qualification.",
    'Participants shall not directly approach or influence judges regarding scores or results.',
  ];

  const stageGear = [
  {
    item: 'Professional Stage & Performance Area',
    desc: 'Dedicated stage setup with proper performance space for participating bands.',
  },
  {
    item: 'PA & Sound System',
    desc: 'Venue sound reinforcement system for live performances.',
  },
  {
    item: 'Stage Monitoring',
    desc: 'Standard stage monitoring setup for performers.',
  },
  {
    item: 'Vocal Microphones',
    desc: 'Standard microphones available for vocal performances.',
  }
];

  return (
    <section
      id="battle-of-bands"
      className="relative py-16 bg-[#050507] border-t border-amber-500/25 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />

              <span>
                Music Championship Arena • 17 October 2026
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider flex items-center gap-3">
              <span className="text-gold-gradient">
                MUSIC β
              </span>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300">
                REG: ₹899
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-xl">
              Inter-College Music Championship. Plug into the amps, roar into the arena, and conquer the stage.
            </p>
          </div>

         <a
  href="https://app.studenttribe.in/events/genz-summit"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 hover:brightness-110 text-black shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all"
>
  REGISTER FOR MUSIC β — ₹899
</a>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LOGO & SPECS CARD */}
          <div className="lg:col-span-4 rounded-3xl p-6 bg-[#0e0e14] border border-amber-500/35 shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col items-center justify-between text-center relative overflow-hidden">

            <div className="w-full">

              {/* BATTLE OF THE BANDS LOGO */}
              <div className="w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.3)] mb-4 bg-black">
                <img
                  src="/assets/battle_of_bands_logo.jpg"
                  alt="Battle of the Bands Logo"
                  className="w-full h-auto object-contain block"
                />
              </div>

              <h3 className="font-cinzel text-xl font-bold text-white">
                MUSIC β
              </h3>

              <p className="text-xs text-amber-300/90 font-medium mt-1">
                Inter-College Music Championship
              </p>
            </div>

            {/* QUICK SPECS */}
            <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-zinc-800 text-left">

              <div className="p-3 rounded-xl bg-zinc-900/90 border border-amber-500/25">
                <Users className="w-4 h-4 text-amber-400 mb-1" />

                <span className="text-[10px] text-zinc-400">
                  Band Size
                </span>

                <p className="text-xs font-bold text-white">
                  3 - 8 Musicians
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/90 border border-amber-500/25">
                <Clock className="w-4 h-4 text-amber-400 mb-1" />

                <span className="text-[10px] text-zinc-400">
                  Time Limit
                </span>

                <p className="text-xs font-bold text-white">
                  12 - 15 Minutes
                </p>
              </div>

            </div>
          </div>

          {/* EVALUATION & STAGE GEAR */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">

            {/* OFFICIAL EVALUATION RUBRIC */}
            <div className="rounded-3xl p-6 bg-[#0e0e14] border border-amber-500/35 shadow-[0_0_25px_rgba(245,158,11,0.15)]">

              <h4 className="font-cinzel text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />

                <span>
                  OFFICIAL EVALUATION RUBRIC
                </span>
              </h4>

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

              {/* JUDGING RULES */}
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

            {/* PROVIDED STAGE GEAR */}
            <div className="rounded-3xl p-6 bg-[#0e0e14] border border-amber-500/35">

              <h4 className="font-cinzel text-base font-bold text-white mb-4 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />

                <span>
                  PROVIDED STAGE GEAR & BACKLINE
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

                {stageGear.map((gear) => (
                  <div
                    key={gear.item}
                    className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800"
                  >
                    <p className="text-xs font-bold text-amber-200">
                      {gear.item}
                    </p>

                    <p className="text-[11px] text-zinc-400 mt-1 font-light">
                      {gear.desc}
                    </p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>

        {/* BATTLE OF BANDS BOOKING */}

      </div>
    </section>
  );
}