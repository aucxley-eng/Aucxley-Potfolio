
**SchoolHub Academy**

*School management and logistics architecture*

Research and implementation blueprint
18 September 2026

**Recommended direction**

Build SchoolHub as a school operations system: one shared learner record connecting academics, fees, transport, meals, stock, and parent communication. Start with one school, prove that its daily work runs reliably, and then expand.

The proposed starting scope is one Kenyan day school with primary learners, school-managed fees, optional meals, and at least one transport route. Confirm this school profile before implementation.

This document explains the product, how its components connect, the responsibilities of each module, and a practical delivery sequence. It adapts the roadmap into a system that can be discussed with school staff and developers.

**Key decisions**

Retain Django and React if a code audit confirms they are a sound foundation. Use one backend with clearly separated modules.

Make accurate learner records, permissions, finance, and daily logistics the foundation.

Offer focused workspaces for staff and guardians, with SMS and selected offline workflows.

Defer a video-learning platform, custom payroll engine, route optimisation, and extensive multi-school administration.

**Document guide**

| Sections | **Content**                                               |
| -------- | --------------------------------------------------------------- |
| 1 to 3   | Existing examples, roadmap corrections, and user workspaces     |
| 4 to 7   | Application architecture, module connections, network, and data |
| 8 to 10  | Finance, logistics, academics, and offline workflows            |
| 11 to 12 | Security, implementation plan, and initial scope                |
| 13       | Research links and technical references                         |

The diagrams describe the proposed SchoolHub design. They do not describe Zeraki’s internal technology. Existing code and the separate accounting specification require an audit before implementation estimates are confirmed.

**1 Existing products and the role of Zeraki**

Zeraki is an education technology company offering distinct products for school administration, finance, and learning. SchoolHub overlaps most closely with Analytics and Finance. A teaching-content platform would be a separate undertaking.

| **Product** | **What it does**                                                                      | **Main users**              |
| ----------------- | ------------------------------------------------------------------------------------------- | --------------------------------- |
| Zeraki Analytics  | Attendance, assessment results, performance analysis, reports, messages, and parent access. | Teachers, administrators, parents |
| Zeraki Finance    | Fee balances, receipts, expenses, cash-flow summaries, and financial reporting.             | Bursars and management            |
| Zeraki Learning   | Educational content; its public page emphasises high-school teaching.                       | Learners and families             |

For example, a teacher enters results in Analytics, the accounts office manages receipts in Finance, and a learner studies using Learning. These are different jobs even when they sit within one product family. [1–3]

**What to learn from available examples**

| **Example**             | **Documented strength**                                                                | **Lesson for SchoolHub**                               |
| ----------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Zeraki                        | Distinct academic, finance, and learning products.                                           | Give each user a focused workspace.                          |
| Fedena                        | Transport vehicles, stops, routes, drivers, attendants, maintenance, and fares.              | Track daily operations beyond route lists. [4]               |
| Frappe Education with ERPNext | Fee structures and schedules linked to receivables, income accounts, and accounting records. | Separate charges, receipts, allocations, and accounting. [5] |

**Build or buy**

If the objective is simply to digitise one school, compare buying or adapting an existing system with a custom build. Request demonstrations using the school’s actual fee statement, report card, and transport manifest. Verify export rights, support, migration costs, offline behaviour, and integration scope.

If the objective is an independent product, test this proposition with schools: a Kenyan primary-school system that makes administration and child-related logistics easy to verify, even with unreliable connectivity. This is a product hypothesis, not a proven market gap.

The comparison is based on public documentation rather than hands-on testing. Vendor pages do not establish every primary-school, offline, logistics, or government-integration requirement.

**2 Improvements to the original roadmap**

