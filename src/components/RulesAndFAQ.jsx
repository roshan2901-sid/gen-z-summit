import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
} from 'lucide-react';

export default function RulesAndFAQ({ onOpenRegister }) {
  const [openFaq, setOpenFaq] = useState(null);

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
      a: 'Danzora (Dance Championship) takes place on 16 October 2026 with a registration fee of ₹1,099 per crew. MUSIC β (Music Championship) takes place on 17 October 2026 with a registration fee of ₹899 per band.',
    },

    {
      q: 'How does registration work?',
      a: 'All event registrations and visitor passes are handled through the official Student Tribe event page. Use the BOOK / REGISTER buttons on the website to proceed to the registration portal.',
    },

    {
      q: 'What stage gear and facilities are provided for MUSIC β?',
      a: 'The event provides a professional stage and performance area, venue PA and sound system, standard stage monitoring, standard vocal microphones, and basic stage connectivity for compatible performance equipment.',
    },

    {
      q: 'Can an institution field multiple teams or bands?',
      a: 'Yes. An institution may register multiple teams or bands subject to the eligibility requirements and participant restrictions specified in the official event regulations.',
    },
  ];

 const coordinators = [
  {
    name: 'Akash Reddy',
    role: 'Event Coordinator',
    phone: '7416208451',
    whatsapp:
      'https://wa.me/917416208451?text=Hi%20Akash%20Reddy,%20inquiring%20about%20Gen-Z%20Summit',
  },
   {
    name: 'M. Akshith Reddy',
    role: 'Event Coordinator',
    phone: '8341353673',
    whatsapp:
      'https://wa.me/918341353673?text=Hi%20Akshith%20Reddy,%20inquiring%20about%20Gen-Z%20Summit',
  },
  {
    name: 'K. Y. Shashank',
    role: 'Event Coordinator',
    phone: '8790945868',
    whatsapp:
      'https://wa.me/918790945868?text=Hi%20Shashank,%20inquiring%20about%20Gen-Z%20Summit',
  },
  {
    name: 'K. Sai Mithil',
    role: 'Event Coordinator',
    phone: '8328070910',
    whatsapp:
      'https://wa.me/918328070910?text=Hi%20Sai%20Mithil,%20inquiring%20about%20Gen-Z%20Summit',
  },

  {
    name: 'G. Roshan Siddarth',
    role: 'Event Coordinator',
    phone: '8328477757',
    whatsapp:
      'https://wa.me/918328477757?text=Hi%20Roshan,%20inquiring%20about%20Gen-Z%20Summit',
  },

  {
    name: 'T. K. Nawaz',
    role: 'Event Coordinator',
    phone: '8309407465',
    whatsapp:
      'https://wa.me/918309407465?text=Hi%20Nawaz,%20inquiring%20about%20Gen-Z%20Summit',
  }
];

  return (
    <section
      id="rules"
      className="relative py-20 bg-[#060608] border-t border-amber-500/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            FAQ
            ===================================================== */}

        <div id="faq" className="mb-20 max-w-4xl mx-auto">

          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">

              <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />

              <span>
                Answers to Common Inquiries
              </span>

            </div>

            <h3 className="font-cinzel text-3xl sm:text-4xl font-black text-white">

              <span className="text-gold-gradient">
                FREQUENTLY ASKED QUESTIONS
              </span>

            </h3>

          </div>


          {/* FAQ ITEMS */}

          <div className="space-y-3">

            {faqs.map((faq, idx) => {

              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-[#0e0e14] overflow-hidden transition-all duration-200 hover:border-amber-500/30"
                >

                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : idx)
                    }
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                  >

                    <span className="font-semibold text-sm sm:text-base text-zinc-100">
                      {faq.q}
                    </span>

                    <span className="p-1 rounded-lg bg-zinc-900 text-amber-300 flex-shrink-0">

                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}

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


        {/* =====================================================
            EVENT COORDINATORS
            ===================================================== */}

        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#14141c] to-[#0c0c10] border border-amber-500/30">

          {/* HEADER */}

          <div className="text-center max-w-2xl mx-auto mb-8">

            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Connect With Us
            </span>

            <h4 className="font-cinzel text-2xl font-bold text-white mt-1">
              EVENT COORDINATORS
            </h4>

            <p className="text-xs text-zinc-400 mt-1">
              Reach out directly on WhatsApp or call for registrations
              and queries.
            </p>

          </div>


          {/* COORDINATOR CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {coordinators.map((c) => (

              <div
                key={c.name}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
              >

                <div>

                  <h5 className="font-bold text-base text-white">
                    {c.name}
                  </h5>

                  <p className="text-xs text-amber-300 font-medium">
                    {c.role}
                  </p>

                  <p className="text-sm font-mono font-bold text-amber-200 mt-2">
                    {c.phone}
                  </p>

                </div>


                {/* CONTACT BUTTONS */}

                <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center gap-2">

                  <a
                    href={c.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >

                    <MessageSquare className="w-3.5 h-3.5" />

                    <span>
                      WhatsApp
                    </span>

                  </a>


                  <a
                    href={`tel:${c.phone}`}
                    className="py-2 px-3.5 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >

                    <Phone className="w-3.5 h-3.5" />

                    <span>
                      Call
                    </span>

                  </a>

                </div>

              </div>

            ))}

          </div>


          {/* LOCATION + EMAIL */}

          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">

            <div className="flex items-center gap-2">

              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />

              <span>
                Campus Auditorium Complex • 16 &amp; 17 October 2026
              </span>

            </div>


            <div className="flex items-center gap-2">

              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />

              <span>
                nss@gcet.edu.in
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}