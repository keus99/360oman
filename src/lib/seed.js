/**
 * 360Oman Seed Script
 *
 * Run this manually after setting up Supabase:
 *   node src/lib/seed.js
 *
 * Or import and call seedAll() from a dev console.
 * This script is NOT run automatically on app boot.
 */

import { supabase } from './supabase.js'

// ─── GUIDES ──────────────────────────────────────────────────────────────────

const guides = [
  {
    title: 'Getting Your Iqama (Residence Card)',
    slug: 'getting-your-iqama',
    category: 'Visas & residency',
    summary: 'A step-by-step guide to obtaining your Oman residence card as a new expat.',
    last_verified: '2025-10-01',
    tags: ['iqama', 'residency', 'rop', 'documents'],
    content: `## What is the Iqama?

The Iqama (also called the Residence Card or Civil ID) is your official identification document in Oman. Every expat who intends to stay longer than the initial visa period must obtain one.

## Who Needs an Iqama?

All expatriates working or residing in Oman, including:
- Employed residents on a work visa
- Family members sponsored by an employee
- Domestic workers

## Documents Required

1. Valid passport (minimum 6 months validity)
2. Completed application form from ROP
3. Medical fitness certificate from an approved clinic
4. 2 passport-size photographs (white background)
5. Employer NOC letter (for work permits)
6. Signed employment contract
7. Payment of applicable fees

## The Process

1. Your employer's PRO typically initiates the process
2. Medical examination at an approved clinic (results submitted directly to ROP)
3. Biometric registration at the ROP centre
4. Collect the card within 5–7 working days

## Key Points

- The Iqama must be renewed before it expires — overstaying has penalties
- Always carry your Iqama or a copy when moving around Oman
- Contact the Royal Oman Police (ROP) portal for the latest requirements: **rop.gov.om**

> Always verify current requirements and fees with your PRO or directly with ROP, as these can change.`,
  },
  {
    title: 'Converting Your Foreign Driving Licence',
    slug: 'converting-foreign-driving-licence',
    category: 'Driving & transport',
    summary: 'How to convert your home country driving licence to an Omani licence without taking a test.',
    last_verified: '2025-09-15',
    tags: ['driving', 'licence', 'rop', 'car'],
    content: `## Can You Convert Your Licence?

Oman allows direct licence conversion for citizens of many countries — including UK, USA, EU countries, Australia, Canada, India, and more — without requiring a driving test. Citizens of other countries may need to sit a test.

## Documents Required

1. Original foreign driving licence (valid)
2. Passport + valid Iqama (residence card)
3. Completed application form
4. Eye test certificate from an approved optician
5. Passport-size photos
6. Payment of fees

## Where to Apply

Submit your application at any **Royal Oman Police (ROP) Directorate of Traffic**. The main offices are in Muscat (Al Qurum) and other governorates.

## Process Steps

1. Get an eye test at an approved optician
2. Gather all documents
3. Visit the ROP Traffic department
4. Submit documents at the counter
5. Receive your Omani licence (typically same day or within 1–2 days)

## Important Notes

- Your foreign licence must still be valid at the time of conversion
- Some nationalities require additional approvals — check with ROP
- If your licence expired in your home country, you may need to sit a test
- The Omani licence is issued for multiple years

## Rental Cars

You may drive a rental car in Oman on your international driving permit (IDP) alongside your foreign licence. Always carry both.`,
  },
  {
    title: 'Opening a Bank Account in Oman',
    slug: 'opening-bank-account-oman',
    category: 'Banking & money',
    summary: 'Everything you need to know about opening a personal bank account as an expat in Oman.',
    last_verified: '2025-11-01',
    tags: ['banking', 'bank', 'account', 'muscat'],
    content: `## Which Banks Can Expats Use?

Most major Omani banks offer accounts for expatriates:
- **Bank Muscat** — largest bank, widest ATM network
- **HSBC Oman** — good for international transfers
- **Ahli Bank** — competitive products
- **NBO (National Bank of Oman)**
- **Bank Dhofar**

## Types of Accounts

- **Current account** — for day-to-day transactions, salary receipt
- **Savings account** — earns interest, useful for emergency fund

## Documents Required

1. Valid passport
2. Valid Iqama (residence card)
3. Salary certificate from employer on company letterhead
4. 3–6 months of bank statements from your home bank (some banks require this)
5. Employment contract (some banks)

## Process

1. Visit a branch of your chosen bank
2. Speak to a personal banking officer
3. Submit documents for review
4. Account typically opened within 1–3 working days
5. Debit card issued (sometimes takes up to 7 days)

## Minimum Balance

Most banks require a minimum balance of OMR 50–300 depending on account type. Ask upfront to avoid penalty charges.

## Online Banking

All major banks offer mobile apps and online banking. Set these up as soon as your account is open — they're essential for managing salary and paying bills.

> Tip: Bank Muscat's MBanking app is widely regarded as the best in Oman.`,
  },
  {
    title: 'How Dhamani Insurance Works',
    slug: 'dhamani-insurance-oman',
    category: 'Healthcare',
    summary: 'A plain-English guide to Dhamani health insurance — the mandatory system for expats in Oman.',
    last_verified: '2025-08-01',
    tags: ['health', 'insurance', 'dhamani', 'hospital'],
    content: `## What is Dhamani?

Dhamani is Oman's national health insurance scheme for expatriates. Under the scheme, employers are required to provide health insurance to all expatriate employees. The insurance covers a defined set of benefits depending on the policy tier.

## Coverage Tiers

| Tier | Annual Limit | Typical For |
|------|-------------|-------------|
| Basic | OMR 5,000 | Lower-income workers |
| Standard | OMR 20,000 | Most white-collar employees |
| Enhanced | OMR 50,000+ | Senior/managerial level |

## What's Covered

- Outpatient consultations at network clinics
- Emergency treatment
- Hospitalisation and surgery
- Maternity (for female dependents in some tiers)
- Pharmacy (at network pharmacies)

## What's Not Covered

- Pre-existing conditions (often excluded for first year)
- Dental and optical (unless specifically added)
- Cosmetic procedures
- Treatment outside the network without prior approval

## Using Your Insurance

1. Always visit **network clinics** for standard consultations
2. Carry your insurance card at all times
3. For emergencies, go to the nearest hospital — your insurer will sort billing later
4. Get a referral letter for specialist appointments
5. For non-emergency hospitalisations, get **pre-authorisation** first

## Claims

Most claims are handled directly between the clinic and insurer. For out-of-network treatment, keep all receipts and submit a reimbursement claim within 30 days.

> Your employer's HR team should provide your insurance card and policy details when you join.`,
  },
  {
    title: 'Renting a Home in Oman',
    slug: 'renting-home-oman',
    category: 'Housing & utilities',
    summary: 'How the rental process works in Oman — from finding a property to signing the contract.',
    last_verified: '2025-10-15',
    tags: ['housing', 'renting', 'apartment', 'contract'],
    content: `## The Rental Market in Oman

Oman's rental market is largely unregulated compared to some countries, which means both landlords and tenants need to be careful. That said, the market is generally fair and transparent.

## Popular Expat Areas in Muscat

- **Madinat Al Sultan Qaboos (MSQ)** — mid-to-high end, popular with Western expats
- **Al Khuwair** — central, good for families, near supermarkets
- **Al Mouj / The Wave** — upscale compound, beachside, pricey
- **Ghubra** — large villas, good for bigger families
- **Qurum** — central, mix of apartments and villas
- **Seeb / Al Hail** — more affordable, suburban feel

## Typical Costs (Muscat, 2025)

| Type | Monthly Range |
|------|--------------|
| 1-bed apartment | OMR 300–600 |
| 2-bed apartment | OMR 400–900 |
| 3-bed villa | OMR 700–2,000 |
| Compound villa | OMR 1,200–3,500+ |

## The Rental Process

1. Search via Property Finder, Dubizzle, or local agencies
2. View the property (check water, A/C, and parking)
3. Negotiate rent — landlords often accept lower offers
4. Sign the tenancy contract (ensure it covers maintenance responsibilities)
5. Pay deposit (usually 1–2 months) + first month's rent
6. Register the tenancy at Baladiya (municipality) — required

## Key Contract Points to Check

- Who pays for maintenance and repairs?
- Are utilities included or separate?
- What is the notice period for termination?
- Are pets/modifications allowed?

> Always read the full contract before signing. If in Arabic only, ask for an English version or hire a PRO to translate.`,
  },
  {
    title: 'Using the ROP Portal for Government Services',
    slug: 'rop-portal-guide',
    category: 'Government services',
    summary: 'How to use the Royal Oman Police e-portal for visa renewals, fines, and permits.',
    last_verified: '2025-09-01',
    tags: ['rop', 'government', 'portal', 'visa', 'online'],
    content: `## What Can You Do on the ROP Portal?

The Royal Oman Police (ROP) e-portal at **rop.gov.om** allows you to handle many services online without visiting an office:

- Check visa status and residency
- Pay traffic fines
- Apply for some permits
- Check your vehicle registration status
- Download NOCs

## Creating an Account

1. Visit rop.gov.om
2. Click "Register" and enter your Civil ID (Iqama number)
3. Set up your password and verify your mobile number
4. Log in and link your passport or Iqama

## Paying Traffic Fines

1. Log into the portal
2. Go to "Traffic Services" → "Fines Inquiry"
3. Enter your driving licence or vehicle number
4. View outstanding fines
5. Pay securely by card

## Visa Renewal Services

While full visa renewals typically require your PRO, you can:
- Check your visa expiry date
- See pending applications
- Download approval letters

## Mobile App

ROP also has a mobile app ("Oman Police") available on iOS and Android with most of the same features.

> Tip: Always keep your Iqama number handy — it's required for almost every government service in Oman.`,
  },
  {
    title: 'International Schools in Oman',
    slug: 'international-schools-oman',
    category: 'Education',
    summary: 'A guide to international schools in Muscat and other cities for expat families.',
    last_verified: '2025-07-01',
    tags: ['schools', 'education', 'children', 'muscat'],
    content: `## Overview

Oman has an excellent selection of international schools, particularly in Muscat. Most follow UK, US, Indian, or IB curricula.

## Popular Schools in Muscat

### British Curriculum
- **British School Muscat (BSM)** — highly regarded, large expat community
- **ABA (American-British Academy)** — dual British/American curriculum
- **Muscat English Speaking School (MESS)**

### American Curriculum
- **The American International School (TAISM)** — well-established, US diploma

### IB / International
- **Oman Gems Education schools** — multiple campuses, IB focus
- **Al Batinah International School** — good option in northern Oman

### Indian Curriculum (CBSE/ICSE)
- **Indian School Muscat (ISM)** — very large, affordable
- **DPS Oman (Delhi Public School)**

## Fees (Approximate Annual)

| School Type | Annual Fees |
|------------|-------------|
| British | OMR 4,000–8,000 |
| American | OMR 5,000–9,000 |
| IB | OMR 5,000–10,000 |
| Indian | OMR 1,500–3,000 |

## Admission Tips

- Start the process early — top schools fill up fast, especially for September intake
- Many schools require entrance assessments
- Some employers provide education allowances — check your contract
- Waiting lists are common; apply to multiple schools

> Contact each school directly for the latest fees and availability as these change annually.`,
  },
  {
    title: 'Understanding EOSB (End of Service Benefits)',
    slug: 'eosb-end-of-service-benefits',
    category: 'Work & labour',
    summary: 'How end of service gratuity works in Oman — what you are entitled to and how it is calculated.',
    last_verified: '2025-08-15',
    tags: ['eosb', 'labour', 'gratuity', 'salary', 'mol'],
    content: `## What is EOSB?

End of Service Benefits (EOSB), also called gratuity or end-of-service gratuity, is a payment due to employees upon leaving their job in Oman. It is governed by the **Oman Labour Law** (Royal Decree No. 53/2023).

## Who is Entitled?

All expatriate employees who have completed **at least 1 year** of continuous service.

Domestic workers have different provisions.

## Calculation Formula

**EOSB = (Monthly Basic Salary × Number of Years Served)**

Breaking it down:
- For each year of the **first 3 years**: 15 days' basic salary
- For each year **after 3 years**: 1 month's basic salary

### Example

If your basic salary is OMR 1,000 and you've worked 5 years:
- First 3 years: 3 × 15 days = 45 days = 1.5 months = OMR 1,500
- Next 2 years: 2 × 1 month = OMR 2,000
- **Total EOSB = OMR 3,500**

## Important Points

- EOSB is based on **basic salary only** (not allowances or bonuses)
- If dismissed without cause, you are entitled to full EOSB
- If you resign, the entitlement structure may differ — consult MOL
- EOSB must be paid within **7 days** of termination date

## Disputes

If your employer fails to pay EOSB, file a complaint with the **Ministry of Labour (MOL)** via their website at mol.gov.om or visit your nearest MOL office.

> Always keep copies of your employment contract, salary slips, and any written communication about your role.`,
  },
  {
    title: 'Wadi Trips and Weekend Adventures in Oman',
    slug: 'wadi-trips-oman',
    category: 'Lifestyle',
    summary: 'Your guide to exploring Oman\'s stunning wadis and weekend destinations.',
    last_verified: '2025-06-01',
    tags: ['lifestyle', 'wadi', 'outdoors', 'weekend', 'travel'],
    content: `## Why Oman's Outdoors Are Unmissable

Oman's natural landscape is extraordinary — towering mountain ranges, turquoise wadis (seasonal riverbeds), sand dunes, and dramatic coastlines are all within a few hours of Muscat.

## Top Wadis Near Muscat

### Wadi Shab
- **Distance from Muscat:** ~150km, 2 hours
- **Highlights:** Stunning turquoise pools, short boat crossing, cave with hidden waterfall
- **Best for:** A full day out, swimming, photography
- **Note:** Hike is easy-moderate, about 1.5 hours each way

### Wadi Bani Khalid
- **Distance from Muscat:** ~200km, 2.5 hours
- **Highlights:** Year-round water, clear pools, easy access
- **Best for:** Families, beginners, quick dip

### Wadi Nakhr (Grand Canyon of Oman)
- **Distance from Muscat:** ~300km, 4 hours
- **Highlights:** Dramatic gorge, one of the deepest canyons in the Middle East
- **Best for:** Hikers, scenic drives on Jebel Shams

## Wadi Safety Tips

- Never swim during or after rain — flash floods are deadly
- Wear sturdy shoes or water sandals
- Bring more water than you think you need
- Tell someone where you're going
- Check the weather forecast before you leave

## Other Weekend Destinations

- **Jebel Shams** — highest peak in Oman, cooler temperatures
- **Nizwa Fort & Souk** — historical, great on a Friday morning
- **Wahiba Sands** — overnight desert camping (book a camp in advance)
- **Ras Al Jinz** — turtle watching (book online in advance)

> Oman's outdoor attractions are best visited October–April when temperatures are comfortable.`,
  },
  {
    title: 'Setting Up MEDC Electricity in Your Home',
    slug: 'medc-electricity-setup',
    category: 'Housing & utilities',
    summary: 'How to set up a new electricity connection or transfer a meter with Muscat Electricity Distribution Company.',
    last_verified: '2025-09-20',
    tags: ['medc', 'electricity', 'utilities', 'housing'],
    content: `## About MEDC

The **Muscat Electricity Distribution Company (MEDC)** is responsible for electricity distribution in the Muscat Governorate. Other regions are served by OETC/MZEC/DHOFAR distribution companies.

## New Connection vs Transfer

- **New connection:** For newly built properties with no existing meter
- **Transfer of account:** For existing properties where you're taking over from a previous tenant

## Documents for Account Transfer (Most Common)

1. Tenancy contract (with Baladiya stamp)
2. Your passport and Iqama
3. Previous tenant's account details (or meter number — on the meter itself)
4. Mobile number for OTP verification

## How to Apply

### Online (Recommended)
1. Visit medc.om
2. Register an account
3. Submit a "Transfer of Ownership" or "New Connection" request
4. Upload documents
5. Pay deposit (typically OMR 10–50 for residential)

### In-Person
Visit any MEDC customer service centre. Main centres in Al Qurum, Wadi Kabir, and Barka.

## Deposits and Payments

- Security deposit: Returned when you close the account
- Bills are issued monthly and can be paid via the app, kiosks, or online banking

## MEDC App

Download the MEDC app to:
- View and pay bills
- Report outages
- Track consumption

## Typical Timeline

Account transfer is usually processed within **2–5 working days** after document verification.

> If the property has outstanding bills from the previous tenant, these must be settled before a transfer can proceed.`,
  },
]

