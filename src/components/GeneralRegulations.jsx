import React from 'react';
import { ShieldCheck, AlertTriangle, Zap } from 'lucide-react';

export default function GeneralRegulations() {
  const regulations = [
    'Registrations are open from 24 September 2026 to 14 October 2026.',

    'Participation is open to students from any college/institution.',

    'A team must consist exclusively of students from the same college/institution.',

    'Cross-college or mixed-institution teams are not permitted.',

    'Teams need not be officially registered dance crews, clubs, or cultural teams. Students may independently form a team specifically for DANZORA’26.',

    'Each team must consist of 6–25 members.',

    'Every participant must carry a valid college/student ID card for verification.',

    'A participant cannot represent more than one team in the competition.',

    'All registration information must be accurate and verifiable.',

    'The Organizing Committee reserves the right to verify the eligibility and institutional affiliation of any participant.',

    'Participants must respect the dignity and reputation of other teams, institutions, judges, organizers, and the venue.',
  ];

  return (
    <section
      id="general-regulations"
      className="relative py-16 bg-[#070709] border-t border-amber-500/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            GENERAL REGULATIONS
            ===================================================== */}

        <div className="rounded-3xl bg-[#0b0b10] border border-amber-500/50 overflow-hidden shadow-[0_0_35px_rgba(245,158,11,0.12)]">

          {/* HEADER */}
          <div className="px-5 sm:px-8 pt-7 pb-6">

            {/* FAIR PLAY PILL */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/50 border border-amber-500/60 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wide mb-4">

              <ShieldCheck className="w-4 h-4" />

              <span>
                FAIR PLAY &amp; OFFICIAL PROTOCOL
              </span>

            </div>

            {/* TITLE */}
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-wide uppercase">
              GENERAL REGULATIONS
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-zinc-400">
              Mandatory regulations for all participating teams.
            </p>

          </div>


          {/* REGULATION POINTS */}
          <div className="px-5 sm:px-8 pb-8 space-y-3">

            {regulations.map((text, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-xl bg-[#17171c] border border-zinc-800 hover:border-amber-500/40 transition-all flex items-start gap-3 sm:gap-4"
              >

                {/* NUMBER */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">

                  <span className="text-[11px] sm:text-xs font-black text-amber-300">
                    {index + 1}
                  </span>

                </div>

                {/* TEXT */}
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed pt-1">
                  {text}
                </p>

              </div>
            ))}

          </div>


          {/* COMPLIANCE NOTICE */}
          <div className="mx-5 sm:mx-8 mb-8 p-4 rounded-xl bg-amber-950/30 border border-amber-700/50 flex items-start gap-3">

            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />

            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Strict compliance is required. The Organizing Committee reserves
              the right to take appropriate action in case of violations.
            </p>

          </div>

        </div>


        {/* =====================================================
            CRITICAL SUBMISSION PROTOCOLS
            ===================================================== */}

        <div className="mt-5 rounded-2xl px-5 sm:px-6 py-5 bg-[#1d110d] border border-amber-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

          <div className="space-y-1">

            {/* TITLE */}
            <div className="flex items-center gap-2">

              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />

              <h3 className="text-xs sm:text-sm font-black text-white">
                Critical Submission Protocols:
              </h3>

            </div>

            {/* POINTS */}
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
              • Audio tracks must be sent <strong>48 hours prior to the event.</strong>
            </p>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
              • Cross-college participation is <strong>NOT allowed</strong>{' '}
              (All members must be from the same college).
            </p>

          </div>


          {/* STRICT ADHERENCE */}
          <div className="flex-shrink-0 self-start sm:self-center">

            <span className="inline-flex items-center px-3 py-2 rounded-md bg-amber-950/80 border border-amber-600/70 text-[10px] sm:text-xs font-mono font-bold text-amber-300">
              Strict Adherence
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}