# Biashara — Roadmap & Product Documentation

> **Document owner:** Business owner + developer
> **Last updated:** 2026-08-30
> **Purpose:** Record the product goal and the full roadmap so it is never forgotten.
> This file is the single source of truth for where the product is going.

---

## 1. The Goal (why this project exists)

Stop money "disappearing" between business and personal life in a Kenyan
second-hand furniture / mattress / sofa business, and run the whole operation
from one private, auto-updating system.

**Core capabilities (all built into Biashara):**

| Capability | Status |
|---|---|
| Second-hand buying + repairing + re-selling | ✅ Built |
| New stock (bought new, resold) | ✅ Built |
| Raw-material → finished-furniture manufacturing (BoM) | ✅ Built |
| Sales + full customer purchase history | ✅ Built |
| Purchases / restocking | ✅ Built |
| Loans at 5% interest (Ksh 50 per 1,000) | ✅ Built |
| Owner draw vs business money separation | ✅ Built |
| Cash-count leak detection | ✅ Built |
| Revenue/expense reports + insights | ✅ Built |
| Mobile web app (phone / tablet / desktop) | ✅ Built |
| **Automatic M-Pesa payment capture** | ⬜ **TO BUILD** |
| **Native mobile app experience** | ⬜ **TO BUILD** |

**North-star goal:** When a customer pays via M-Pesa, **the money and the sale
appear in Biashara automatically** — no typing — and the cash ledger stays
perfectly accurate so the owner can always see where every shilling is.

---

## 2. What "automatic M-Pesa" means (ONE app, TWO channels)

There is **ONE Biashara app**. It captures M-Pesa automatically through two
different technical channels, depending on the device — because iOS *cannot
read SMS from another app* (an Apple rule), so the only difference is *how* a
given device receives the payment data. It is **never two apps.**

### Channel A — SMS reading (a feature of the Android build)
- The **Android build of the Biashara app** (still one app) requests SMS
  permission and reads incoming M-Pesa messages.
- Parses: amount, sender, time, transaction code.
- Auto-matches to an open sale / loan, or lands in the Unallocated inbox.
- **Catches:** money to *any* number (Till, personal, friend), walk-ins, loan
  repayments. No Safaricom paperwork.
- **Why Android-only:** iOS forbids any app from reading another app's SMS.

### Channel B — Daraja API (iPhone, tablet, laptop, web)
- The same Biashara app / web app receives payments via Safaricom's official
  Daraja callback the instant money lands on a Business Till / Paybill.
- **Catches:** real-time, works on every device, no SMS needed.
- **Requires:** business registration, bank account, KRA PIN, Head-Office Till.
  ~1–5 weeks paperwork, ~KSh 1,800–3,000 setup.

### Device matrix (ONE app works everywhere)
| Device | How M-Pesa money gets in |
|---|---|
| Android phone | Channel A (SMS) + Channel B (Daraja) both available |
| iPhone | Channel B (Daraja) — only option |
| Tablet / laptop / web | Channel B (Daraja) |

### Processing rule (agreed design)
1. Payment arrives via **Daraja** or **SMS** → same ingest endpoint (deduped).
2. Auto-match to an open sale or loan (amount + name/phone).
3. Matched → mark paid, record the M-Pesa transaction.
4. Not matched → "Unallocated M-Pesa" inbox, one-tap assign in < 5s.
5. Everything flows into the cash ledger + M-Pesa vs Cash vs Bank report.

**In short:** you are NOT building a separate SMS app. You are building **one
Biashara mobile app**; a small part of its Android build reads SMS, and the
iPhone/web/tablet builds use Daraja instead. One app, two ways to receive money.

---

## 3. What "app like the M-Pesa app" means (the native experience)

Two things combined:

### 3a. Biashara as a real installable app
- **PWA first (fast, free, all devices):** `manifest.json` + service worker →
  installable icon on any phone/laptop, splash screen, offline caching.
  Ships first because it's immediate value with no store accounts.