// ─── CHECKLISTS ───────────────────────────────────────────────────────────────

const checklists = [
  {
    title: 'New to Oman — First 30 Days',
    slug: 'new-to-oman-first-30-days',
    category: 'Arrival',
    description: 'The essential tasks to complete in your first month in Oman.',
    items: [
      { id: '1', text: 'Register your arrival with your embassy or consulate', note: 'Optional but recommended for emergency situations' },
      { id: '2', text: 'Get your medical examination at an approved clinic', note: 'Required for Iqama — your employer will advise on approved clinics' },
      { id: '3', text: 'Get your Iqama (residence card) processed', note: 'Usually handled by your employer\'s PRO' },
      { id: '4', text: 'Open a local bank account', note: 'You\'ll need your Iqama — see our Banking guide' },
      { id: '5', text: 'Get a local SIM card', note: 'Omantel and Ooredoo are the main providers' },
      { id: '6', text: 'Set up electricity (MEDC) for your home', note: 'Requires tenancy contract and Iqama' },
      { id: '7', text: 'Register your children at a school', note: 'Start this process immediately — waitlists are common' },
      { id: '8', text: 'Explore your nearest supermarkets and clinics', note: 'Carrefour, Lulu, and Nesto are widely available' },
    ],
  },
  {
    title: 'Iqama (Residence Card) Application',
    slug: 'iqama-application',
    category: 'Visas',
    description: 'Documents and steps to apply for your Omani residence card.',
    items: [
      { id: '1', text: 'Confirm your visa category with HR', note: 'Work permit, family sponsorship, etc.' },
      { id: '2', text: 'Get a medical examination at an approved clinic', note: 'Full blood test + chest X-ray usually required' },
      { id: '3', text: 'Collect 2 passport-size photographs (white background)', note: null },
      { id: '4', text: 'Provide your employer with passport and entry visa copies', note: null },
      { id: '5', text: 'Biometric registration at the ROP centre', note: 'Fingerprints and photo — your PRO will accompany you' },
      { id: '6', text: 'Collect your Iqama when notified by PRO', note: 'Usually 5–7 working days after biometrics' },
    ],
  },
  {
    title: 'Iqama Renewal',
    slug: 'iqama-renewal',
    category: 'Visas',
    description: 'Steps to renew your Omani residence card before it expires.',
    items: [
      { id: '1', text: 'Check your Iqama expiry date (at least 3 months before expiry)', note: 'Renewal must be initiated before expiry' },
      { id: '2', text: 'Notify your employer/PRO to initiate renewal', note: null },
      { id: '3', text: 'Complete a new medical examination if required', note: 'May be required every renewal cycle' },
      { id: '4', text: 'Provide updated photos if requested', note: null },
      { id: '5', text: 'Submit documents through your PRO to ROP', note: null },
      { id: '6', text: 'Pay renewal fees', note: 'Typically paid by employer but confirm with HR' },
      { id: '7', text: 'Collect renewed Iqama', note: null },
    ],
  },
  {
    title: 'Family Visa Application',
    slug: 'family-visa-application',
    category: 'Visas',
    description: 'How to sponsor your spouse and children to join you in Oman.',
    items: [
      { id: '1', text: 'Confirm you meet the minimum salary requirement for sponsorship', note: 'Typically OMR 350+ per month — check current ROP guidelines' },
      { id: '2', text: 'Obtain your employer NOC letter for family sponsorship', note: null },
      { id: '3', text: 'Collect marriage certificate (attested)', note: 'Must be attested by your home country foreign ministry and Oman embassy' },
      { id: '4', text: 'Collect birth certificates for children (attested)', note: null },
      { id: '5', text: 'Get passport copies for all family members', note: null },
      { id: '6', text: 'Submit application via your PRO to ROP', note: null },
      { id: '7', text: 'Family members travel to Oman once visa is approved', note: 'Visa is usually stamped on arrival or issued as an e-visa' },
      { id: '8', text: 'Complete medical examinations for family members', note: null },
      { id: '9', text: 'Collect family Iqamas', note: null },
    ],
  },
  {
    title: 'Driving Licence Conversion',
    slug: 'driving-licence-conversion',
    category: 'Driving',
    description: 'Convert your foreign driving licence to an Omani licence.',
    items: [
      { id: '1', text: 'Check if your nationality qualifies for direct conversion (no test)', note: 'Check with ROP — UK, EU, US, India, and many others qualify' },
      { id: '2', text: 'Get an eye test at an approved optician', note: 'Optician will provide a signed certificate' },
      { id: '3', text: 'Collect your original foreign driving licence', note: 'Must be valid at the time of conversion' },
      { id: '4', text: 'Bring your passport and valid Iqama', note: null },
      { id: '5', text: 'Bring 2 passport-size photos', note: null },
      { id: '6', text: 'Visit the ROP Traffic Directorate', note: 'Al Qurum main office or any governorate office' },
      { id: '7', text: 'Submit documents and pay fee', note: 'Fee is approximately OMR 20–30' },
      { id: '8', text: 'Collect your Omani driving licence', note: 'Same day or next working day in most cases' },
    ],
  },
  {
    title: 'Car Registration (New Purchase)',
    slug: 'car-registration-new',
    category: 'Driving',
    description: 'Steps to register a new or used car in your name in Oman.',
    items: [
      { id: '1', text: 'Purchase the vehicle from dealer or private seller', note: null },
      { id: '2', text: 'Obtain the transfer of ownership documents from seller', note: 'For used cars — seller must sign off at ROP' },
      { id: '3', text: 'Get car insurance before registration', note: 'Third-party insurance is mandatory at minimum' },
      { id: '4', text: 'Get vehicle inspection at an approved test centre', note: 'Required for used vehicles over a certain age' },
      { id: '5', text: 'Visit ROP Traffic Directorate with all documents', note: 'Original Iqama, insurance certificate, vehicle documents' },
      { id: '6', text: 'Pay registration fees', note: null },
      { id: '7', text: 'Collect Mulkiya (vehicle registration card)', note: 'This is your vehicle ownership document — keep it in the car' },
    ],
  },
  {
    title: 'Opening a Bank Account',
    slug: 'opening-bank-account-checklist',
    category: 'Banking',
    description: 'What to bring and do when opening your first bank account in Oman.',
    items: [
      { id: '1', text: 'Choose your bank (Bank Muscat, HSBC, Ahli Bank, NBO)', note: 'Consider ATM network, online banking, and minimum balance' },
      { id: '2', text: 'Collect your valid passport', note: null },
      { id: '3', text: 'Collect your valid Iqama', note: 'Most banks won\'t open an account without it' },
      { id: '4', text: 'Get a salary certificate from your employer', note: 'On company letterhead with HR signature and stamp' },
      { id: '5', text: 'Bring your employment contract if requested', note: null },
      { id: '6', text: 'Visit the branch and speak to a personal banking officer', note: null },
      { id: '7', text: 'Sign account opening forms and submit documents', note: null },
      { id: '8', text: 'Fund the account above the minimum balance', note: 'Usually OMR 50–300 depending on account type' },
      { id: '9', text: 'Set up online banking and mobile app', note: 'Essential for salary management and bill payments' },
    ],
  },
  {
    title: 'Setting Up Electricity (MEDC)',
    slug: 'setting-up-electricity-medc',
    category: 'Housing',
    description: 'Transfer electricity to your name when moving into a new rental.',
    items: [
      { id: '1', text: 'Obtain your tenancy contract (stamped by Baladiya)', note: 'Must be the official stamped version' },
      { id: '2', text: 'Note the electricity meter number (found on the meter)', note: null },
      { id: '3', text: 'Visit medc.om or the MEDC customer service centre', note: null },
      { id: '4', text: 'Submit account transfer application with documents', note: 'Tenancy contract + passport + Iqama' },
      { id: '5', text: 'Pay security deposit', note: 'Typically OMR 10–50, refunded when you vacate' },
      { id: '6', text: 'Download the MEDC app to manage bills', note: null },
      { id: '7', text: 'Check that the account is transferred within 2–5 working days', note: null },
    ],
  },
  {
    title: 'Setting Up Internet',
    slug: 'setting-up-internet',
    category: 'Housing',
    description: 'Getting a home broadband connection in Oman.',
    items: [
      { id: '1', text: 'Choose your internet provider: Omantel or Ooredoo', note: 'Omantel has wider fixed-line coverage; Ooredoo is competitive on fibre' },
      { id: '2', text: 'Check coverage at your address (providers\' websites have coverage maps)', note: null },
      { id: '3', text: 'Choose a plan (fibre is now widely available in Muscat)', note: null },
      { id: '4', text: 'Visit a branch or apply online', note: 'Bring Iqama and tenancy contract' },
      { id: '5', text: 'Schedule installation appointment', note: 'Usually 3–7 working days' },
      { id: '6', text: 'Be present for the installation', note: 'Technician will install router and test connection' },
    ],
  },
  {
    title: 'Enrolling a Child in School',
    slug: 'enrolling-child-in-school',
    category: 'Education',
    description: 'Steps to get your child into an international school in Oman.',
    items: [
      { id: '1', text: 'Research schools by curriculum type and location', note: 'British, American, IB, Indian — see our Education guide' },
      { id: '2', text: 'Contact shortlisted schools to check availability', note: 'Do this as early as possible — waiting lists are common' },
      { id: '3', text: 'Collect child\'s birth certificate (attested)', note: null },
      { id: '4', text: 'Collect previous school transcripts and records', note: null },
      { id: '5', text: 'Confirm vaccination records are up to date', note: 'Schools require vaccination history' },
      { id: '6', text: 'Complete the school\'s admission application form', note: null },
      { id: '7', text: 'Attend any entrance assessment or interview', note: 'Required by most schools' },
      { id: '8', text: 'Receive offer and pay registration deposit', note: null },
      { id: '9', text: 'Submit Iqamas for child and parent/guardian', note: null },
      { id: '10', text: 'Pay first term fees and receive start date', note: null },
    ],
  },
]

