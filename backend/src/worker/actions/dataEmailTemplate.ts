export const dataEmailTemplate = (data :any) => {
  // safe defaults
  console.log(data)
  const {
    publicKey ,
    amount ,
    signature ,
    transactionData ,
    description ,
    type ,
    result ,
  } = data;

  const resultLabel = String(result).toLowerCase() === "success" ? "Success" :
                      String(result).toLowerCase() === "failed" ? "Failed" : String(result);

  const resultColor = resultLabel === "Success" ? "#16a34a" /* green */ :
                      resultLabel === "Failed" ? "#dc2626" /* red */ :
                      "#6b7280" /* gray */;

  const formattedAmount = typeof amount === "number" ? (amount/1e9).toLocaleString() : amount;

  // Minimal inline CSS for email compatibility
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>ChainCast Transaction Notification</title>
    <style>
      /* Basic resets for email clients */
      body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #111827; }
      .container { width: 100%; max-width: 680px; margin: 24px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
      .header { padding: 18px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #e6eef5; }
      .logo { width: 44px; height: 44px; border-radius: 8px; background: linear-gradient(135deg,#0ea5e9,#7c3aed); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:16px; }
      .brand { font-size: 16px; font-weight: 600; color:#0f172a; margin:0; }
      .sub { font-size: 12px; color:#475569; margin: 0; }

      .main { padding: 22px 24px; }
      .title { font-size: 18px; margin: 0 0 8px 0; font-weight: 700; color:#0f172a; }
      .lead { font-size: 14px; margin: 0 0 18px 0; color:#475569; }

      .summary { display: flex; gap: 16px; flex-wrap: wrap; }
      .card { flex: 1 1 220px; background: #f8fafc; border-radius: 10px; padding: 12px; border: 1px solid #eef2ff; }
      .card strong { display:block; font-size:12px; color:#6b7280; margin-bottom:6px; }
      .card .value { font-size:14px; font-weight:700; color:#0f172a; word-break:break-all; }

      .center-block { margin: 18px 0; padding: 14px; background: linear-gradient(180deg,#ffffff,#fbfdff); border-radius: 10px; border: 1px solid #e6eef5; text-align: left; }
      .desc { font-size: 14px; color:#0f172a; margin: 0 0 8px 0; }
      .meta { font-size: 13px; color:#475569; margin:0; word-break:break-word; }

      .details { margin-top: 14px; font-size: 13px; color:#475569; }
      .pre { background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 8px; overflow:auto; font-family: monospace; font-size:12px; line-height:1.4; }

      .footer { padding: 16px 24px; border-top: 1px solid #e6eef5; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
      .small { font-size:12px; color:#6b7280; }

      /* result badge */
      .badge { display:inline-block; padding:6px 10px; border-radius:999px; font-weight:700; font-size:12px; color:#fff; }

      /* mobile */
      @media (max-width:520px) {
        .summary { flex-direction: column; }
      }
    </style>
  </head>
  <body>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <div class="container" role="article" aria-roledescription="email">
            <div class="header">
              <div class="logo">CC</div>
              <div>
                <p class="brand">ChainCast</p>
                <p class="sub">Transaction Notification</p>
              </div>
              <div style="margin-left:auto; text-align:right;">
                <span class="badge" style="background:${resultColor};">${resultLabel}</span>
              </div>
            </div>

            <div class="main">
              <h1 class="title">Transaction ${type}</h1>
              <p class="lead">A quick summary of the transaction activity related to <strong>${publicKey}</strong>.</p>

              <div class="summary" role="group" aria-label="Transaction summary">
                <div class="card">
                  <strong>Amount</strong>
                  <div class="value">${formattedAmount}</div>
                </div>

                <div class="card">
                  <strong>Type</strong>
                  <div class="value">${type}</div>
                </div>

                <div class="card">
                  <strong>Signature</strong>
                  <div class="value">${signature}</div>
                </div>
              </div>

              <div class="center-block" role="region" aria-label="Description">
                <p class="desc">${description}</p>
                <p class="meta">Result: <strong style="color:${resultColor};">${resultLabel}</strong></p>
              </div>

              <div class="details">
                <p style="margin:0 0 8px 0;"><strong>Transaction data</strong></p>
                <div class="pre" aria-hidden="false">${escapeHtml(String(transactionData))}</div>
              </div>
            </div>

            <div class="footer">
              <div class="small">If you didn't expect this transaction, please contact ChainCast support.</div>
              <div class="small">© ${new Date().getFullYear()} ChainCast</div>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Inline JS-free safe helper: no external images or fonts to maximize deliverability -->
  </body>
  </html>
  `;
};

// Simple HTML escaper to reduce injection issues in email content
function escapeHtml(str : string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