| **Issue**                                       | **Recommended change**                                                                                                                  |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| CBC model is too narrow                               | Include learning areas, strands, outcomes, activities, evidence, rubric versions, and comments. Core competencies are one part of assessment. |
| Self-Direction is listed as official terminology      | Use self-efficacy in the official curriculum catalogue. [6]                                                                                   |
| Active 8-4-4 primary cohorts are assumed              | Preserve historic records; do not prioritise active 8-4-4 primary workflows. The final KCPE was in 2023. [7]                                  |
| KEMIS fields and API are assumed                      | Validate the current official specification before promising compatibility or making fields mandatory. [9]                                    |
| An invoice is a pending payment                       | Separate invoices, payments, allocations, receipts, and journal entries.                                                                      |
| Payroll uses NHIF assumptions                         | Use current SHA/SHIF requirements and effective-dated statutory rules. [10]                                                                   |
| Offline updates use last write wins                   | Detect conflicts and preserve corrections, especially for assessments and child movement.                                                     |
| Transport is routes and subscriptions                 | Add trips, passenger manifests, boarding, alighting, handovers, incidents, and vehicle readiness.                                             |
| SMS and offline design arrive late                    | Design them early and activate each workflow when its source data is reliable.                                                                |
| All features depend on a correction-free finance term | Use separate release criteria. Attendance can be piloted while finance is reconciled.                                                         |

**Government integration**

Begin with accurate records, validation, and submission tracking. An official KEMIS portal exists, but the exact integration contract and field list must be confirmed with the school and relevant authority. Do not build an assumed API or equate an export file with accepted submission.

**Permissions require code inspection**

Missing permission classes on individual views do not alone prove unrestricted access: Django REST Framework supports global settings. Review global permissions, record filtering, object checks, create and update validation, and export access. [14]

**3 User workspaces and responsibilities**

Build one system with role-specific workspaces. Each user should see the tasks they are responsible for, together with exceptions that need action. A person may hold several roles, but those permissions remain distinct.

| **User**        | **Main workspace**         | **Allowed work**                                            |
| --------------------- | -------------------------------- | ----------------------------------------------------------------- |
| Head teacher          | School summaries and exceptions  | Review operations, approve reports, and inspect issues.           |
| Admissions officer    | Applications and learner records | Admit learners, verify guardians, and manage enrolment.           |
| Bursar                | Balances and unmatched payments  | Invoice, reconcile, receipt, and propose adjustments.             |
| Teacher               | Assigned classes and lessons     | Mark attendance, enter assessments, and submit reports.           |
| Transport coordinator | Today’s trips                   | Assign vehicles and crews and investigate missing check-ins.      |
| Bus attendant         | Current passenger list           | Record boarding, alighting, and handovers.                        |
| Kitchen staff         | Meal requirements                | See approved counts and relevant dietary instructions.            |
| Storekeeper           | Stock movements                  | Receive, issue, count, and request supplies.                      |
| Parent or guardian    | Linked children                  | See permitted published reports, balances, receipts, and updates. |

**Access follows responsibility**

A teacher should only access assigned classes and learning areas. A parent should only access children linked through a verified relationship. Paying fees does not automatically authorise collection or access to sensitive information.

A teacher who is also a parent can switch between staff and parent workspaces without obtaining broader access through the combined interface. The backend must enforce these boundaries regardless of which screen is used.

**The first dashboard**

Show actionable questions: Which registers are incomplete? Which payments need matching? Which trip has an unresolved passenger? Which reports await approval? Summary charts can follow once the underlying records are trustworthy.

For a primary-school pilot, prioritise the parent workspace over individual pupil accounts. Use a lightweight mobile interface and SMS where the school’s communication needs justify it; validate device access with actual families.

**4 Application architecture**

Use a modular monolith: one Django backend divided into business modules with clear rules. This keeps deployment manageable while allowing finance, academics, and transport to evolve separately.

![application architecture]()

| **Component**   | **Responsibility**                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------- |
| React and PWA         | Screens, forms, status indicators, installation, and selected offline workflows.            |
| Django API            | Checks identity and permissions, validates data, and applies business rules.                |
| PostgreSQL            | Stores durable records and protects relationships and transactions.                         |
| Private file storage  | Stores reports and attachments with controlled access.                                      |
| Background worker     | Sends messages and generates bulk documents without blocking users.                         |
| Redis if using Celery | Supports task delivery and temporary caching; it is not the financial source of truth.      |
| Transactional outbox  | Saves follow-up work with the business event so a temporary worker outage does not lose it. |

Example: save a verified payment and its notification request together. Send the SMS afterwards. An SMS outage must not undo a payment. Retried jobs must avoid repeating the same financial or messaging effect. [16]