// ─── BUSINESSES ───────────────────────────────────────────────────────────────

const businesses = [
  {
    name: 'Badr Al Sama Hospital',
    category: 'Medical',
    subcategory: 'Hospital',
    description: 'A well-established private hospital in Muscat offering a full range of specialist services. Popular with expats for its English-speaking staff.',
    area: 'Muscat',
    address: 'Al Khuwair, Muscat',
    phone: '+968 2449 2111',
    is_featured: true,
  },
  {
    name: 'Starcare Hospital',
    category: 'Medical',
    subcategory: 'Hospital',
    description: 'Multi-specialty hospital with expert consultants and modern facilities. Accepts most Dhamani insurance plans.',
    area: 'Muscat',
    address: 'Madinat Al Sultan Qaboos, Muscat',
    phone: '+968 2479 2899',
    is_featured: false,
  },
  {
    name: 'Al Hayat Pharmacy',
    category: 'Medical',
    subcategory: 'Pharmacy',
    description: 'Large pharmacy chain with locations across Muscat. Stocks international brands and provides prescription dispensing.',
    area: 'Muscat',
    phone: '+968 2459 4444',
    is_featured: false,
  },
  {
    name: 'British School Muscat',
    category: 'Education',
    subcategory: 'International Schools',
    description: 'One of Oman\'s most prestigious international schools following the British National Curriculum. Excellent pastoral care and extracurricular activities.',
    area: 'Muscat',
    address: 'Darsait, Muscat',
    phone: '+968 2460 1077',
    website: 'https://britishschoolmuscat.com',
    is_featured: true,
  },
  {
    name: 'American International School (TAISM)',
    category: 'Education',
    subcategory: 'International Schools',
    description: 'Offering a US curriculum from Pre-K to Grade 12. A long-established school with a strong community of American and international families.',
    area: 'Muscat',
    address: 'Madinat Al Sultan Qaboos, Muscat',
    phone: '+968 2460 9093',
    is_featured: false,
  },
  {
    name: 'Al Busaidy, Mansoor Jamal & Co.',
    category: 'Legal & Finance',
    subcategory: 'Law Firms',
    description: 'One of Oman\'s leading law firms, offering corporate, employment, and expat legal services. English-speaking lawyers available.',
    area: 'Muscat',
    address: 'CBD, Muscat',
    phone: '+968 2481 4466',
    is_featured: false,
  },
  {
    name: 'Express PRO Services',
    category: 'Legal & Finance',
    subcategory: 'PRO Services',
    description: 'Specialist PRO service handling visas, Iqama renewals, attestation, and document translations for individuals and companies.',
    area: 'Muscat',
    phone: '+968 9912 3456',
    is_featured: false,
  },
  {
    name: 'Majid Al Futtaim Carrefour (City Centre)',
    category: 'Food & Grocery',
    subcategory: 'Supermarkets',
    description: 'The largest Carrefour in Oman, stocking a huge range of international products, fresh produce, and household goods.',
    area: 'Muscat',
    address: 'City Centre Muscat, Qurum',
    is_featured: true,
  },
  {
    name: 'Lulu Hypermarket',
    category: 'Food & Grocery',
    subcategory: 'Supermarkets',
    description: 'Popular hypermarket with multiple locations across Oman. Excellent for Asian grocery products, fresh meat, and competitive prices.',
    area: 'Muscat',
    is_featured: false,
  },
  {
    name: 'Muscat Movers',
    category: 'Home Services',
    subcategory: 'Moving Companies',
    description: 'Full-service moving company specialising in expat relocations. Offers packing, storage, and international shipping.',
    area: 'Muscat',
    phone: '+968 9988 7766',
    is_featured: false,
  },
  {
    name: 'Gulf Fitness Club',
    category: 'Fitness & Wellness',
    subcategory: 'Gyms',
    description: 'Modern gym with free weights, cardio equipment, and group fitness classes. Friendly multilingual staff.',
    area: 'Muscat',
    address: 'Al Khuwair, Muscat',
    phone: '+968 2448 9900',
    is_featured: false,
  },
  {
    name: 'Barka Medical Centre',
    category: 'Medical',
    subcategory: 'Clinics',
    description: 'General practice clinic serving the Barka/Al Batinah region. Offers GP consultations, vaccinations, and basic diagnostics.',
    area: 'Barka',
    phone: '+968 2688 3344',
    is_featured: false,
  },
  {
    name: 'Sohar International School',
    category: 'Education',
    subcategory: 'International Schools',
    description: 'Serving the expat community in Sohar with a British-based curriculum. Good links with the local industrial community.',
    area: 'Sohar',
    phone: '+968 2684 1122',
    is_featured: false,
  },
  {
    name: 'National Auto Garage',
    category: 'Automotive',
    subcategory: 'Garages & Service',
    description: 'Trusted multi-brand car service centre offering general maintenance, AC servicing, and mechanical repairs. English-speaking service advisors.',
    area: 'Muscat',
    address: 'Ghubra, Muscat',
    phone: '+968 2459 7700',
    is_featured: false,
  },
  {
    name: 'The Chedi Muscat',
    category: 'Hospitality',
    subcategory: 'Hotels',
    description: 'Oman\'s iconic five-star resort on the beachfront. Excellent for staycations, dining, and spa experiences. Popular with long-term residents.',
    area: 'Muscat',
    address: 'North Ghubra, Muscat',
    phone: '+968 2452 4400',
    website: 'https://www.thechedimuscat.com',
    is_featured: false,
  },
]

