import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Copy, Check, Download, ShieldCheck, ArrowRight, ArrowLeft, Clock, Mail, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addRegistration } from '../utils/registrationStore';

export default function BookingSection({ eventKey = 'danzora' }) {
  const [step, setStep] = useState(1);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const eventConfig = {
    danzora: {
      name: 'DANZORA',
      type: 'Dance',
      subtitle: 'Inter-College Dance Championship (16 Oct 2026)',
      fee: 1099,
      logo: '/assets/danzora_logo.jpg',
      prizes: '₹15,000 Total (1st: ₹8,000 | 2nd: ₹4,500 | 3rd: ₹2,500)',
      teamLabel: 'Dance Crew / Team Name',
      teamPlaceholder: 'e.g. Rhythm Syndicate',
      memberMin: 6,
      memberMax: 25,
      memberDefault: '10',
      genreLabel: 'Dance Style / Performance Theme',
      genrePlaceholder: 'e.g. Hip-Hop / Urban Choreotheatre / Fusion',
    },
    bob: {
      name: 'BATTLE OF THE BANDS',
      type: 'Music',
      subtitle: 'Inter-College Music Championship (17 Oct 2026)',
      fee: 899,
      logo: '/assets/battle_of_bands_logo.jpg',
      prizes: '₹10,000 Total (1st: ₹6,500 | 2nd: ₹3,500)',
      teamLabel: 'Band Name',
      teamPlaceholder: 'e.g. Velvet Overdrive',
      memberMin: 3,
      memberMax: 8,
      memberDefault: '5',
      genreLabel: 'Music Genre / Track List',
      genrePlaceholder: 'e.g. Rock / Metal / Indie Fusion (2 Covers, 1 Original)',
    }
  };

  const current = eventConfig[eventKey] || eventConfig.danzora;

  const [formData, setFormData] = useState({
    collegeName: '',
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    memberCount: current.memberDefault,
    genreStyle: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!formData.teamName.trim()) newErrors.teamName = `${current.teamLabel} is required`;
    if (!formData.leaderName.trim()) newErrors.leaderName = 'Team leader / Representative name is required';
    if (!formData.leaderEmail.trim() || !/\S+@\S+\.\S+/.test(formData.leaderEmail)) {
      newErrors.leaderEmail = 'Valid email address is required';
    }
    if (!formData.leaderPhone.trim() || formData.leaderPhone.length < 10) {
      newErrors.leaderPhone = 'Valid 10-digit WhatsApp number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('8328477757-2@axl');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleConfirmPayment = () => {
    if (!utrNumber.trim() || utrNumber.length < 8) {
      setErrors({ utr: 'Please enter a valid 12-digit UPI reference / UTR number from your payment receipt' });
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const created = addRegistration(formData, eventKey, current.fee, utrNumber);

      setTicketData({
        ticketId: created.ticketId,
        timestamp: created.submittedAt,
        ...formData,
        event: current.name,
        fee: current.fee,
        utr: utrNumber,
      });

      setStep(3);

      try {
        confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ffd700', '#ffffff', '#fbbf24', '#d97706']
        });
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  };

  const handleDownloadPass = () => {
    window.print();
  };

  return (
    <div id="booking" className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#14141c] to-[#0a0a0d] border-2 border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.25)] text-zinc-100">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={current.logo}
            alt={current.name}
            className="w-16 h-16 rounded-2xl border-2 border-amber-400/60 object-cover shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl sm:text-2xl font-black text-white">{current.name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                SLOT BOOKING
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">{current.subtitle}</p>
          </div>
        </div>

        <div className="sm:text-right bg-zinc-900/90 p-3.5 rounded-2xl border border-amber-500/30">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Championship Registration Fee</span>
          <p className="font-cinzel text-2xl font-black text-amber-300 text-glow-gold">₹{current.fee}</p>
          <span className="text-[11px] text-emerald-400 font-medium">Official Slot Application</span>
        </div>
      </div>

      {/* STEP PROGRESS */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-8 text-xs font-semibold">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-300' : 'text-zinc-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-amber-500 text-black font-black' : 'bg-zinc-800 text-zinc-400'}`}>1</span>
          <span>{current.type === 'Dance' ? 'Crew Details' : 'Band Details'}</span>
        </div>
        <div className="h-px w-10 sm:w-20 bg-zinc-800"></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-300' : 'text-zinc-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-amber-500 text-black font-black' : 'bg-zinc-800 text-zinc-400'}`}>2</span>
          <span>Scan UPI (₹{current.fee})</span>
        </div>
        <div className="h-px w-10 sm:w-20 bg-zinc-800"></div>
        <div className={`flex items-center gap-2 ${step === 3 ? 'text-amber-300' : 'text-zinc-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-amber-400 text-black font-black' : 'bg-zinc-800 text-zinc-400'}`}>3</span>
          <span>Confirmation</span>
        </div>
      </div>

      {/* STEP 1: FORM DETAILS */}
      {step === 1 && (
        <form onSubmit={handleProceedToPayment} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                College / University Name * (Cross-college not allowed)
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                placeholder="e.g. St. Xavier's College"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm placeholder-zinc-500"
              />
              {errors.collegeName && <p className="text-xs text-rose-400 mt-1">{errors.collegeName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {current.teamLabel} *
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                placeholder={current.teamPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm placeholder-zinc-500"
              />
              {errors.teamName && <p className="text-xs text-rose-400 mt-1">{errors.teamName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {current.type === 'Dance' ? 'Crew Leader Name *' : 'Band Leader Name *'}
              </label>
              <input
                type="text"
                name="leaderName"
                value={formData.leaderName}
                onChange={handleInputChange}
                placeholder="Full name of representative"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm placeholder-zinc-500"
              />
              {errors.leaderName && <p className="text-xs text-rose-400 mt-1">{errors.leaderName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Leader WhatsApp Number *
              </label>
              <input
                type="tel"
                name="leaderPhone"
                value={formData.leaderPhone}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm placeholder-zinc-500"
              />
              {errors.leaderPhone && <p className="text-xs text-rose-400 mt-1">{errors.leaderPhone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Registered Email (QR Ticket Pass sent here upon approval) *
              </label>
              <input
                type="email"
                name="leaderEmail"
                value={formData.leaderEmail}
                onChange={handleInputChange}
                placeholder="leader@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm placeholder-zinc-500"
              />
              {errors.leaderEmail && <p className="text-xs text-rose-400 mt-1">{errors.leaderEmail}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Number of Members ({current.memberMin} - {current.memberMax})
              </label>
              <input
                type="number"
                name="memberCount"
                value={formData.memberCount}
                onChange={handleInputChange}
                min={current.memberMin}
                max={current.memberMax}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {current.genreLabel}
              </label>
              <input
                type="text"
                name="genreStyle"
                value={formData.genreStyle}
                onChange={handleInputChange}
                placeholder={current.genrePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm placeholder-zinc-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:brightness-110 text-black shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2"
            >
              <span>Proceed to Official Payment (₹{current.fee})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: OFFICIAL UPI QR CODE PAYMENT */}
      {step === 2 && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="text-center">
            <h4 className="text-xl font-bold text-white font-cinzel">
              Scan Official PhonePe QR & Pay ₹{current.fee}
            </h4>
            <p className="text-xs text-amber-300 mt-1">
              Official UPI: <span className="font-mono font-bold text-white select-all">8328477757-2@axl</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-5 rounded-2xl bg-[#08080b] border border-amber-500/30">
            {/* Real Uploaded PhonePe QR Image */}
            <div className="p-3 bg-white rounded-2xl shadow-xl flex flex-col items-center">
              <img
                src="/assets/payment_qr.png"
                alt="Official Payment QR"
                className="w-48 h-48 object-contain rounded-xl"
              />
              <span className="text-[11px] font-bold text-zinc-900 mt-1.5 flex items-center gap-1">
                <span>Scan via any UPI App</span>
              </span>
            </div>

            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-zinc-900 border border-amber-500/30">
                <p className="text-[10px] text-zinc-400 uppercase font-semibold">Official Festival UPI ID</p>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-sm font-mono font-bold text-amber-300 select-all">8328477757-2@axl</code>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 text-xs transition-colors flex items-center gap-1 border border-amber-500/40"
                  >
                    {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-zinc-300 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Payable Amount: <strong className="text-white">₹{current.fee}.00</strong></span>
                </p>
                <p className="text-[11px] text-zinc-400">
                  Coordinators: Sai Mithil, Roshan Siddarth, Nawaz
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Enter 12-Digit UPI Transaction ID / UTR Number *
            </label>
            <input
              type="text"
              value={utrNumber}
              onChange={(e) => {
                setUtrNumber(e.target.value);
                if (errors.utr) setErrors(prev => ({ ...prev, utr: '' }));
              }}
              placeholder="e.g. 428190348219 (from your payment receipt)"
              maxLength={16}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm font-mono placeholder-zinc-500"
            />
            {errors.utr && <p className="text-xs text-rose-400 mt-1">{errors.utr}</p>}
            <p className="text-[11px] text-zinc-400 mt-1.5">
              💡 Our admin team verifies this UTR against our bank statement before dispatching your QR ticket pass to your email.
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Form</span>
            </button>
            <button
              type="button"
              disabled={isVerifying}
              onClick={handleConfirmPayment}
              className="px-7 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:brightness-110 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Slot & UTR</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUBMISSION RECEIPT */}
      {step === 3 && ticketData && (
        <div className="space-y-6 max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-pulse">
            <Clock className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-black">
              SUBMITTED • AWAITING ADMIN APPROVAL
            </span>
            <h4 className="text-2xl font-black text-white font-cinzel mt-2.5">
              REGISTRATION QUEUED!
            </h4>
            <p className="text-xs text-zinc-300 mt-1">
              Your application has been received. Our coordinators will verify your UTR and dispatch your official QR Entry Pass directly to <strong>{ticketData.leaderEmail}</strong>!
            </p>
          </div>

          {/* Luxury Gold & Diamond Pass Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#181822] to-[#0c0c10] border-2 border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.3)] p-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/genz_summit_logo.png"
                  alt="Summit Logo"
                  className="w-14 h-14 object-contain filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                />
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">Official Summit Application</span>
                  <h5 className="font-cinzel text-lg font-black text-white">{current.name}</h5>
                  <p className="text-xs text-amber-300">{eventKey === 'bob' ? '17 Oct 2026' : '16 Oct 2026'}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400">Application ID</span>
                <p className="font-mono font-bold text-sm text-yellow-400">{ticketData.ticketId}</p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                  UTR: {ticketData.utr.slice(-6)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-4 text-xs">
              <div>
                <span className="text-zinc-400 text-[10px]">Team / Band</span>
                <p className="font-bold text-white truncate">{ticketData.teamName}</p>
              </div>
              <div>
                <span className="text-zinc-400 text-[10px]">College</span>
                <p className="font-bold text-amber-200 truncate">{ticketData.collegeName}</p>
              </div>
              <div>
                <span className="text-zinc-400 text-[10px]">Representative</span>
                <p className="font-bold text-white truncate">{ticketData.leaderName}</p>
              </div>
              <div>
                <span className="text-zinc-400 text-[10px]">Destination Email</span>
                <p className="font-mono text-zinc-300 truncate">{ticketData.leaderEmail}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>QR Ticket will be emailed upon approval</span>
              </span>
              <span className="text-amber-400 font-bold">Fee: ₹{ticketData.fee}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDownloadPass}
              className="flex-1 py-3 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-amber-200 border border-amber-500/40 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Print Application Slip</span>
            </button>
            <button
              onClick={() => {
                setStep(1);
                setUtrNumber('');
              }}
              className="py-3 px-6 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
