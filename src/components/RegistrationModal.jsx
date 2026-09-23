import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Copy, Check, Download, ShieldCheck, ArrowRight, ArrowLeft, Clock, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addRegistration } from '../utils/registrationStore';

export default function RegistrationModal({ isOpen, onClose, initialEvent = 'danzora' }) {
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(initialEvent);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const [formData, setFormData] = useState({
    collegeName: '',
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    memberCount: '8',
    genreStyle: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialEvent) {
      setSelectedEvent(initialEvent);
    }
  }, [initialEvent]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setUtrNumber('');
      setErrors({});
    }
  }, [isOpen]);

  const eventDetails = {
    danzora: {
      name: 'DANZORA',
      subtitle: 'Inter-College Dance Championship (16 Oct 2026)',
      fee: 1099,
      logo: '/assets/danzora_logo.jpg',
      prizes: '1st: ₹8,000 | 2nd: ₹4,500 | 3rd: ₹2,500',
      teamLimit: '6 - 25 Dancers',
      label: 'Dance Crew Name',
    },
    bob: {
      name: 'BATTLE OF THE BANDS',
      subtitle: 'Inter-College Music Championship (17 Oct 2026)',
      fee: 899,
      logo: '/assets/battle_of_bands_logo.jpg',
      prizes: '1st: ₹6,500 | 2nd: ₹3,500',
      teamLimit: '3 - 8 Musicians',
      label: 'Band Name',
    }
  };

  const currentEvent = eventDetails[selectedEvent] || eventDetails.danzora;

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
    if (!formData.teamName.trim()) newErrors.teamName = 'Team/Band name is required';
    if (!formData.leaderName.trim()) newErrors.leaderName = 'Leader name is required';
    if (!formData.leaderEmail.trim() || !/\S+@\S+\.\S+/.test(formData.leaderEmail)) {
      newErrors.leaderEmail = 'Valid email is required (for receiving ticket)';
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
      setErrors({ utr: 'Please enter a valid 12-digit UPI reference / UTR number' });
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const created = addRegistration(formData, selectedEvent, currentEvent.fee, utrNumber);

      setTicketData({
        ticketId: created.ticketId,
        timestamp: created.submittedAt,
        ...formData,
        event: currentEvent.name,
        fee: currentEvent.fee,
        utr: utrNumber,
      });

      setStep(3);

      try {
        confetti({
          particleCount: 150,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ffd700', '#ffffff', '#fbbf24', '#d97706']
        });
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e0e14] border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden text-zinc-100 my-auto">
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-[#121218]">
          <div className="flex items-center gap-3">
            <img
              src="/assets/genz_summit_logo.png"
              alt="Summit Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            />
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-amber-200">
                REGISTRATION PORTAL
              </h3>
              <p className="text-xs text-zinc-400 font-medium">GEN-Z SUMMIT 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-[#08080b] border-b border-zinc-800 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-300' : 'text-zinc-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-500 text-black font-black' : 'bg-zinc-800 text-zinc-400'}`}>1</span>
            <span>Details</span>
          </div>
          <div className="h-px w-8 sm:w-16 bg-zinc-800"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-300' : 'text-zinc-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-500 text-black font-black' : 'bg-zinc-800 text-zinc-400'}`}>2</span>
            <span>UPI QR (₹{currentEvent.fee})</span>
          </div>
          <div className="h-px w-8 sm:w-16 bg-zinc-800"></div>
          <div className={`flex items-center gap-2 ${step === 3 ? 'text-amber-300' : 'text-zinc-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-amber-400 text-black font-black' : 'bg-zinc-800 text-zinc-400'}`}>3</span>
            <span>Submitted</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                  Select Championship
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedEvent('danzora')}
                    className={`cursor-pointer rounded-xl p-3 border transition-all duration-200 flex items-center gap-3 ${
                      selectedEvent === 'danzora'
                        ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800 opacity-80'
                    }`}
                  >
                    <img src="/assets/danzora_logo.jpg" alt="Danzora" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-cinzel font-bold text-sm text-white">DANZORA</p>
                      <p className="text-[11px] text-zinc-400">16 Oct • Dance</p>
                      <span className="text-xs font-bold text-amber-400">Fee: ₹1,099</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedEvent('bob')}
                    className={`cursor-pointer rounded-xl p-3 border transition-all duration-200 flex items-center gap-3 ${
                      selectedEvent === 'bob'
                        ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800 opacity-80'
                    }`}
                  >
                    <img src="/assets/battle_of_bands_logo.jpg" alt="Battle of the Bands" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-cinzel font-bold text-sm text-white">BATTLE OF BANDS</p>
                      <p className="text-[11px] text-zinc-400">17 Oct • Music</p>
                      <span className="text-xs font-bold text-amber-400">Fee: ₹899</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    placeholder="e.g. Loyola College"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs focus:border-amber-400 focus:outline-none"
                  />
                  {errors.collegeName && <p className="text-xs text-rose-400 mt-1">{errors.collegeName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    {currentEvent.label} *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    placeholder="Team/Band Name"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs focus:border-amber-400 focus:outline-none"
                  />
                  {errors.teamName && <p className="text-xs text-rose-400 mt-1">{errors.teamName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Leader Name *
                  </label>
                  <input
                    type="text"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    placeholder="Representative Name"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs focus:border-amber-400 focus:outline-none"
                  />
                  {errors.leaderName && <p className="text-xs text-rose-400 mt-1">{errors.leaderName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="leaderPhone"
                    value={formData.leaderPhone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs focus:border-amber-400 focus:outline-none"
                  />
                  {errors.leaderPhone && <p className="text-xs text-rose-400 mt-1">{errors.leaderPhone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Registered Email (Ticket QR emailed here upon admin approval) *
                  </label>
                  <input
                    type="email"
                    name="leaderEmail"
                    value={formData.leaderEmail}
                    onChange={handleInputChange}
                    placeholder="leader@gmail.com"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs focus:border-amber-400 focus:outline-none"
                  />
                  {errors.leaderEmail && <p className="text-xs text-rose-400 mt-1">{errors.leaderEmail}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-black shadow-lg flex items-center gap-2"
                >
                  <span>Pay ₹{currentEvent.fee} via Official QR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-base font-bold text-white font-cinzel">
                  Scan Official PhonePe QR & Pay ₹{currentEvent.fee}
                </h4>
                <p className="text-xs text-amber-300">
                  Beneficiary: <span className="font-mono font-bold text-white select-all">8328477757-2@axl</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 p-4 rounded-xl bg-[#08080b] border border-zinc-800">
                <div className="p-2.5 bg-white rounded-xl shadow-lg flex flex-col items-center">
                  <img
                    src="/assets/payment_qr.png"
                    alt="Official Payment QR"
                    className="w-40 h-40 object-contain rounded-lg"
                  />
                  <span className="text-[10px] font-bold text-zinc-900 mt-1">Scan with any UPI App</span>
                </div>

                <div className="space-y-2.5 text-left">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-amber-500/30">
                    <p className="text-[10px] text-zinc-400">Official UPI ID</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <code className="text-xs font-mono font-bold text-amber-300 select-all">8328477757-2@axl</code>
                      <button
                        onClick={handleCopyUpi}
                        className="p-1 px-1.5 rounded bg-zinc-800 text-amber-200 text-[10px] flex items-center gap-1 border border-zinc-700"
                      >
                        {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-300">
                    Payable Amount: <strong className="text-white">₹{currentEvent.fee}.00</strong>
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    Coordinators: Sai Mithil, Roshan Siddarth, Nawaz
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Enter 12-Digit UPI Transaction ID / UTR *
                </label>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => {
                    setUtrNumber(e.target.value);
                    if (errors.utr) setErrors(prev => ({ ...prev, utr: '' }));
                  }}
                  placeholder="e.g. 428190348219"
                  maxLength={16}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono focus:outline-none focus:border-amber-400"
                />
                {errors.utr && <p className="text-xs text-rose-400 mt-1">{errors.utr}</p>}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-zinc-400 hover:text-zinc-200"
                >
                  ← Back to Details
                </button>
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={handleConfirmPayment}
                  className="px-6 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-2"
                >
                  {isVerifying ? 'Submitting...' : 'Submit Slot & UTR'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && ticketData && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-cinzel">
                APPLICATION SUBMITTED!
              </h4>
              <p className="text-xs text-zinc-300">
                Your registration has been queued. Our admin team will verify your payment UTR and send your official entry QR pass to <strong>{ticketData.leaderEmail}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/30 text-left text-xs space-y-1">
                <p><strong>Application Code:</strong> <span className="font-mono text-amber-300">{ticketData.ticketId}</span></p>
                <p><strong>Team / Band:</strong> {ticketData.teamName} ({ticketData.collegeName})</p>
                <p><strong>Event:</strong> {ticketData.event}</p>
                <p><strong>Submitted UTR:</strong> <span className="font-mono">{ticketData.utr}</span></p>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
