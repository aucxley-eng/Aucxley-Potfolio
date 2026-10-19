# SchoolHub Academy — Implementation Roadmap

A Kenyan primary school management system (SMS) for a school currently 100% on
paper. This document covers the gap analysis, phased implementation plan,
architecture decisions, and local context that drives every design choice.

---

## Table of Contents

1. [Project Context](#project-context)
2. [Current State — What Exists](#current-state--what-exists)
3. [Gap Analysis](#gap-analysis)
4. [Architecture Decisions](#architecture-decisions)
5. [Phase 0: Stabilize What Exists](#phase-0-stabilize-what-exists)
6. [Phase 1: CBC Assessment Engine]
(#phase-1-cbc-assessment-engine)
7. [Phase 2: M-Pesa + Finance Overhaul](#phase-2-mpesa--finance-overhaul)
8. [Phase 3: SMS Gateway](#phase-3-sms-gateway)
9. [Phase 4: KEMIS Compliance](#phase-4-kemis-compliance)
10. [Phase 5: Payroll & Staff Management](#phase-5-payroll--staff-management)
11. [Phase 6: Offline-First / PWA](#phase-6-offline-first--pwa)
12. [Phase 7: Portal & Communication Polish](#phase-7-portal--communication-polish)
13. [Dependency Graph](#dependency-graph)
14. [Tech Stack Additions](#tech-stack-additions)
15. [Local Context — Why It Matters](#local-context--why-it-matters)

---

## Project Context

**SchoolHub Academy** is a three-tier school management system for a Kenyan
primary school (Nairobi-based contact info, +254 phone numbers). It replaces
exercise books, ledgers, and box files in a head teacher's office with a
digital system.

A Kenyan primary school SMS has seven core functional areas:

1. **Learner records / admissions** — Bio-data, class, stream, guardian
   contacts. Since January 2026, must align with **KEMIS** (Kenya Education
   Management Information System), which replaced NEMIS and tracks learners
   from primary through university using a verifiable Unique Identifier.

2. **CBC assessment and reporting** — Competency-Based Curriculum requires
   assessment across seven core competencies using a four-level rubric
   (Exceeding Expectations, Meeting Expectations, Approaching Expectations,
   Below Expectations). Heavier record-keeping than 8-4-4. Some schools
   still have upper classes finishing 8-4-4, so dual-curriculum support
   may be needed.

3. **Fees and finance** — Parents expect M-Pesa payment. The finance module
   integrates with Safaricom's Daraja API to generate invoices in KES,
   auto-reconcile M-Pesa payments, and send SMS confirmations. Public/
   government-aided schools also handle capitation funds from the Ministry.

4. **Attendance** — Daily register with automated SMS alerts to parents if
   a child is absent.

5. **Parent communication** — SMS-first (not app-first), because many
   parents have basic phones. Fee balances, exam results, and announcements
   pushed by text. Lightweight mobile web portal as a bonus for smartphone
   users.

6. **Staff/payroll and timetabling** — Teacher records, TSC numbers,
   timetable generation, leave tracking, payroll.

7. **Reporting to government** — Termly/annual returns, enrollment numbers,
   KEMIS submissions.

---

## Current State — What Exists

### Tech Stack

**Backend:** Django 5.x, Django REST Framework, SQLite3, Token-based auth

**Frontend:** React 19, Vite 8, Tailwind CSS 4, React Router 7, Axios,
Recharts, Lucide React

### Existing Django Apps (11)

| App | API Base | Models | What It Does |
|---|---|---|---|
| `accounts` | `/api/accounts/` | `User` (custom, 4 roles) | Registration, login, logout, profile, password change |
| `students` | `/api/students/` | `StudentProfile` | Full student CRUD with guardian, transport, canteen links |
| `teachers` | `/api/teachers/` | `TeacherProfile` | Teacher CRUD with qualification, salary, experience |
| `classes` | `/api/classes/` | `AcademicYear`, `Class`, `Section`, `ClassSchedule` | Academic structure, timetable |
| `attendance` | `/api/attendance/` | `Attendance` | Daily register, bulk marking, unique student+date |
| `grades` | `/api/grades/` | `Subject`, `Grade` | Marks-based grading (NOT CBC-compatible) |
| `exams` | `/api/exams/` | `Exam`, `ExamResult` | Exam creation and result recording |
| `fees` | `/api/fees/` | `FeeCategory`, `FeeStructure`, `FeePayment` | Fee management with partial payments |
| `transport` | `/api/transport/` | `BusRoute`, `BusStop`, `StudentTransport` | Route and stop management |
| `canteen` | `/api/canteen/` | `MealPlan`, `CanteenSubscription`, `DailyMenu` | Meal plans and subscriptions |
| `uniforms` | `/api/uniforms/` | `UniformItem`, `UniformOrder` | Uniform inventory and orders |

### Existing Frontend Pages

**Admin (12):** Dashboard, Students, Teachers, Classes, Attendance, Grades,
Exams, Fees, Transport, Canteen, Uniforms, Reports

**Public (6):** Home, About, Programs, Admissions, Gallery, Contact

**Student/Parent Portal (8):** Dashboard, Grades, Attendance, Fees, Transport,
Canteen, Notices, Profile

---

## Gap Analysis

### Missing Entirely

| Gap | Severity | Phase |
|---|---|---|
| CBC assessment engine (7 competencies, 4-level rubric) | **High** | Phase 1 |
| M-Pesa Darja API integration + auto-reconciliation | **High** | Phase 2 |
| SMS gateway (attendance alerts, fee reminders) | **High** | Phase 3 |
| KEMIS export/compliance | **High** | Phase 4 |
| Reports backend (`Reports.jsx` 404s) | **High** | Phase 0 |
| Payroll (TSC numbers, salary processing, payslips) | Medium | Phase 5 |
| Offline-first / PWA capability | Medium | Phase 6 |
| Capitation fund tracking | Medium | Phase 2 |
| Receipt generation (PDF/SMS) | Low-Medium | Phase 2 |
| Dual curriculum support (CBC + 8-4-4 legacy) | Low | Phase 1 |

### Incomplete or Broken

| Issue | Severity | Phase |
|---|---|---|
| Dashboard uses hardcoded mock data for fees and attendance charts | Medium | Phase 0 |
| No `permission_classes` on any backend viewset — any authenticated user can CRUD any resource | **High** | Phase 0 |
| Admin site not utilized — no models registered in `django.contrib.admin` | Low | Phase 0 |
| `TeacherProfile` missing `tsc_number` field | Medium | Phase 5 |
| Fee receipt numbers are free-text, no generation logic | Low | Phase 2 |
| Portal fee "Pay Now" button is a UI placeholder | Medium | Phase 2 |

---

## Architecture Decisions

### Why NOT rebuild Odoo

Odoo Community Edition is free, open-source, has a proper double-entry
accounting engine, and has community-built education modules. Reinventing
double-entry bookkeeping from scratch is where most DIY school systems go
wrong — a ledger with an unbalanced entry is worse than a paper ledger because
it looks authoritative.

**Chosen path: Build our own lightweight system** using a minimal double-entry
ledger table (never free-text amounts) instead of hand-rolling bookkeeping
logic. This gives total control and no Odoo licensing/hosting dependency.
The tradeoff is more development time, but the existing Django/React codebase
is already substantial and the team owns every line.

**The accounting engine is specified in full** in
[`backend/docs/accounting.md`](backend/docs/accounting.md): chart of accounts,
`journal_entries` / `journal_lines` schema, the balancing invariant, the
no-edit/no-delete reversal rule, derived (never stored) pupil balances, the
worked fee-cycle example, the Daraja callback failure-mode logic, and the
open design decisions to resolve before building (multi-invoice allocation,
overpayment policy, income recognition posture, waivers, receipt numbering,
offline payments).

### Key Design Principles

1. **SMS-first for parent communication** — Not app-first. Basic phones
   receive SMS; smartphones are a bonus tier.

2. **Offline-capable for rural connectivity** — Teachers must be able to
   enter marks and attendance offline, sync later.

3. **CBC-native, not retrofitted** — The assessment engine is purpose-built
   for rubric levels, not a generic grading system with CBC labels bolted on.

4. **KEMIS-compliant from the start** — Learner records include the fields
   KEMIS requires, with export functionality built in.

5. **Dual-curriculum capable** — System handles both CBC and legacy 8-4-4
   so schools with mixed year groups don't need two systems.

---

## Phase 0: Stabilize What Exists

**Timeline:** Weeks 1–2
**Goal:** Fix broken things, secure the backend, wire up real data.

### Tasks

#### 0.1 Reports Backend

The frontend `Reports.jsx` page already has the UI with report type selector,
filter form, and data table. But the backend has no `reports` app — every API
call 404s.

**Build:**
- New Django app `reports` with the following endpoints:

| Endpoint | Purpose |
|---|---|
| `GET /api/reports/attendance/` | Attendance summary by class/date range |
| `GET /api/reports/fees/` | Fee collection report by category/period |
| `GET /api/reports/grades/` | Grade distribution by subject/class |
| `GET /api/reports/enrollment/` | Enrollment numbers by class/gender |
| `GET /api/reports/transport/` | Transport usage and revenue |
| `GET /api/reports/canteen/` | Canteen subscription and revenue |

- Each endpoint accepts query params: `start_date`, `end_date`, `class_id`,
  `section_id` for filtering
- Return aggregated data in the format the frontend expects (check
  `Reports.jsx` for the expected response shape)

#### 0.2 Fix Dashboard Mock Data

`Dashboard.jsx` contains hardcoded arrays:
- `MONTHLY_ATTENDANCE` — static attendance data
- `FEE_COLLECTION` — static paid/pending/overdue counts
- `MOCK_ACTIVITIES` — static activity feed items

**Replace with:**
- `GET /api/dashboard/stats/` — returns real stat cards (total students,
  total teachers, attendance rate, fees collected)
- `GET /api/dashboard/attendance-chart/` — returns monthly attendance data
  for the bar chart
- `GET /api/dashboard/fee-chart/` — returns fee collection breakdown for
  the pie chart
- `GET /api/dashboard/activities/` — returns recent system activity

#### 0.3 Backend Permissions

Currently no viewsets define `permission_classes`. Any authenticated user
can CRUD any resource, including students deleting other students or parents
accessing admin endpoints.

**Implement:**
- `IsAdmin` — full access to all admin endpoints (finance, staff, reports)
- `IsTeacher` — read access to students/classes, write access to
  attendance/grades for their assigned sections only
- `IsStudent` — read-only access to own profile, own grades, own attendance,
  own fee records
- `IsParent` — same as student but for their linked children
- Custom DRF permission classes in `accounts/permissions.py`
- Apply to every ViewSet via `permission_classes` attribute

#### 0.4 Admin Site Registration

Register all models in `django.contrib.admin` for quick back-office access.
This is a one-line-per-model task in each app's `admin.py` and gives the
head teacher a basic admin interface without needing the React frontend.

### Verification

- [ ] Reports page loads with real data (no 404s)
- [ ] Dashboard shows real numbers, not mock data
- [ ] A parent-role user cannot access `/api/fees/` admin endpoints
- [ ] All models visible in Django admin at `/admin/`

---

## Phase 1: CBC Assessment Engine

**Timeline:** Weeks 2–4
**Goal:** Replace marks-based grading with a CBC-native assessment system.

### Why This Matters

The Competency-Based Curriculum requires assessment across seven core
competencies using rubric levels, not percentage scores. The current `grades`
app uses `marks_obtained / total_marks` which is an 8-4-4 model. A generic
report card app can't handle CBC because the output isn't a number — it's a
rubric level per competency with a narrative comment. This needs to be
purpose-built.

### The 7 Core CBC Competencies

1. **Communication and Collaboration** — ability to express ideas and work
   with others
2. **Critical Thinking and Problem Solving** — analysis, reasoning, creative
   solutions
3. **Imagination and Creativity** — innovation, original thinking
4. **Citizenship** — values, ethics, participation in community
5. **Digital Literacy** — appropriate use of technology
6. **Self-Direction** — planning, persistence, self-awareness
7. **Learning to Learn** — metacognition, reflective practice

### The 4 Rubric Levels

| Level | Name | Description |
|---|---|---|
| 4 | Exceeding Expectations | Consistently demonstrates the competency at a high level |
| 3 | Meeting Expectations | Demonstrates the competency at the expected level |
| 2 | Approaching Expectations | Developing the competency, needs some support |
| 1 | Below Expectations | Significant support needed in this competency |

### New Models (in `grades` app or new `assessment` app)

```
Competency
  - name          (CharField) — e.g. "Communication and Collaboration"
  - code          (CharField, unique) — e.g. "CC"
  - description   (TextField)
  - curriculum    (CharField: cbc / legacy_844) — allows 8-4-4 subjects too

RubricLevel
  - level         (IntegerField: 1-4)
  - name          (CharField) — e.g. "Exceeding Expectations"
  - description   (TextField)

CBCAssessment
  - student       (FK -> StudentProfile)
  - competency    (FK -> Competency)
  - rubric_level  (FK -> RubricLevel)
  - narrative     (TextField) — teacher's qualitative comment
  - term          (CharField) — Term 1, Term 2, Term 3
  - academic_year (FK -> AcademicYear)
  - assessed_by   (FK -> TeacherProfile)
  - assessed_date (DateField)
  - created_at    (DateTimeField, auto)
  - updated_at    (DateTimeField, auto)

  class Meta:
    unique_together = ('student', 'competency', 'term', 'academic_year')

CBCReportCard
  - student       (FK -> StudentProfile)
  - academic_year (FK -> AcademicYear)
  - term          (CharField)
  - generated_date (DateField)
  - generated_by  (FK -> TeacherProfile)
  - overall_comment (TextField) — class teacher's overall remark
  - next_term_begins (DateField)
```

### Dual Curriculum Support

Add a `curriculum` field to `AcademicYear`:

```
AcademicYear
  - ...existing fields...
  - curriculum    (CharField: cbc / legacy_844 / mixed)
```

When `curriculum` is `mixed`, the system renders two report card formats:
- CBC students get the 7-competency rubric report
- Legacy students get the traditional marks/percentage/grade-letter report

The existing `Grade` model stays for legacy 8-4-4 students. The new
`CBCAssessment` model handles CBC students. The report card renderer
checks which model has records for the student and renders accordingly.

### Frontend Changes

- Refactor `Grades.jsx` admin page to detect curriculum mode
- CBC mode: competency selector, rubric level dropdown (not number input),
  narrative textarea per competency
- Legacy mode: subject, marks, total marks (existing UI)
- Student portal `PortalGrades.jsx`: show competency spider chart or
  rubric summary instead of just marks
- Add competency visualizations (spider/radar chart for 7 competencies)

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/assessments/competencies/` | GET/POST | List/create competencies |
| `/api/assessments/rubric-levels/` | GET | List rubric levels |
| `/api/assessments/cbc/` | GET/POST | List/create CBC assessments |
| `/api/assessments/cbc/bulk/` | POST | Bulk create for entire class (one term, all 7 competencies per student) |
| `/api/assessments/report-card/{student_id}/` | GET | Generate report card data for a student |
| `/api/assessments/report-card/{student_id}/pdf/` | GET | Generate PDF report card |

### Verification

- [ ] Can create CBC assessments for a student across all 7 competencies
- [ ] Bulk creation works for an entire class section
- [ ] Student portal shows rubric levels and narrative, not marks
- [ ] Report card renders correctly for both CBC and legacy students
- [ ] Existing 8-4-4 grade data is preserved and still accessible

---

## Phase 2: M-Pesa + Finance Overhaul

**Timeline:** Weeks 4–7
**Goal:** Auto-reconcile M-Pesa payments, generate receipts, track
capitation funds, and give real-time fee balances.

> **Note on sequencing:** see [`backend/docs/accounting.md`](backend/docs/accounting.md).
> The finance work is re-sequenced as the **critical path** — ledger core →
> opening balances → invoicing → Daraja sandbox → one-stream live pilot →
> whole-school scale — and every later phase gates on the ledger being proven
> against the paper books. The detailed double-entry engine (accounts,
> journal entries, balancing invariant, reversal rule, Suspense handling)
> is specified there and this phase implements it.

### Why This Matters

The fees module exists but is just a ledger — it records what happened, it
can't initiate or reconcile payments automatically. Parents overwhelmingly
pay via M-Pesa, and manual reconciliation against handwritten receipts is
slow and easy to exploit. A school finance system that doesn't integrate
with M-Pesa is still a paper system with extra steps.

### Daraja API Integration

**Prerequisites:**
- Safaricom Daraja developer account (developer.safaricom.co.ke)
- School must have a Paybill Number or Till Number
- Sandbox credentials for development, production credentials for live

**Integration model: C2B (Customer to Business)**
- Safaricom sends payment confirmation to school's callback URL
- Payment includes: amount, phone number, account number (student_id),
  transaction reference
- System matches `account_number` to `StudentProfile.student_id`
- Auto-creates `FeePayment` record and updates balance

**Callback flow:**
```
1. Admin creates invoice for student (FeePayment with status=pending)
2. Parent pays via M-Pesa paybill, using student_id as account number
3. Safaricom POSTs to /api/fees/mpesa/c2b/
4. System validates transaction, matches to student
5. FeePayment status updated: pending -> paid (or partial)
6. SMS confirmation sent to parent (Phase 3 dependency)
7. Receipt available in parent portal
```

### New and Updated Models

```
MpesaConfiguration
  - name              (CharField)
  - paybill_number    (CharField)
  - consumer_key      (CharField, encrypted)
  - consumer_secret   (CharField, encrypted)
  - passkey           (CharField, encrypted)
  - callback_url      (URLField)
  - environment       (CharField: sandbox / production)
  - is_active         (BooleanField)

MpesaTransaction
  - transaction_id    (CharField, unique) — Safaricom M-Pesa receipt number
  - account_number    (CharField) — student_id used as account
  - phone_number      (CharField)
  - amount            (DecimalField)
  - transaction_date  (DateTimeField)
  - status            (CharField: pending / completed / failed / reversed)
  - fee_payment       (FK -> FeePayment, nullable) — linked after reconciliation
  - raw_payload       (JSONField) — store original callback for audit
  - created_at        (DateTimeField, auto)

FeePayment
  - ...existing fields...
  - mpesa_transaction (FK -> MpesaTransaction, nullable)
  - receipt_url       (URLField, nullable) — link to generated PDF receipt
  - confirmed_by      (FK -> User, nullable) — for manual confirmations
  - confirmed_at      (DateTimeField, nullable)

CapitationFund
  - academic_year     (FK -> AcademicYear)
  - term              (CharField)
  - amount_allocated  (DecimalField) — amount from Ministry
  - amount_received   (DecimalField) — actual amount received
  - received_date     (DateField)
  - per_pupil_rate    (DecimalField) — capitation per learner
  - enrollment_count  (IntegerField) — students at time of disbursement
  - notes             (TextField)
  - created_at        (DateTimeField, auto)

FeeBalance (view or materialized)
  - student           (FK -> StudentProfile)
  - fee_category      (FK -> FeeCategory)
  - total_charged     (DecimalField) — sum of FeeStructure for this category
  - total_paid        (DecimalField) — sum of FeePayment for this category
  - outstanding       (DecimalField) — charged minus paid
  - last_payment_date (DateField, nullable)
  - aging             (CharField: current / 30_days / 60_days / 90_plus)
```

### Receipt Generation

- PDF receipt using `weasyprint` or `xhtml2pdf`
- School letterhead, logo, address
- Student name, class, fee category
- Amount, payment date, M-Pesa confirmation code
- Receipt number (auto-generated: `REC-{year}-{sequence}`)
- Downloadable from parent portal

### Fee Balance Engine

- Real-time outstanding balance per student, per fee category
- Aging buckets: current (0-30 days), 31-60 days, 60-90 days, 90+ days
- Dashboard widget showing total collected, total outstanding, aging breakdown
- Used by Phase 3 for automated fee reminders

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/fees/mpesa/config/` | GET/POST | M-Pesa configuration |
| `/api/fees/mpesa/c2b/` | POST | Safaricom C2B callback (no auth — Safaricom calls this) |
| `/api/fees/mpesa/transaction/` | GET | List M-Pesa transactions |
| `/api/fees/balance/` | GET | Fee balances (filtered by student/class) |
| `/api/fees/capitation/` | GET/POST | Capitation fund records |
| `/api/fees/receipt/{payment_id}/pdf/` | GET | Generate PDF receipt |
| `/api/fees/aging/` | GET | Fee aging report |

### Verification

- [ ] M-Pesa sandbox callback creates transaction records
- [ ] Payment auto-reconciles to correct student
- [ ] Fee balance updates in real-time after payment
- [ ] PDF receipt generates with correct data
- [ ] Capitation fund tracked separately from parent fees
- [ ] Aging report shows correct buckets

---

## Phase 3: SMS Gateway

**Timeline:** Weeks 7–9
**Goal:** Send attendance alerts, fee reminders, exam results, and
announcements via SMS to parents.

### Why This Matters

SMS-first is non-negotiable for Kenyan parent communication. Many parents
have basic phones without internet access. An app-based notification system
would miss the majority of guardians. Africa's Talking is the standard choice
in Kenya — Kenya-based, KES billing, sandbox for testing, handles M-Pesa
STK push too.

### Africa's Talking Integration

**Prerequisites:**
- Africa's Talking developer account (africastalking.com)
- Sandbox API key for development
- Production API key for live
- Test phone numbers registered in sandbox

**SDK:** `africastalking` Python package

### New App: `notifications`

```
SMSConfiguration
  - api_key           (CharField, encrypted)
  - username          (CharField)
  - sender_id         (CharField) — alphanumeric short code
  - environment       (CharField: sandbox / production)
  - is_active         (BooleanField)

NotificationTemplate
  - name              (CharField) — e.g. "attendance_absent", "fee_reminder"
  - template_text     (TextField) — with placeholders: {student_name}, {parent_name}, {amount}, etc.
  - notification_type (CharField: sms / email / push)
  - is_active         (BooleanField)

NotificationLog
  - recipient_phone   (CharField)
  - recipient_user    (FK -> User, nullable)
  - template          (FK -> NotificationTemplate)
  - message_text      (TextField) — final rendered message
  - notification_type (CharField: attendance_alert / fee_reminder / exam_result / announcement)
  - related_student   (FK -> StudentProfile, nullable)
  - status            (CharField: queued / sent / delivered / failed)
  - provider_id       (CharField, nullable) — Africa's Talking message ID
  - sent_at           (DateTimeField, nullable)
  - delivered_at      (DateTimeField, nullable)
  - error_message     (TextField, nullable)
  - created_at        (DateTimeField, auto)
```

### Notification Triggers

| Trigger | When | Recipient | Message |
|---|---|---|---|
| **Attendance alert** | Attendance marked as absent | Parent of absent student | "{student_name} was marked absent on {date}. If this is an error, contact the school." |
| **Fee reminder** | Scheduled (daily check) | Parents with outstanding balance > 0 | "Dear {parent_name}, {student_name}'s fee balance is KES {amount}. Please pay via M-Pesa paybill {number}." |
| **Fee confirmation** | M-Pesa payment confirmed | Paying parent | "Payment of KES {amount} received for {student_name}. M-Pesa ref: {ref}. Receipt: {link}" |
| **Exam results** | Grades published | Parent | "{student_name}'s {term} results: {competency_summary}. Login for full report." |
| **Announcement** | Admin sends broadcast | All parents or filtered by class | Custom message from admin |

### Background Job Queue

SMS sending must not block the request cycle. Use `django-q2` or `celery`
with Redis:

- Attendance alerts: immediate (synchronous preferred, async fallback)
- Fee reminders: daily scheduled job (e.g. 8:00 AM)
- Exam results: triggered after grades are published
- Announcements: immediate

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/notifications/sms/config/` | GET/POST | SMS provider configuration |
| `/api/notifications/templates/` | GET/POST | Message templates |
| `/api/notifications/logs/` | GET | Notification history with delivery status |
| `/api/notifications/send/` | POST | Manual SMS send (admin) |
| `/api/notifications/announcement/` | POST | Send broadcast announcement |
| `/api/notifications/stats/` | GET | Delivery statistics |

### Verification

- [ ] Absent student triggers SMS to parent in sandbox
- [ ] Fee payment triggers confirmation SMS
- [ ] Fee reminder job finds overdue accounts and sends messages
- [ ] Notification log shows delivery status from Africa's Talking
- [ ] Announcements can be filtered by class

---

## Phase 4: KEMIS Compliance

**Timeline:** Weeks 9–11
**Goal:** Align learner records with KEMIS schema and build export
functionality for government submissions.

### Why This Matters

KEMIS went live on January 9, 2026, replacing NEMIS. The Ministry described
NEMIS as too rigid and poorly integrated with other government systems. KEMIS
tracks learners from primary through university using a Unique Identifier
(ULI). Schools must submit data to KEMIS — this is a regulatory requirement,
not optional.

### StudentProfile Field Additions

Add KEMIS-required fields that don't currently exist:

```
StudentProfile
  - ...existing fields...
  - uli_number               (CharField, unique, nullable) — Unique Learner Identifier
  - birth_certificate_number (CharField, nullable)
  - national_id_number       (CharField, nullable) — for older students
  - county_code              (CharField) — IEBC county code
  - sub_county_code          (CharField) — IEBC sub-county code
  - ward_code                (CharField) — IEBC ward code
  - constituency_code        (CharField)
  - keph_level               (CharField) — education level code
  - special_needs            (BooleanField, default=False)
  - special_needs_type       (CharField, nullable)
  - orphans                  (BooleanField, default=False)
  - gifted                   (BooleanField, default=False)
```

### New Models

```
KEMISConfiguration
  - api_endpoint     (URLField)
  - api_key          (CharField, encrypted)
  - school_code      (CharField) — school's KEMIS registration code
  - county_code      (CharField)
  - sub_county_code  (CharField)
  - environment      (CharField: sandbox / production)

KEMISSubmission
  - academic_year    (FK -> AcademicYear)
  - term             (CharField)
  - submission_type  (CharField: enrollment / assessment / staff)
  - records_count    (IntegerField)
  - status           (CharField: draft / submitted / accepted / rejected)
  - submitted_at     (DateTimeField, nullable)
  - response_data    (JSONField, nullable)
  - error_message    (TextField, nullable)
  - generated_by     (FK -> User)
  - created_at       (DateTimeField, auto)

KEMISValidationLog
  - submission       (FK -> KEMISSubmission)
  - student          (FK -> StudentProfile, nullable)
  - field_name       (CharField)
  - error_type       (CharField: missing / invalid / duplicate)
  - error_message    (TextField)
  - resolved         (BooleanField, default=False)
  - created_at       (DateTimeField, auto)
```

### Export Engine

1. **Validation pass** — Before export, check every student record for:
   - Missing required fields (ULI, county code, etc.)
   - Duplicate ULI numbers
   - Invalid code formats
   - Students without class/section assignment

2. **Export generation** — Produce KEMIS-compliant CSV or JSON matching
   the current KEMIS upload format. This may be a bulk CSV upload or a
   REST API call — needs to be verified against the live KEMIS portal.

3. **Submission tracking** — Record what was exported, when, and the
   response from KEMIS (accepted/rejected with reasons).

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/kemis/config/` | GET/POST | KEMIS configuration |
| `/api/kemis/validate/` | POST | Validate student data before export |
| `/api/kemis/export/` | POST | Generate KEMIS export file |
| `/api/kemis/submissions/` | GET | List past submissions and status |
| `/api/kemis/validation-errors/` | GET | List validation issues to fix |

### Verification

- [ ] Validation catches missing fields and duplicates
- [ ] Export generates correct format (verify against KEMIS spec)
- [ ] Submission status tracked correctly
- [ ] Validation errors can be resolved and re-exported

---

## Phase 5: Payroll & Staff Management

**Timeline:** Weeks 11–13
**Goal:** Process teacher salaries with statutory deductions, generate
payslips, manage leave.

### New App: `payroll`

```
PayrollPeriod
  - name            (CharField) — e.g. "September 2026"
  - month           (IntegerField)
  - year            (IntegerField)
  - status          (CharField: draft / processing / finalized / paid)
  - created_at      (DateTimeField, auto)

Payslip
  - teacher         (FK -> TeacherProfile)
  - period          (FK -> PayrollPeriod)
  - basic_salary    (DecimalField)
  - allowances      (DecimalField, default=0)
  - gross_pay       (DecimalField)
  - nhif_deduction  (DecimalField, default=0)
  - nssf_deduction  (DecimalField, default=0)
  - paye            (DecimalField, default=0)
  - housing_levy    (DecimalField, default=0)
  - other_deductions (DecimalField, default=0)
  - total_deductions (DecimalField)
  - net_pay         (DecimalField)
  - status          (CharField: draft / approved / paid)
  - paid_date       (DateField, nullable)
  - created_at      (DateTimeField, auto)

LeaveType
  - name            (CharField) — Annual, Sick, Maternity, Paternity, Study
  - days_per_year   (IntegerField)
  - is_paid         (BooleanField, default=True)

LeaveApplication
  - teacher         (FK -> TeacherProfile)
  - leave_type      (FK -> LeaveType)
  - start_date      (DateField)
  - end_date        (DateField)
  - days            (IntegerField)
  - reason          (TextField)
  - status          (CharField: pending / approved / rejected)
  - approved_by     (FK -> User, nullable)
  - approved_at     (DateTimeField, nullable)
  - created_at      (DateTimeField, auto)
```

### Deduction Calculations

Statutory deductions for Kenya (2026 rates — verify against current schedules):

- **NHIF** — Based on gross salary bands (use current NHIF rates table)
- **NSSF** — Tier I and Tier II contributions (use current NSSF rates)
- **PAYE** — Progressive tax bands (use current KRA rates)
- **Housing Levy** — 1.5% of gross pay (employee + employer)

Build a `deductions.py` utility that takes gross pay and returns a dict
of all calculated deductions. This must be updated whenever the government
changes rates — store rate tables in the database or a config file, not
hardcoded.

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/payroll/periods/` | GET/POST | Payroll periods |
| `/api/payroll/payslips/` | GET | List payslips (filtered by period) |
| `/api/payroll/payslips/generate/` | POST | Generate payslips for a period |
| `/api/payroll/payslips/{id}/pdf/` | GET | Download payslip PDF |
| `/api/payroll/leave-types/` | GET | Leave types |
| `/api/payroll/leave/` | GET/POST | Leave applications |
| `/api/payroll/leave/{id}/approve/` | POST | Approve/reject leave |

### Verification

- [ ] Payslip generated with correct statutory deductions
- [ ] PAYE calculated correctly using current KRA bands
- [ ] Leave balance deducted correctly
- [ ] Payslip PDF generates with all line items
- [ ] Leave approval workflow works end-to-end

---

## Phase 6: Offline-First / PWA

**Timeline:** Weeks 13–15
**Goal:** The app loads and basic features work without internet. Data
syncs when connection restores.

### Why This Matters

A system that works in Nairobi but not in rural Turkana isn't a national
school system. Connectivity isn't guaranteed — teachers need to enter
marks offline and sync later.

### Implementation

#### Service Worker (Workbox)

- Cache all static assets (JS, CSS, fonts, images)
- Cache API responses with stale-while-revalidate strategy
- Offline fallback page when no connection and no cache

#### IndexedDB for Offline Writes

Store pending writes locally when offline:
- Attendance marking
- Grade/assessment entry
- Fee payment recording (manual confirmations only — M-Pesa needs internet)

Each offline write includes:
- Timestamp
- User who made the change
- Module (attendance, grades, fees)
- Payload (the data to sync)
- Status (pending / synced / conflict)

#### Background Sync

Use `navigator.serviceWorker.sync` to trigger upload when connection restores.
Conflict resolution strategy:
- **Attendance:** Last-write-wins (only one teacher marks per class per day)
- **Grades:** Last-write-wins (teacher has authority over their subject)
- **Fees:** Queue-based — manual review required (money conflicts need human)

#### Data Freshness Indicator

Show users whether their current view is live data or cached:
- Green indicator: "Live — connected"
- Yellow indicator: "Cached — last updated {time}. Syncing..."
- Red indicator: "Offline — changes will sync when connected"

### Frontend Changes

- Register service worker in `main.jsx`
- Add offline indicator component
- Add sync queue UI (list of pending offline changes)
- Store API responses in IndexedDB via `idb` library or `localForage`

### Verification

- [ ] App loads with cached assets when offline
- [ ] Teacher can mark attendance offline
- [ ] Pending changes appear in sync queue
- [ ] Changes sync automatically when connection restores
- [ ] Conflict resolution works for fee payments

---

## Phase 7: Portal & Communication Polish

**Timeline:** Weeks 15–17
**Goal:** Make the parent and student portals production-ready for daily use.

### Tasks

#### 7.1 Parent Portal Mobile Optimization

- Responsive design for small screens (320px minimum)
- SMS link-friendly — when parent gets SMS with link, it opens to a
  lightweight page showing the relevant info directly
- Minimal data usage — compress images, lazy load

#### 7.2 Teacher Portal

Currently teachers share the admin layout. They need their own view:
- Their assigned classes and sections only
- Attendance marking for their classes
- Grade/assessment entry for their subjects
- Their timetable and leave balance
- Their payslips

#### 7.3 Student Portal Upgrade

- CBC competency reports with spider/radar chart visualization
- Fee receipts downloadable as PDF
- Transport and canteen subscription status
- Attendance history with trends
- Exam results with class comparison

#### 7.4 Push Notifications (Smartphone Users)

- Web Push API as a lighter alternative to a native app
- Triggered by same events as SMS but for users who opt in
- Reduces SMS costs for schools with many smartphone-using parents

### Verification

- [ ] Parent portal usable on a 320px screen
- [ ] Teacher portal shows only their classes and subjects
- [ ] Student portal shows competency radar chart
- [ ] Push notifications work on Chrome/Android

---

## Dependency Graph

```
Phase 0: Stabilize
  ├──→ Phase 1: CBC Assessment (needs stable grades module)
  ├──→ Phase 2: M-Pesa Finance (needs stable fees module)
  │       │
  │       └──→ Phase 3: SMS Gateway (needs fee payment events to trigger alerts)
  │               │
  │               ├──→ Phase 4: KEMIS (needs clean learner data + notifications)
  │               │
  │               └──→ Phase 5: Payroll (needs notifications for payslips)
  │
  └──→ Phase 6: Offline/PWA (needs stable feature set first)
            │
            └──→ Phase 7: Portal Polish (needs all features working)
```

**The critical path:** Stabilize → CBC → M-Pesa → SMS → KEMIS

**Money-first sequencing (the stronger constraint):** The accounting rollout
in [`backend/docs/accounting.md`](backend/docs/accounting.md) is stricter
than this roadmap's feature ordering — it sequences *all* money work (ledger
core → opening balances → invoicing → Daraja sandbox → one-stream live pilot
→ school-wide scale) ahead of non-financial features, then gates CBC,
attendance, SMS, offline sync, and KEMIS export behind proven accuracy of the
money data. The principle:

> Prove the ledger before automating; prove automation before scaling; verify
> before reporting.

**Reconciled plan:** The money pipeline (this roadmap's Phase 2, re-sequenced
per `accounting.md` Phases 1–6) is the critical path. CBC builds in parallel
(it touches different code and cannot corrupt the ledger) but is *piloted* only
after finance is live — so a grades bug can never be confused with a money bug.
SMS, offline sync, and KEMIS export only go live once the data they report has
survived a full live term without correction.

**Parallelizable:** CBC (Phase 1) can be built in parallel with the money
pipeline after Phase 0, but its pilot is gated on finance going live.
Payroll can run in parallel with KEMIS. Portal polish rides last.

---

## Tech Stack Additions

| Need | Library/Service | Why |
|---|---|---|
| M-Pesa integration | Safaricom Daraja SDK | Official API for C2B/STK Push |
| SMS gateway | Africa's Talking Python SDK | Kenya-native, sandbox, KES billing, cheap |
| PDF generation | `weasyprint` or `xhtml2pdf` | Django-native, generates from HTML templates |
| Task queue | `django-q2` or `celery` + Redis | Background jobs: SMS, fee reminders, reports |
| PWA | Workbox (Google) | Service worker caching, background sync |
| Kenyan geography | `django-counties` or manual fixtures | County/sub-county/ward codes for KEMIS |
| Offline storage | `idb` or `localForage` | IndexedDB wrapper for frontend offline writes |
| Charts | Recharts (already installed) | Competency spider charts, fee aging visualizations |
| Encryption | `django-fernet-fields` | Encrypt API keys (Daraja, Africa's Talking) |

---

## Local Context — Why It Matters

### Connectivity Isn't Guaranteed

A good SMS for a rural or peri-urban Kenyan primary school needs to work
on low bandwidth and cache data so teachers can enter marks offline and
sync later. Rural schools can't assume stable school-wide internet.

### Phones, Not Smartphones

The parent-facing side leans on plain SMS rather than an app, because that's
what reaches every guardian regardless of device. App-based notification
systems miss the majority of parents at under-resourced schools.

### Government Reporting Is a Moving Target

KEMIS only went live on January 9, 2026, replacing NEMIS. The Ministry
described NEMIS as too rigid and poorly integrated with other government
systems. The KEMIS API and data format may change — the system must be
adaptable. Check the current KEMIS spec before implementing Phase 4.

### Two Curricula Running at Once

With CBC's 2-6-3-3-3 structure now standard in primary school and only a
shrinking tail of pupils still finishing 8-4-4, most primary-level systems
today are CBC-first. But a well-built system still needs the ability to
represent both if the school has any legacy records.

### M-Pesa Is the Default

Parents expect to pay via M-Pesa. A finance module that only accepts cash
or bank transfer creates reconciliation headaches and erodes trust. The
school must have a Safaricom Paybill or Till Number — if they don't, that's
the first thing to set up before Phase 2.

### Statutory Deductions Change

PAYE, NHIF, NSSF, and housing levy rates are set by the government and
change periodically. The payroll module must store rate tables in the
database or a config file, not hardcoded — and someone must update them
when the government announces changes.