**5 How the modules connect**

The learner record connects verified guardians, enrolment history, service subscriptions, and operational records. Modules exchange validated information or approved actions; they do not freely rewrite one another’s records.

![module connections]()

**One learner across the school**

Admissions creates the learner and verifies guardian relationships.

Enrolment assigns the learner to Grade 3, Blue Stream, preserving earlier enrolments.

An approved transport subscription defines morning and afternoon stops.

Finance generates the appropriate transport invoice line using approved billing rules.

Daily trip manifests include the learner on applicable service days.

A verified payment is allocated to invoices and reduces the appropriate balance.

The parent sees only information allowed by their relationship and permissions.

Transport requests charges through finance rather than directly changing balances. Meal and uniform operations similarly record service or stock events separately from the corresponding payment.

Financial policies must not silently control child-safety decisions. Any service restriction requires explicit school policy and an operational process; a fee balance must not automatically prevent safe handover.

**6 Network and hosting design**

Start with a cloud-hosted system and selected offline support on staff devices. The school needs reliable connectivity for live updates, with mobile backup where practical.

![network and hosting]()

**Network boundaries**

Phones and browsers communicate with the backend, never directly with the database.

The database and queue remain private. Provider callbacks use specific checked routes.

Documents require authorised access; knowing the filename is insufficient.

Guest Wi-Fi is isolated from staff devices and office resources.

Payment and messaging credentials stay on the server. Backups require restoration tests.

**What offline capability means**

Teachers can capture approved work locally and upload it later. Live balances, central trip status, and new permissions still depend on a connection. Screens must show when information was last updated.

For continuous background vehicle tracking, evaluate a dedicated GPS device or native application. A browser app should not be assumed to track reliably while closed or suspended. Show stale-location warnings and retain manual operational checks.

**7 Data relationships and history**

Use separate records for separate events. The following relationship map shows the core structure; one-to-many relationships are described below rather than implying that every link is one-to-one.

![data relationships]()

| **Relationship**                  | **Why it matters**                                                                     |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| Learner to guardian links               | Multiple guardians can have different viewing, payment, and collection permissions.          |
| Learner to enrolments                   | A learner has historical enrolments. Promotion must not rewrite old reports.                 |
| Assessment activity to results          | An activity has results for many learners; each learner has multiple observations.           |
| Payment through allocations to invoices | One payment may cover several invoices or siblings. An invoice may receive several payments. |
| Learner and trip to trip passenger      | Each manifest entry links a learner to a dated trip; it can have multiple movement events.   |
| Learner to external identifiers         | Keep a stable internal identifier and separately map verified official identifiers.          |

Introduce school ownership consistently for future expansion. Before a second school joins, test isolation across records, files, reports, exports, and background jobs. A school_id column alone is not sufficient.

**8 Finance and payment processing**

An invoice states what is owed. A payment records money received. An allocation applies that payment to an invoice. A receipt acknowledges the verified payment. Journal entries account for its financial effect.

![payment processing]()

Acknowledge the callback after durable acceptance, then process it safely. Duplicate protection ensures the same provider transaction cannot create two payments. Receiving a plausible public request is not sufficient proof of payment. Confirm the production controls and collection setup against Daraja requirements. [11]

| **Illustrative invoice** | **KES** |
| ------------------------------ | ------------- |
| Tuition                        | 15,000        |
| Transport                      | 4,000         |
| Meals                          | 3,000         |
| Total invoice                  | 22,000        |
| Verified payment allocated     | 10,000        |
| Remaining amount               | 12,000        |

Support partial payments, sibling allocations, overpayments held as credit, unidentified receipts, approved waivers, credit notes, reversals, and unique receipts. Derive balances from the accounting history instead of manually editing a balance field.

Reconcile against provider or bank records to find missing callbacks, disputed references, reversals, and settlement differences. A double-entry ledger requires balanced posting rules, period controls, preserved reversals, and accountant-reviewed treatment; table design alone is not enough.

**9 Transport meals and stock logistics**

Logistics should answer four questions: What was planned? What happened? Who confirmed it? What needs attention? A vehicle location does not prove that a child boarded or reached an authorised adult.

![transport trip lifecycle]()

