import { Resend } from "resend";
import QRCode from "qrcode";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      id,
      ticketId,
      event,
      eventKey,
      teamName,
      collegeName,
      leaderName,
      leaderEmail,
      memberCount,
      phone,
      fee,
      utrNumber,
    } = req.body;

    if (!leaderEmail) {
      return res.status(400).json({
        success: false,
        message: "Leader email is missing",
      });
    }

    if (!leaderName) {
      return res.status(400).json({
        success: false,
        message: "Leader name is missing",
      });
    }

    const finalTicketId =
      ticketId ||
      "GZS-" + Math.floor(100000 + Math.random() * 900000);

    const eventDate =
      eventKey === "bob"
        ? "17 October 2026"
        : "16 October 2026";

    const qrData = JSON.stringify({
      ticketId: finalTicketId,
      registrationId: id,
      event,
      eventKey,
      teamName,
      collegeName,
      leaderName,
      memberCount,
    });

    const qrCodeBuffer = await QRCode.toBuffer(qrData, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: "H",
    });

    console.log("Sending ticket to:", leaderEmail);
    console.log("Ticket ID:", finalTicketId);

    const response = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        "GEN-Z SUMMIT <onboarding@resend.dev>",

      to: leaderEmail,

      subject: `🎟️ Your GEN-Z SUMMIT 2026 Ticket — ${finalTicketId}`,

      html: `
        <div style="
          background:#050507;
          padding:40px 20px;
          color:white;
          font-family:Arial,Helvetica,sans-serif;
        ">

          <div style="
            max-width:650px;
            margin:auto;
            background:#111114;
            border:1px solid #29292f;
            border-radius:18px;
            overflow:hidden;
          ">

            <div style="
              padding:35px 25px;
              text-align:center;
              background:#09090b;
            ">
              <h1 style="
                margin:0;
                font-size:32px;
                font-weight:900;
                letter-spacing:3px;
              ">
                GEN-Z SUMMIT 2026
              </h1>

              <p style="
                margin-top:10px;
                color:#f59e0b;
                font-size:13px;
                letter-spacing:2px;
                font-weight:bold;
              ">
                THE FLAGSHIP EVENT OF NSS
              </p>
            </div>

            <div style="padding:35px 30px;">

              <h2 style="
                margin-top:0;
                font-size:28px;
              ">
                YOU'RE IN 🎉
              </h2>

              <p style="
                font-size:18px;
                color:#dddddf;
              ">
                Hello <strong>${leaderName}</strong>,
              </p>

              <p style="
                font-size:16px;
                line-height:1.6;
                color:#bbbbc2;
              ">
                Your registration has been approved successfully.
                Your official GEN-Z SUMMIT ticket is below.
              </p>

              <div style="
                margin-top:30px;
                padding:25px;
                border:1px solid #33333a;
                border-radius:14px;
                background:#0b0b0e;
              ">

                <p style="
                  margin:0;
                  color:#888891;
                  font-size:12px;
                  text-transform:uppercase;
                  letter-spacing:1px;
                ">
                  Event
                </p>

                <h2 style="
                  margin:8px 0 0;
                  font-size:25px;
                ">
                  ${event || "GEN-Z SUMMIT EVENT"}
                </h2>

                <p style="
                  color:#f59e0b;
                  font-weight:bold;
                  margin-bottom:0;
                ">
                  ${eventDate}
                </p>

              </div>

              <div style="
                margin-top:20px;
                border:1px solid #33333a;
                border-radius:14px;
                overflow:hidden;
              ">

                <div style="padding:15px 20px;border-bottom:1px solid #29292f;">
                  <span style="color:#77777f;font-size:12px;">
                    TEAM
                  </span>
                  <br />
                  <strong>${teamName || "—"}</strong>
                </div>

                <div style="padding:15px 20px;border-bottom:1px solid #29292f;">
                  <span style="color:#77777f;font-size:12px;">
                    COLLEGE / INSTITUTION
                  </span>
                  <br />
                  <strong>${collegeName || "—"}</strong>
                </div>

                <div style="padding:15px 20px;border-bottom:1px solid #29292f;">
                  <span style="color:#77777f;font-size:12px;">
                    TEAM LEADER
                  </span>
                  <br />
                  <strong>${leaderName || "—"}</strong>
                </div>

                <div style="padding:15px 20px;border-bottom:1px solid #29292f;">
                  <span style="color:#77777f;font-size:12px;">
                    MEMBERS
                  </span>
                  <br />
                  <strong>${memberCount || "—"}</strong>
                </div>

                <div style="padding:15px 20px;">
                  <span style="color:#77777f;font-size:12px;">
                    TICKET ID
                  </span>
                  <br />
                  <strong style="
                    font-size:18px;
                    color:#f59e0b;
                    letter-spacing:2px;
                  ">
                    ${finalTicketId}
                  </strong>
                </div>

              </div>

              <div style="
                margin-top:30px;
                padding:30px 20px;
                text-align:center;
                border-top:1px dashed #33333a;
              ">

                <p style="
                  font-size:16px;
                  font-weight:bold;
                ">
                  YOUR ENTRY QR CODE
                </p>

                <img
                  src="cid:ticketqr"
                  alt="Ticket QR Code"
                  width="250"
                  height="250"
                  style="
                    background:white;
                    padding:10px;
                    border-radius:10px;
                  "
                />

                <p style="
                  margin-top:20px;
                  color:#888891;
                  font-size:13px;
                  line-height:1.6;
                ">
                  Present this QR code at the event entrance.
                  <br />
                  Keep this email safe.
                </p>

              </div>

            </div>

            <div style="
              padding:25px;
              text-align:center;
              border-top:1px solid #29292f;
              color:#77777f;
              font-size:12px;
              line-height:1.6;
            ">
              GEN-Z SUMMIT 2026
              <br />
              NSS · Geethanjali College of Engineering & Technology
            </div>

          </div>

        </div>
      `,

      attachments: [
        {
          filename: `${finalTicketId}-QR.png`,
          content: qrCodeBuffer.toString("base64"),
          contentId: "ticketqr",
        },
      ],
    });

    console.log("Resend response:", response);

    return res.status(200).json({
      success: true,
      message: "Ticket email sent successfully",
      ticketId: finalTicketId,
      emailId: response?.data?.id || null,
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to send ticket",
    });
  }
}