- **Native apps (React Native or Flutter → iOS + Android):** real store apps,
  push notifications, full-screen. This is where the SMS reader lives on
  Android. Deliberately scheduled *after* PWA so we don't block progress.

### 3b. Push notifications
- Loan due-date reminders ("Amina's loan due Friday — Ksh 5,250").
- Unallocated M-Pesa alerts ("Ksh 2,000 received — needs assigning").
- Low-stock alerts.
- Requires native app / PWA with push + a push service (FCM / web push).

---

## 4. "Can one build a private app?" — explained & decided

Yes. There are 3 levels of "private":

| Level | What it means | Cost | Our choice |
|---|---|---|---|
| 1. Private web app (own server) | Only invitees with the link + login use it. Not public. | ~KSh 1–5k/mo hosting | ✅ **Core (Biashara today)** |
| 2. Private store app (closed/closed-testing track) | Native app on stores but only people you invite install it. | Android ~US$25 once; iOS US$99/yr | ✅ **For native apps** |
| 3. Side-load APK (most private) | Android only; never on a store; install from file. | Free | ✅ **For the SMS reader early builds** |

**Decision:** Keep Biashara on your own server (Level 1). Distribute the native
apps via **closed testing tracks** (Level 2) so they install like normal apps but
only you and chosen testers can download them. The SMS reader can be
side-loaded (Level 3) while it's in testing.

---

## 5. Architecture (how the pieces connect)

```
                    ┌─────────────────────────────────────────────┐
   Customer pays ──▶│  M-Pesa network                            │
                    └───────────────┬───────────────┬─────────────┘
                                    │               │
        ========== ONE APP ======== │               │ ============
        ║ Biashara Android build ║ ◀┘               └──▶ ║ Daraja API ║
        ║ (reads M-Pesa SMS as   ║    (iPhone/laptop/web:   (callback)
        ║  a feature of the app) ║     Daraja only)
        ==========================      │               ============
                       │               │
                       └───────────────┼───────────────────────┘
                                       │  (push M-Pesa payment events)
                                       ▼
                    ┌─────────────────────────────────────────────┐
                    │         Biashara web server (Node)          │
                    │  /api/mpesa/ingest  ← auto-match → ledger    │
                    └───────────────┬─────────────────────────────┘
                                    │
                        ┌───────────┴───────────┐
                        │   PostgreSQL (data)   │
                        └───────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
   Biashara web app          Biashara native mobile        (PWA)
   (phone/tablet/laptop)     ONE app (iOS + Android)     all devices
```

**Key new backend pieces to build:**
- `MpesaPayment` model (amount, sender, phone, transaction code, channel:
  `daraja` | `sms`, status: `allocated` | `unallocated`, matched ref).
- `/api/mpesa/ingest` endpoint — accepts SMS-parsed and Daraja callbacks.
- Auto-matching engine (amount + name/phone heuristics).
- "Unallocated M-Pesa" inbox UI + one-tap assign.
- `paymentMethod = "mpesa"` auto-linking to existing Sales/Loan records.
- M-Pesa vs Cash vs Bank revenue report.

---

## 6. Roadmap (ordered, with why)

### Phase 0 — Foundation (BUILT ✅)
- Full web app, customers, loans, manufacturing, cash control, installable
  PWA readiness. **Done.**

### Phase 1 — Automatic M-Pesa capture + one mobile app (NEXT)
**Goal:** M-Pesa money appears in Biashara with zero typing, through **one app**.
**Approach:** Build the backend ingest first (so any channel can push into it),
then build the **single native Biashara mobile app** whose **Android build**
reads SMS. No separate "SMS app" — it is one app.
> **Phase 1.1 design decisions are frozen** — see `docs/DECISIONS.md` (D1–D6) and the
> revised contract in `docs/MPESA_SPEC.md` (tolerance money, tenant-scoped M-Pesa models,
> signed idempotent ingest, simple refs, reversal/partial/overpayment rules).
- [ ] 1.1 Backend: `Tenant`/`MpesaDevice`/`MpesaPayment` models + `/api/mpesa/ingest`
       (signed, idempotent) + unallocated inbox UI (channel-agnostic, so SMS and
       Daraja both feed it).