**Transport records**

Store routes, ordered stops, service days, pickup and drop-off assignments, vehicle capacity, maintenance, inspection records, document reminders, crew assignments, and substitutions. Create dated trips and manifests rather than relying only on subscriptions.

Capture boarding, alighting, authorised collector, verification method, time, and confirming staff member. Record incidents such as the wrong stop, breakdown, delay, or failed handover. Keep a coordinator escalation process and appropriate parent alerts.

**Meals**

Distinguish entitlement from consumption: subscription → daily forecast → quantities prepared → meals served → leftovers, waste, or shortage. Attendance informs forecasts, but the kitchen needs a cutoff and manual adjustment because offline registers may arrive late. Restrict dietary information to staff who need it.

**Supplies and uniforms**

Use the sequence purchase request → approval → purchase order → goods received → stock issue → physical count adjustment. Preserve who authorised and performed each movement.

A uniform order, a payment, and actual collection are separate events. Keeping them separate prevents paid from being mistaken for collected. Link approved charges to finance while inventory tracks physical quantities.

**10 Academics and offline workflows**

![academic assessment structure]()

Capture multiple observations over time, including rubric, score where applicable, evidence, and comments. One record per learner, competency, and term would compress or overwrite useful evidence. Version assessment schemes and approve report templates against applicable KICD/KNEC guidance and the school’s practice. [6, 8]

| **Workflow**               | **Offline behaviour**                                               |
| -------------------------------- | ------------------------------------------------------------------------- |
| Attendance                       | Drafts for assigned classes; synchronise with conflict checking.          |
| Assessments                      | Save drafts; publish after online validation and review.                  |
| Trip events                      | Queue timestamped events; show central status as potentially delayed.     |
| Cash capture if required         | Provisional capture only; final posting and receipting follow validation. |
| M-Pesa status                    | Show last checked state; never invent confirmation.                       |
| Guardian permissions and refunds | Require an online authorised workflow.                                    |

Every queued change needs an operation ID, user and device identity, record version, and capture time. The server rechecks permission when it receives the update. Conflicting changes should be reviewed rather than silently overwritten.

Provide Sync now and retry when the application reopens. Browser background synchronisation has limited availability and cannot be the only mechanism. Protect cached data with minimal scope, expiry, logout cleanup, and shared-device controls. [15]

**11 Security privacy and reliability**

Security determines who can see a child’s records, change financial information, or authorise collection. Treat these controls as part of the product from the first pilot.

**Access and accountability**

Use individual staff accounts and stronger authentication for privileged roles.

Enforce permissions on the server for individual records, lists, exports, attachments, and write operations.

Verify guardian relationships and separate viewing, payment, and collection permissions.

Restrict health, safeguarding, and financial details to relevant staff.

Preserve audit history for sensitive changes, approvals, and reversals.

**Data handling**

Use private file storage and controlled downloads. Keep credentials server-side, avoid sensitive payloads in routine logs, and define retention periods for documents, financial events, and location data.

Kenya’s ODPC publishes guidance for education, children’s data, and higher-risk processing. Establish appropriate privacy notices, processing grounds, retention rules, and provider agreements. Assess child-location tracking before rollout and consider applicable safeguards for hosting or transfers outside Kenya. [12–13]

**Operational resilience**

Use encrypted backups and demonstrate restoration, not just successful backup creation.

Monitor errors, failed jobs, callback failures, and reconciliation exceptions.

Keep development, testing, and production separate.

Provide an incident owner and a documented recovery process.

Retain practical school fallback procedures for internet, power, or device failures.

Proposed initial recovery targets are no more than one hour of recoverable data loss and restoration within four hours, subject to budget and testing. These are design targets rather than guarantees.

**Checks before live use**

A parent cannot see another child by changing a URL. A teacher cannot export unrelated classes. Repeated callbacks do not duplicate payments. An SMS failure does not lose the payment or attendance record. A restored backup opens correctly and reconciles to a known checkpoint.

Django admin access should be restricted and should not bypass approved financial workflows. Registering models provides an administration tool; it does not by itself make a safe daily interface.

**12 Delivery plan and first release**

