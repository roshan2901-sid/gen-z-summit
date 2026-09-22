// Registration data storage with LocalStorage persistence

const STORAGE_KEY = 'genz_summit_registrations_v2';

const INITIAL_DATA = [];


/* =========================================================
   GET ALL REGISTRATIONS
========================================================= */

export function getStoredRegistrations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(INITIAL_DATA)
      );

      return INITIAL_DATA;
    }

    return JSON.parse(data);

  } catch (error) {
    console.error(
      'Failed to read registrations from localStorage:',
      error
    );

    return INITIAL_DATA;
  }
}


/* =========================================================
   SAVE REGISTRATIONS
========================================================= */

export function saveRegistrations(list) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(list)
    );

    // Notify other components that registration data changed
    window.dispatchEvent(
      new Event('registrationsUpdated')
    );

  } catch (error) {
    console.error(
      'Failed to write registrations to localStorage:',
      error
    );
  }
}


/* =========================================================
   ADD NEW REGISTRATION
========================================================= */

export function addRegistration(
  formData,
  eventKey,
  fee,
  utrNumber
) {
  const current = getStoredRegistrations();

  const eventName =
    eventKey === 'bob'
      ? 'BATTLE OF THE BANDS'
      : 'DANZORA';

  const prefix =
    eventKey === 'bob'
      ? 'BOB'
      : 'DNZ';

  const randomNum = Math.floor(
    1000 + Math.random() * 9000
  );

  const ticketId =
    `GZ26-${prefix}-${randomNum}`;

  const regId =
    `REG-${Date.now().toString().slice(-4)}`;

  const now = new Date();

  const formattedDate =
    now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const newEntry = {
    id: regId,

    ticketId,

    event: eventName,

    eventKey,

    collegeName:
      formData.collegeName || '',

    teamName:
      formData.teamName || '',

    leaderName:
      formData.leaderName || '',

    leaderEmail:
      formData.leaderEmail || '',

    leaderPhone:
      formData.leaderPhone || '',

    memberCount:
      formData.memberCount || '',

    genreStyle:
      formData.genreStyle || 'N/A',

    utr:
      utrNumber || '',

    fee,

    // Registration starts as pending
    status: 'pending',

    submittedAt:
      formattedDate,

    approvedAt:
      null,

    // Email has NOT been sent yet
    emailSent:
      false,
  };

  const updated = [
    newEntry,
    ...current,
  ];

  saveRegistrations(updated);

  return newEntry;
}


/* =========================================================
   APPROVE REGISTRATION
========================================================= */

export function approveRegistration(id) {
  const current =
    getStoredRegistrations();

  const now =
    new Date().toLocaleDateString(
      'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );

  const updated =
    current.map((item) => {

      if (item.id === id) {

        return {
          ...item,

          status: 'approved',

          approvedAt: now,

          // IMPORTANT:
          // Email is NOT marked as sent here.
          // It will only become true after
          // the Resend API succeeds.
          emailSent: false,
        };
      }

      return item;
    });

  saveRegistrations(updated);

  return updated.find(
    (item) => item.id === id
  );
}


/* =========================================================
   MARK EMAIL AS SENT
========================================================= */

export function markEmailSent(id) {
  const current =
    getStoredRegistrations();

  const updated =
    current.map((item) => {

      if (item.id === id) {

        return {
          ...item,

          emailSent: true,
        };
      }

      return item;
    });

  saveRegistrations(updated);

  return updated.find(
    (item) => item.id === id
  );
}


/* =========================================================
   MARK EMAIL AS FAILED
========================================================= */

export function markEmailFailed(id) {
  const current =
    getStoredRegistrations();

  const updated =
    current.map((item) => {

      if (item.id === id) {

        return {
          ...item,

          emailSent: false,
        };
      }

      return item;
    });

  saveRegistrations(updated);

  return updated.find(
    (item) => item.id === id
  );
}


/* =========================================================
   REJECT REGISTRATION
========================================================= */

export function rejectRegistration(
  id,
  reason = 'Invalid payment transaction reference'
) {
  const current =
    getStoredRegistrations();

  const updated =
    current.map((item) => {

      if (item.id === id) {

        return {
          ...item,

          status: 'rejected',

          rejectionReason: reason,
        };
      }

      return item;
    });

  saveRegistrations(updated);

  return updated.find(
    (item) => item.id === id
  );
}


/* =========================================================
   EXPORT REGISTRATIONS TO CSV
========================================================= */

export function exportRegistrationsToCSV() {
  const data =
    getStoredRegistrations();

  const headers = [
    'ID',
    'Ticket Code',
    'Event',
    'Team/Band Name',
    'College',
    'Leader Name',
    'Email',
    'Phone',
    'Members',
    'Fee',
    'UTR',
    'Status',
    'Email Sent',
    'Submitted At',
    'Approved At',
  ];

  const rows =
    data.map((item) => [

      item.id,

      item.ticketId,

      `"${item.event}"`,

      `"${item.teamName}"`,

      `"${item.collegeName}"`,

      `"${item.leaderName}"`,

      item.leaderEmail,

      item.leaderPhone,

      item.memberCount,

      item.fee,

      `"${item.utr}"`,

      item.status.toUpperCase(),

      item.emailSent
        ? 'YES'
        : 'NO',

      `"${item.submittedAt}"`,

      `"${item.approvedAt || 'N/A'}"`,
    ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [
      headers.join(','),
      ...rows.map(
        (row) => row.join(',')
      ),
    ].join('\n');

  const encodedUri =
    encodeURI(csvContent);

  const link =
    document.createElement('a');

  link.setAttribute(
    'href',
    encodedUri
  );

  link.setAttribute(
    'download',
    `GenZ_Summit_Registrations_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`
  );

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}