- [ ] 1.2 Single native mobile app (React Native / Flutter) reusing the API.
- [ ] 1.3 Android build of that app: add `READ_SMS` + M-Pesa parsing feature.
- [ ] 1.4 Auto-matching: amount + name/phone → auto-mark sales & loans paid.
- [ ] 1.5 Unallocated inbox one-tap assign + M-Pesa vs Cash vs Bank report.
- [ ] 1.6 PWA install support (free all-device installed-app feel).
- [ ] 1.7 Push notifications (loan due, unallocated M-Pesa, low stock).
- [ ] 1.8 End-to-end with real money (send yourself KES, watch it land).

### Phase 2 — Daraja official integration (after volume justifies)
**Goal:** real-time M-Pesa on a Business Till, all devices (iPhone included).
- [ ] 2.1 Owner completes Safaricom paperwork (see §8 checklist).
- [ ] 2.2 Link Daraja callbacks to `/api/mpesa/ingest`.
- [ ] 2.3 Go-live with production credentials; Android SMS stays as a feature
       of the same app (and as fallback for non-Till numbers).

### Phase 3 — Optional polish
- Customer follow-up list (who to call, who owes, days since last purchase).
- Reports export (PDF/CSV).
- WhatsApp integration for receipts/reminders.

---

## 7. Cost & effort estimates (2026, Kenya)

| Item | One-time | Monthly |
|---|---|---|
| Biashara hosting (own server) | — | KSh 1,000–5,000 |
| Android SMS reader dev | KSh 0–20,000 (self-built) | — |
| Native mobile app dev | KSh 30,000–100,000 | — |
| Apple Developer account (iOS) | US$99/yr | — |
| Play Store registration | US$25 once | — |
| Daraja integration dev (later) | KSh 30,000–60,000 | — |
| SSL certificate | KSh 5,000–15,000/yr | — |

---

## 8. Daraja paperwork checklist (for Phase 3 — start when ready)

From Safaricom's published requirements (2026):
- [ ] Business registration (sole proprietor or limited company)
- [ ] Business bank account (letter / cancelled cheque)
- [ ] Owner's National ID copy
- [ ] Owner's KRA PIN certificate (+ company KRA PIN if limited)
- [ ] Business name + logo (PNG ≥ 1024×1024)
- [ ] Contact email for the Paybill/Till (use it for all correspondence)
- [ ] Website reachable over HTTPS with Privacy + Refund policies (Daraja reviewers check this)
- [ ] Paybill or Business Till upgraded to **Head Office** (email
      M-PESABusiness@safaricom.co.ke)
- [ ] Daraja developer account created by the **owner** (never a third party)
- [ ] Public HTTPS callback URL returning `{ ResultCode: 0 }`
- [ ] OTP access on the Till owner's phone for go-live

**Fees:** API access is free; Paybill ~KSh 1,800 setup + ~KSh 100/mo; most
cost is developer time. Only bother when processing ~KSh 300k+/month.

---

## 9. Definition of Done for the whole goal

- [ ] A customer pays via M-Pesa (any number) and Biashara records it automatically,
      matching to the sale/loan or to an unallocated inbox — **no typing**.
- [ ] Cash ledger + revenue reports stay accurate automatically.
- [ ] Biashara opens on the phone/laptop like a normal installed app and sends
      useful push notifications.
- [ ] The app remains **private** — only the owner and invited people can use it.
- [ ] The whole system still works offline-of-Safaricom (manual entry remains a fallback).