// ─── SEED FUNCTIONS ───────────────────────────────────────────────────────────

export async function seedGuides() {
  console.log('Seeding guides...')
  const { error } = await supabase.from('guides').upsert(
    guides.map(g => ({ ...g, is_published: true })),
    { onConflict: 'slug' }
  )
  if (error) { console.error('Guide seed error:', error); return false }
  console.log(`✓ Seeded ${guides.length} guides`)
  return true
}

export async function seedChecklists() {
  console.log('Seeding checklists...')
  const { error } = await supabase.from('checklists').upsert(
    checklists.map(cl => ({ ...cl, is_published: true })),
    { onConflict: 'slug' }
  )
  if (error) { console.error('Checklist seed error:', error); return false }
  console.log(`✓ Seeded ${checklists.length} checklists`)
  return true
}

export async function seedBusinesses() {
  console.log('Seeding businesses...')
  const { error } = await supabase.from('businesses').upsert(
    businesses.map(b => ({ ...b, is_published: true })),
    { onConflict: 'name' }
  )
  if (error) { console.error('Business seed error:', error); return false }
  console.log(`✓ Seeded ${businesses.length} businesses`)
  return true
}

export async function seedAll() {
  console.log('=== 360Oman Seed Script ===')
  const g = await seedGuides()
  const cl = await seedChecklists()
  const b = await seedBusinesses()
  if (g && cl && b) {
    console.log('=== Seed complete! ===')
  } else {
    console.log('=== Seed completed with errors — check above ===')
  }
}