| **Release**   | **Scope**                                                  | **Evidence before expansion**                              |
| ------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| Discovery and audit | Inspect code and observe real school routines.                   | Staff agree on workflows and priorities.                         |
| Foundation          | Learners, guardians, enrolment, roles, audit, database, backups. | Imports checked; permission and restore checks pass.             |
| Attendance pilot    | Teacher workspace, attendance, reviewed alerts, parent access.   | One class uses it reliably.                                      |
| Finance pilot       | Opening balances, invoices, payments, allocation, receipts.      | Bursar verifies balances and failure cases.                      |
| Transport pilot     | One route, manifests, boarding, handover, incidents.             | Crew reconciles trips and handles exceptions.                    |
| Academics           | Curriculum structure, assessment, review, reports.               | Teachers approve templates and corrections.                      |
| Meals and stock     | Forecasts, subscriptions, receiving, issues, counts.             | Records agree with physical operations.                          |
| Expansion           | Verified exports, payroll integration, GPS, more schools.        | Owner, specification, and acceptance criteria for each addition. |

Introduce SMS with the workflow that needs it. Send absence alerts after a reviewed register and school-defined cutoff, not during incomplete roll call. Pilot attendance independently while finance is being reconciled.

A focused pilot might take 10–16 weeks with two experienced developers, testing support, and an available school representative, if the existing code is reusable. The broader system is a multi-month programme. Migration quality and provider onboarding can change the schedule.

**Initial product scope**

Include learner and guardian records, enrolment, staff permissions, attendance, controlled alerts, invoices, payments, balances, receipts, parent access, one complete transport workflow, audit history, backups, and basic reports. Defer video learning, custom payroll, route optimisation, and extensive multi-school administration.

**Migration and next step**

Review imported records and opening balances, train staff using real examples, run a bounded parallel pilot, investigate discrepancies, obtain responsible staff sign-off, and then expand.

Validate the design against one school’s admission form, fee statement, attendance register, report card, and transport manifest. Audit the code against these workflows to produce the buildable specification.

**13 Research and technical references**

Sources consulted for the research discussion on 18 September 2026. Product descriptions reflect public documentation; implementation choices and estimates are recommendations. Verify changing regulatory and integration specifications before development.

[1 Zeraki Analytics](https://www.zeraki.app/zeraki-analytics)

[2 Zeraki Finance](https://www.zeraki.app/zeraki-finance)

[3 Zeraki Learning](https://www.zeraki.app/zeraki-learning)

[4 Fedena transport module documentation](https://support.fedena.com/support/solutions/articles/213014-about-transport-module)

[5 Frappe Education fee structure documentation](https://docs.frappe.io/education/fee-structure)

[6 KICD pre primary curriculum design and core competencies](https://kicd.ac.ke/wp-content/uploads/2018/02/PP-2-Curriculum-Designs-Dec-2017E-min.pdf)

[7 KNEC history and curriculum transition](https://www.knec.ac.ke/who-we-are/history/)

[8 KNEC circulars and assessment guidelines](https://www.knec.ac.ke/circulars-guidelines/)

[9 Official KEMIS portal](https://kemis.go.ke/login)

[10 SHA employer portal terms and SHIF responsibilities](https://employers.sha.go.ke/terms-and-conditions)

[11 Safaricom Daraja developer portal](https://developer.safaricom.co.ke/)

[12 ODPC guidance including education and children’s data](https://www.odpc.go.ke/guidelines-2/)

[13 ODPC data subject rights and protection principles](https://www.odpc.go.ke/rights-of-a-data-subject/)

[14 Django REST Framework permissions](https://www.django-rest-framework.org/api-guide/permissions/)

[15 MDN Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)

[16 Celery task documentation](https://docs.celeryq.dev/en/stable/userguide/tasks.html)

**Terms used in this document**

| **Term**       | **Meaning**                                                        |
| -------------------- | ------------------------------------------------------------------------ |
| API                  | The controlled interface through which the app requests backend actions. |
| PWA                  | An installable web application with selected offline capabilities.       |
| Modular monolith     | One backend application organised into distinct business modules.        |
| Reconciliation       | Comparing records with independent evidence and resolving differences.   |
| Transactional outbox | A saved request for follow-up work committed with the business event.    |
