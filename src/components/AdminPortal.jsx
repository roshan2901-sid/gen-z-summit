import React, { useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  XCircle,
  Clock3,
  Mail,
  Send,
  Download,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  Music,
  Trophy,
  AlertCircle,
  X,
} from 'lucide-react';

import {
  getStoredRegistrations,
  approveRegistration,
  markEmailSent,
  markEmailFailed,
  rejectRegistration,
  exportRegistrationsToCSV,
} from '../utils/registrationStore';

export default function AdminPortal({ onBackToSite }) {
  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [emailNotification, setEmailNotification] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState(
    'Invalid payment transaction reference'
  );

  const loadData = () => {
    setRegistrations(getStoredRegistrations());
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('registrationsUpdated', handleUpdate);

    return () => {
      window.removeEventListener(
        'registrationsUpdated',
        handleUpdate
      );
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);

    loadData();

    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  /*
   * APPROVE REGISTRATION + SEND REAL TICKET EMAIL
   */
  const handleApprove = async (id) => {
    if (isSending) return;

    const approved = approveRegistration(id);

    if (!approved) {
      alert('Could not approve this registration.');
      return;
    }

    loadData();

    setIsSending(true);

    try {
      const response = await fetch('/api/send-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(approved),
      });

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            `Ticket email failed. Server returned ${response.status}.`
        );
      }

      /*
       * Only mark email as sent AFTER
       * the API successfully sends it.
       */
      markEmailSent(approved.id);

      loadData();

      setEmailNotification({
        recipient: approved.leaderEmail,
        teamName: approved.teamName,
        event: approved.event,
        ticketId: approved.ticketId,
        date:
          approved.eventKey === 'bob'
            ? '17 October 2026'
            : '16 October 2026',
      });
    } catch (error) {
      console.error('Ticket email failed:', error);

      /*
       * Registration remains approved,
       * but emailSent stays false.
       */
      markEmailFailed(approved.id);

      loadData();

      alert(
        `Registration approved, but the ticket email could not be sent.\n\n${error.message}`
      );
    } finally {
      setIsSending(false);
    }
  };

  /*
   * REJECT REGISTRATION
   */
  const handleReject = (id) => {
    const rejected = rejectRegistration(
      id,
      rejectReason
    );

    if (rejected) {
      loadData();
      setRejectModal(null);
      setRejectReason(
        'Invalid payment transaction reference'
      );
    }
  };

  /*
   * FILTER + SEARCH
   */
  const filteredRegistrations = registrations.filter(
    (item) => {
      const matchesFilter =
        filter === 'all' ||
        item.status === filter;

      const search =
        searchTerm.toLowerCase().trim();

      if (!search) {
        return matchesFilter;
      }

      const matchesSearch = [
        item.id,
        item.ticketId,
        item.event,
        item.teamName,
        item.collegeName,
        item.leaderName,
        item.leaderEmail,
        item.utr,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(search)
        );

      return matchesFilter && matchesSearch;
    }
  );

  /*
   * STATISTICS
   */
  const totalApplications =
    registrations.length;

  const pendingCount =
    registrations.filter(
      (item) => item.status === 'pending'
    ).length;

  const approvedCount =
    registrations.filter(
      (item) => item.status === 'approved'
    ).length;

  const rejectedCount =
    registrations.filter(
      (item) => item.status === 'rejected'
    ).length;

  const emailsSent =
    registrations.filter(
      (item) =>
        item.status === 'approved' &&
        item.emailSent === true
    ).length;

  const emailsPending =
    registrations.filter(
      (item) =>
        item.status === 'approved' &&
        item.emailSent !== true
    ).length;

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#08080b]/95 backdrop-blur-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>

              <div>
                <h1 className="font-cinzel text-lg sm:text-xl font-black text-white">
                  GEN-Z SUMMIT
                </h1>

                <p className="text-[10px] text-amber-300 uppercase tracking-widest">
                  Admin Portal
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={handleRefresh}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition-colors"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-4 h-4 text-zinc-300 ${
                    isRefreshing
                      ? 'animate-spin'
                      : ''
                  }`}
                />
              </button>

              <button
                onClick={onBackToSite}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-xs font-bold text-zinc-200"
              >
                Back to Site
              </button>

            </div>

          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* PAGE TITLE */}
        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Secure Administration
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white">
                Registration Control
              </h2>

              <p className="text-sm text-zinc-400 mt-2">
                Verify registrations and issue official entry tickets.
              </p>

            </div>

            <button
              onClick={exportRegistrationsToCSV}
              className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>

          </div>

        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">

          <StatCard
            icon={<Users className="w-4 h-4" />}
            label="Applications"
            value={totalApplications}
          />

          <StatCard
            icon={<Clock3 className="w-4 h-4" />}
            label="Pending"
            value={pendingCount}
            accent="amber"
          />

          <StatCard
            icon={<CheckCircle2 className="w-4 h-4" />}
            label="Approved"
            value={approvedCount}
            accent="green"
          />

          <StatCard
            icon={<Mail className="w-4 h-4" />}
            label="QR Sent"
            value={emailsSent}
            accent="blue"
          />

          <StatCard
            icon={<AlertCircle className="w-4 h-4" />}
            label="Email Pending"
            value={emailsPending}
            accent="red"
          />

        </div>

        {/* SEARCH + FILTERS */}
        <div className="rounded-2xl bg-[#0c0c10] border border-zinc-800 p-4 mb-6">

          <div className="flex flex-col lg:flex-row gap-3">

            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search team, college, leader, ticket ID, UTR..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500/60 outline-none text-sm text-white placeholder:text-zinc-600"
              />

            </div>

            <div className="flex gap-2 flex-wrap">

              {[
                ['all', 'All'],
                ['pending', 'Pending'],
                ['approved', 'Approved'],
                ['rejected', 'Rejected'],
              ].map(([key, label]) => (

                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                    filter === key
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {label}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* REGISTRATIONS */}
        <div className="space-y-4">

          {filteredRegistrations.length === 0 ? (

            <div className="rounded-3xl bg-[#0c0c10] border border-zinc-800 py-20 text-center">

              <Users className="w-10 h-10 text-zinc-700 mx-auto mb-4" />

              <h3 className="text-lg font-bold text-zinc-300">
                No registrations found
              </h3>

              <p className="text-sm text-zinc-600 mt-2">
                New registrations will appear here.
              </p>

            </div>

          ) : (

            filteredRegistrations.map((item) => (

              <RegistrationCard
                key={item.id}
                item={item}
                isSending={isSending}
                onApprove={handleApprove}
                onReject={(id) => {
                  setRejectModal(id);
                }}
              />

            ))

          )}

        </div>

      </main>

      {/* EMAIL SUCCESS MODAL */}
      {emailNotification && (

        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-md rounded-3xl bg-[#101014] border border-emerald-500/30 shadow-2xl overflow-hidden">

            <div className="p-6 border-b border-zinc-800">

              <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>

              <h3 className="text-xl font-black text-white">
                Ticket Sent Successfully
              </h3>

              <p className="text-sm text-zinc-400 mt-2">
                The official entry ticket and QR code have been sent to:
              </p>

            </div>

            <div className="p-6 space-y-4">

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">

                <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Recipient
                </p>

                <p className="text-sm font-bold text-emerald-300 mt-1 break-all">
                  {emailNotification.recipient}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">

                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                    Team / Band
                  </p>

                  <p className="text-sm font-bold text-white mt-1">
                    {emailNotification.teamName}
                  </p>

                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">

                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                    Ticket ID
                  </p>

                  <p className="text-sm font-mono font-bold text-amber-300 mt-1">
                    {emailNotification.ticketId}
                  </p>

                </div>

              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">

                <p className="text-xs text-emerald-300 leading-relaxed">
                  The attendee should check their inbox and spam/junk folder for the official GEN-Z SUMMIT ticket.
                </p>

              </div>

            </div>

            <div className="p-5 border-t border-zinc-800">

              <button
                onClick={() =>
                  setEmailNotification(null)
                }
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-colors"
              >
                Done
              </button>

            </div>

          </div>

        </div>

      )}

      {/* REJECTION MODAL */}
      {rejectModal && (

        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-md rounded-3xl bg-[#101014] border border-red-500/20 shadow-2xl">

            <div className="p-6">

              <div className="flex items-center justify-between mb-5">

                <h3 className="text-lg font-black text-white">
                  Reject Registration
                </h3>

                <button
                  onClick={() =>
                    setRejectModal(null)
                  }
                  className="p-2 rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>

              </div>

              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Reason
              </label>

              <textarea
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(e.target.value)
                }
                rows={4}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 focus:border-red-500/50 outline-none p-3 text-sm text-white resize-none"
              />

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    setRejectModal(null)
                  }
                  className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    handleReject(rejectModal)
                  }
                  className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-400 text-black text-sm font-black"
                >
                  Reject
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  accent = 'default',
}) {
  const accentClasses = {
    default: 'text-zinc-300 bg-zinc-900 border-zinc-800',
    amber: 'text-amber-300 bg-amber-500/5 border-amber-500/20',
    green: 'text-emerald-300 bg-emerald-500/5 border-emerald-500/20',
    blue: 'text-blue-300 bg-blue-500/5 border-blue-500/20',
    red: 'text-red-300 bg-red-500/5 border-red-500/20',
  };

  return (
    <div
      className={`rounded-2xl border p-4 ${accentClasses[accent]}`}
    >

      <div className="flex items-center gap-2 opacity-80">
        {icon}

        <span className="text-[10px] uppercase tracking-wider font-bold">
          {label}
        </span>
      </div>

      <p className="text-2xl font-black text-white mt-3">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   REGISTRATION CARD
========================================================= */

function RegistrationCard({
  item,
  isSending,
  onApprove,
  onReject,
}) {
  const isPending =
    item.status === 'pending';

  const isApproved =
    item.status === 'approved';

  const isRejected =
    item.status === 'rejected';

  return (
    <div className="rounded-3xl bg-[#0c0c10] border border-zinc-800 overflow-hidden">

      {/* TOP */}
      <div className="p-5 sm:p-6">

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

          {/* LEFT */}
          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-2 mb-3">

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  isPending
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    : isApproved
                    ? item.emailSent
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    : 'bg-red-500/10 text-red-300 border-red-500/20'
                }`}
              >
                {isPending
                  ? '⏳ PENDING APPROVAL'
                  : isApproved
                  ? item.emailSent
                    ? '✓ APPROVED & QR SENT'
                    : '✓ APPROVED • EMAIL PENDING'
                  : '✕ REJECTED'}
              </span>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-400">
                {item.event}
              </span>

            </div>

            <div className="flex items-center gap-2">

              {item.eventKey === 'bob' ? (
                <Music className="w-5 h-5 text-amber-400" />
              ) : (
                <Trophy className="w-5 h-5 text-amber-400" />
              )}

              <h3 className="text-xl font-black text-white">
                {item.teamName}
              </h3>

            </div>

            <p className="text-xs text-zinc-500 mt-1 font-mono">
              {item.ticketId}
            </p>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-2">

            {isPending && (

              <>
                <button
                  onClick={() =>
                    onApprove(item.id)
                  }
                  disabled={isSending}
                  className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-black shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}

                  <span>
                    {isSending
                      ? 'Sending...'
                      : 'Approve & Send QR'}
                  </span>
                </button>

                <button
                  onClick={() =>
                    onReject(item.id)
                  }
                  disabled={isSending}
                  className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>

            )}

            {isApproved && (

              <button
                onClick={() =>
                  onApprove(item.id)
                }
                disabled={isSending}
                className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-amber-200 border border-zinc-800 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSending ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Mail className="w-3.5 h-3.5" />
                )}

                <span>
                  {isSending
                    ? 'Sending...'
                    : item.emailSent
                    ? 'Resend QR'
                    : 'Send QR'}
                </span>
              </button>

            )}

          </div>

        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">

          <InfoBox
            label="Leader"
            value={item.leaderName}
          />

          <InfoBox
            label="Email"
            value={item.leaderEmail}
          />

          <InfoBox
            label="College"
            value={item.collegeName}
          />

          <InfoBox
            label="Members"
            value={item.memberCount}
          />

          <InfoBox
            label="Phone"
            value={item.leaderPhone}
          />

          <InfoBox
            label="Fee"
            value={`₹${item.fee}`}
          />

          <InfoBox
            label="UTR"
            value={item.utr}
          />

          <InfoBox
            label="Submitted"
            value={item.submittedAt}
          />

        </div>

      </div>

      {/* FOOTER */}
      <div className="px-5 sm:px-6 py-3 bg-zinc-950/70 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">

        <div className="flex items-center gap-3">

          {isApproved && (
            <span className="text-[11px] text-zinc-500">
              Approved: {item.approvedAt}
            </span>
          )}

          {isApproved && (
            <span
              className={`text-[11px] font-bold ${
                item.emailSent
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`}
            >
              {item.emailSent
                ? '✓ Email sent'
                : '• Email pending'}
            </span>
          )}

          {isRejected && item.rejectionReason && (
            <span className="text-[11px] text-red-400">
              Reason: {item.rejectionReason}
            </span>
          )}

        </div>

        <span className="text-[10px] text-zinc-700 font-mono">
          Registration ID: {item.id}
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 min-w-0">

      <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold">
        {label}
      </p>

      <p className="text-xs text-zinc-300 mt-1 truncate">
        {value || '—'}
      </p>

    </div>
  );
}