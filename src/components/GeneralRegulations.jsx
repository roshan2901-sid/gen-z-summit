import React from 'react';
import { Scale, AlertTriangle } from 'lucide-react';

export default function GeneralRegulations({ type = 'dance' }) {
  const isMusic = type === 'music' || type === 'bob';

  const regulations = isMusic
    ? [
        'Participation is open to students from any college/institution.',
        'A band must consist exclusively of students from the same college/institution.',
        'Cross-college or mixed-institution bands are not permitted.',
        'Every participant must carry a valid college/student ID card for verification.',
        'A participant cannot represent more than one band in the competition.',
        'All registration information must be accurate and verifiable.',
        'The Organizing Committee reserves the right to verify eligibility and institutional affiliation.',
        'Participants must respect the dignity and reputation of other bands, institutions, judges, organizers, and the venue.',
      ]
    : [
        'Registrations are open from 22 September 2026 to 14 October 2026.',
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

      const guidelines = [
  {
    title: 'Performance Evaluation',
    items: [
      'Choreography & Creativity',
      'Synchronization & Coordination',
      'Technique & Execution',
      'Musicality & Rhythm',
      'Stage Presence & Energy',
      'Overall Presentation',
    ],
  },
  {
    title: 'Judging & Penalties',
    items: [
      'Time-limit violations may attract deduction of marks or other penalties as determined by the organizers.',
      'Rule violations may also result in deductions or disqualification.',
      "The Judging Panel's decision shall be final with respect to competition scoring and qualification.",
      'Participants shall not directly approach or influence judges regarding scores or results.',
    ],
  },
  {
    title: 'Safety, Conduct & Property',
    items: [
      'Any participant found creating a safety or security concern may be removed from the venue.',
      'Damage to college/event property caused by a participant or team may result in recovery of the cost and/or disqualification.',
      'Fighting, abusive language, harassment, intimidation, vandalism, threatening behaviour, or deliberate disruption of the event is strictly prohibited.',
    ],
  },
  {
    title: 'Music & Technical Requirements',
    items: [
      'Any last-minute change to the submitted track shall require approval from the Technical/Organizing Team.',
      'Participants should carry a backup copy of their music.',
      'Teams must ensure that their submitted audio file is clear, complete, and compatible with the prescribed technical requirements.',
    ],
  },
  {
    title: 'Reporting & Qualification',
    items: [
      'Reporting time on the event day is strictly 9:30 AM.',
      'Qualification from Round 1 to Round 2 shall be based on the evaluation of the official judging panel.',
      'The Organizing Committee may communicate Round 2 reporting instructions through the official communication channels.',
      'Teams must be prepared to perform whenever their name/number is called by the stage management team.',
    ],
  },
];

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#14141c] to-[#0c0c10] border-2 border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.2)]">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/50 flex items-center justify-center text-amber-300">
            <Scale className="w-5 h-5" />
          </div>

          <div>
            <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
              • GENERAL REGULATIONS
            </h4>

            <p className="text-xs text-zinc-400">
              Mandatory regulations for all participating {isMusic ? 'bands' : 'Danzora teams'}.
            </p>
          </div>

        </div>

        <span className="px-3 py-1 rounded-full bg-amber-950/80 text-[11px] font-mono font-bold text-amber-300 border border-amber-500/40 w-fit">
          Official Protocol
        </span>

      </div>

      <div className="space-y-3">

        {regulations.map((text, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3 hover:border-amber-500/40 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center flex-shrink-0 text-amber-300 font-mono text-xs font-bold">
              {idx + 1}
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {text}
            </p>
          </div>
        ))}

      </div>

      <div className="mt-5 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3 text-xs text-amber-200/90">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />

        <span>
          Strict compliance is required. The Organizing Committee reserves the right to take appropriate action in case of violations.
        </span>
      </div>

    </div>
  );
}