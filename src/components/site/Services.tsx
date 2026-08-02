"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useConsultation } from "./consultation";
import { ServiceDetailModal } from "./ServiceDetailModal";
import type { ServiceDetail } from "./ServiceDetailModal";

const ease = [0.16, 1, 0.3, 1] as const;

/* — Line icons, one per practice area — */
const Icon = {
  tax: (
    <>
      <path d="M6 3h9l3 3v15l-2.2-1.4L13.5 21 11 19.6 8.5 21 6 19.6z" />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" />
    </>
  ),
  ai: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.6" />
      <path d="M10.2 10.2h3.6v3.6h-3.6z" />
      <path d="M10 4.2V7M14 4.2V7M10 17v2.8M14 17v2.8M4.2 10H7M4.2 14H7M17 10h2.8M17 14h2.8" />
    </>
  ),
  assurance: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="m9.5 13 1.6 1.6L15 11" />
    </>
  ),
  cyber: (
    <>
      <path d="M12 3.2 19 6v5.4c0 4.2-2.8 7.7-7 8.6-4.2-.9-7-4.4-7-8.6V6z" />
      <circle cx="12" cy="10.8" r="1.6" />
      <path d="M12 12.4v2.4" />
    </>
  ),
  global: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.6c2.4 2.4 3.7 5.3 3.7 8.4S14.4 18 12 20.4C9.6 18 8.3 15.1 8.3 12S9.6 6 12 3.6z" />
    </>
  ),
  transaction: (
    <>
      <path d="M7 8h10M17 8l-3-3M17 8l-3 3" />
      <path d="M17 16H7M7 16l3-3M7 16l3 3" />
    </>
  ),
  wealth: (
    <>
      <ellipse cx="12" cy="6" rx="6" ry="2.4" />
      <path d="M6 6v5c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V6" />
      <path d="M6 11v5c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4v-5" />
    </>
  ),
  startup: (
    <>
      <path d="M12 3c3 2 4.6 5.2 4.6 9L12 16.5 7.4 12c0-3.8 1.6-7 4.6-9z" />
      <circle cx="12" cy="9.4" r="1.7" />
      <path d="M9.6 16.4 7 19.2l1.3-4.3M14.4 16.4 17 19.2l-1.3-4.3" />
    </>
  ),
  institution: (
    <>
      <path d="M3.2 20.5h17.6" />
      <path d="m12 3.2 8.4 4.4H3.6L12 3.2z" />
      <path d="M6.4 10v7M10.1 10v7M13.9 10v7M17.6 10v7" />
    </>
  ),
  operations: (
    <>
      <rect x="3.2" y="7.2" width="17.6" height="12.6" rx="2" />
      <path d="M9 7.2V5.8a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 5.8v1.4" />
      <path d="M3.2 12.4h17.6" />
    </>
  ),
  markets: (
    <>
      <path d="M3.5 19.6h17" />
      <path d="m4.8 15.4 4.3-4.5 3.2 2.7 6.2-6.1" />
      <path d="M14.2 7.5h4.3v4.3" />
    </>
  ),
  outsourcing: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="5.2" cy="5.8" r="1.8" />
      <circle cx="18.8" cy="5.8" r="1.8" />
      <circle cx="5.2" cy="18.2" r="1.8" />
      <circle cx="18.8" cy="18.2" r="1.8" />
      <path d="m6.6 7.2 3.5 3M17.4 7.2l-3.5 3M6.6 16.8l3.5-3M17.4 16.8l-3.5-3" />
    </>
  ),
};

/**
 * Twelve practice areas on a deliberately uneven grid: wide tiles spanning the
 * left column pair, narrow ones down the right, and a three-up row breaking
 * the rhythm in the middle. `span` applies from md up — below that the tiles
 * stack into a single column, and the spans across all tiles are kept summing
 * to a multiple of three so the grid never ends with a hole in it.
 */
type Tile = {
  title: string;
  icon: ReactNode;
  span: string;
  /** Full capability list. Tiles without one fall back to the enquiry form. */
  detail?: ServiceDetail;
};

const TILES: Tile[] = [
  {
    title: "Tax & Regulatory",
    icon: Icon.tax,
    span: "",
    detail: {
      title: "Tax & Regulatory",
      intro:
        "Strategic tax advisory and end-to-end regulatory compliance solutions for businesses, promoters and global enterprises.",
      groups: [
        {
          label: "Direct Tax",
          items: [
            "Corporate Tax Advisory",
            "Tax Planning & Structuring",
            "Income Tax Return Compliance",
            "Tax Assessments & Appeals",
            "Search & Survey Representation",
            "TDS/TCS Advisory & Compliance",
            "Tax Due Diligence",
            "Tax Litigation & Representation",
          ],
        },
        {
          label: "GST",
          items: [
            "GST Advisory & Compliance",
            "GST Registration & Structuring",
            "GST Return Filing",
            "GST Audit & Health Check",
            "GST Assessments & Litigation",
            "Refunds & Input Tax Credit Advisory",
            "GST Due Diligence",
            "E-Invoicing & E-Way Bill Advisory",
          ],
        },
        {
          label: "International Tax",
          items: [
            "Cross-Border Tax Advisory",
            "Transfer Pricing",
            "DTAA Advisory",
            "FEMA Advisory",
            "Global Tax Structuring",
            "Expatriate Taxation",
            "Foreign Investment Advisory",
          ],
        },
        {
          label: "Regulatory Compliance",
          items: [
            "Company Law Compliance",
            "LLP Compliance",
            "FEMA & RBI Compliances",
            "SEBI Regulatory Support",
            "ROC Filings",
            "Secretarial Compliance Support",
          ],
        },
        {
          label: "Tax Litigation",
          items: [
            "Representation before Tax Authorities",
            "Appeals & Tribunal Matters",
            "Advance Ruling Advisory",
            "Tax Notices & Assessments",
            "Settlement & Compliance Strategy",
          ],
        },
      ],
    },
  },
  {
    title: "AI & Digital Transformation",
    icon: Icon.ai,
    span: "",
    detail: {
      title: "AI & Digital Transformation",
      intro:
        "Helping businesses transform finance, compliance and operations through AI, automation and data-driven solutions.",
      groups: [
        {
          label: "Finance Transformation",
          items: [
            "AI-Driven Finance Transformation",
            "Finance Process Re-engineering",
            "Digital Finance Strategy",
            "Financial Planning & Analysis (FP&A)",
            "CFO Dashboard & MIS Automation",
          ],
        },
        {
          label: "Intelligent Automation",
          items: [
            "Robotic Process Automation (RPA)",
            "Workflow Automation",
            "Document Automation",
            "Invoice Processing Automation",
            "Accounts Payable & Receivable Automation",
          ],
        },
        {
          label: "AI Solutions",
          items: [
            "AI Readiness Assessment",
            "AI Strategy & Implementation",
            "AI-Powered Business Intelligence",
            "AI-Based Financial Analytics",
            "AI Governance & Risk Advisory",
          ],
        },
        {
          label: "Data Analytics & Business Intelligence",
          items: [
            "Data Analytics & Visualization",
            "Business Intelligence Dashboards",
            "Management Reporting",
            "Predictive Analytics",
            "Performance Monitoring",
          ],
        },
        {
          label: "Digital Compliance",
          items: [
            "Digital Tax & GST Compliance Solutions",
            "Compliance Workflow Automation",
            "Regulatory Reporting Automation",
            "E-Invoicing & Digital Record Management",
          ],
        },
        {
          label: "Enterprise Digital Advisory",
          items: [
            "ERP Advisory & Implementation Support",
            "Digital Transformation Roadmap",
            "Business Process Optimization",
            "Technology Advisory",
            "Change Management & Digital Adoption",
          ],
        },
      ],
    },
  },
  {
    title: "Audit & Assurance",
    icon: Icon.assurance,
    span: "",
    detail: {
      title: "Audit & Assurance",
      intro:
        "Delivering independent assurance, risk-focused insights and regulatory confidence to strengthen governance and business performance.",
      groups: [
        {
          label: "Audit & Assurance",
          items: [
            "Statutory Audit",
            "Tax Audit",
            "Limited Review",
            "Audit under Special Statutes",
            "Group Reporting & Consolidation Support",
            "IFRS / Ind AS Reporting Support",
          ],
        },
        {
          label: "Internal Audit",
          items: [
            "Risk-Based Internal Audit",
            "Operational Audit",
            "Process & Control Review",
            "Internal Financial Controls (IFC)",
            "SOP Review & Process Improvement",
            "Management Audit",
          ],
        },
        {
          label: "Risk Assurance",
          items: [
            "Internal Control Evaluation",
            "Enterprise Risk Assessment",
            "Governance Review",
            "Compliance Review",
            "Business Process Risk Assessment",
            "Control Framework Design",
          ],
        },
        {
          label: "Due Diligence",
          items: [
            "Financial Due Diligence",
            "Commercial Due Diligence Support",
            "Vendor & Customer Due Diligence",
            "Transaction Support",
            "Business Health Check",
          ],
        },
        {
          label: "Specialized Assurance",
          items: [
            "Bank Branch Audit",
            "Stock & Inventory Audit",
            "Concurrent Audit",
            "Revenue Assurance",
            "Grant & Fund Utilization Audit",
            "Agreed-Upon Procedures (AUP)",
          ],
        },
        {
          label: "Financial Reporting Advisory",
          items: [
            "Financial Statement Preparation",
            "Accounting Advisory",
            "Ind AS / IFRS Advisory",
            "Accounting Policy Review",
            "Financial Reporting Support",
          ],
        },
      ],
    },
  },
  {
    title: "Cyber Security & Digital Trust",
    icon: Icon.cyber,
    span: "lg:col-span-2",
    detail: {
      title: "Cyber Security & Digital Trust",
      intro:
        "Helping organizations strengthen cyber resilience, protect digital assets and build trust through governance, risk and security advisory services.",
      groups: [
        {
          label: "Cyber Security Advisory",
          items: [
            "Cyber Security Risk Assessment",
            "Cyber Security Strategy & Roadmap",
            "Security Governance Framework",
            "Security Awareness & Advisory",
            "Third-Party Cyber Risk Assessment",
          ],
        },
        {
          label: "Information Systems Audit",
          items: [
            "Information Systems (IS) Audit",
            "IT General Controls (ITGC) Review",
            "Application Controls Review",
            "ERP & IT Environment Review",
            "Technology Risk Assessment",
          ],
        },
        {
          label: "Governance, Risk & Compliance (GRC)",
          items: [
            "IT Governance Advisory",
            "Information Security Governance",
            "Risk & Compliance Framework",
            "Regulatory Compliance Advisory",
            "IT Policy & SOP Development",
          ],
        },
        {
          label: "Digital Trust & Data Protection",
          items: [
            "Data Privacy Advisory",
            "Personal Data Protection Compliance",
            "Information Security Review",
            "Digital Trust Framework",
            "Vendor & Third-Party Risk Assessment",
          ],
        },
      ],
    },
  },
  {
    title: "Cross-Border Transactions Advisory",
    icon: Icon.global,
    span: "",
    detail: {
      title: "Cross-Border Transactions Advisory",
      intro:
        "Enabling businesses to expand globally through cross-border tax, regulatory, transaction and strategic advisory services.",
      groups: [
        {
          label: "International Tax",
          items: [
            "International Tax Advisory",
            "Cross-Border Tax Structuring",
            "DTAA Advisory",
            "Global Tax Planning",
            "Expatriate Taxation",
            "Withholding Tax Advisory",
          ],
        },
        {
          label: "Cross-Border Transactions",
          items: [
            "Inbound & Outbound Investment Advisory",
            "Cross-Border Business Structuring",
            "Overseas Business Expansion",
            "International Transaction Advisory",
            "Foreign Investment Structuring",
          ],
        },
        {
          label: "FEMA & RBI Advisory",
          items: [
            "FEMA Compliance",
            "RBI Approvals & Reporting",
            "ODI & FDI Advisory",
            "Overseas Investment Compliance",
            "FEMA Due Diligence",
          ],
        },
        {
          label: "Transfer Pricing",
          items: [
            "Transfer Pricing Advisory",
            "Transfer Pricing Documentation",
            "Benchmarking Studies",
            "Transfer Pricing Assessments",
            "APA & MAP Support",
          ],
        },
        {
          label: "Global Regulatory Compliance",
          items: [
            "Cross-Border Regulatory Compliance",
            "International Business Compliance",
            "Overseas Entity Compliance Support",
            "Global Reporting Advisory",
            "Multi-Jurisdiction Compliance Coordination",
          ],
        },
      ],
    },
  },
  {
    title: "Business Valuation, Mergers & Acquisitions",
    icon: Icon.transaction,
    span: "lg:col-span-2",
    detail: {
      title: "Business Valuation, Mergers & Acquisitions",
      intro:
        "Supporting businesses through every stage of their lifecycle with strategic corporate, transaction and financial advisory services.",
      groups: [
        {
          label: "Corporate Advisory",
          items: [
            "Business Incorporation & Entity Structuring",
            "Corporate Restructuring",
            "Secretarial & Corporate Compliance Support",
            "Corporate Governance Advisory",
            "Business Exit & Succession Planning",
          ],
        },
        {
          label: "Transaction Advisory",
          items: [
            "Buy-Side & Sell-Side Advisory",
            "Financial Due Diligence",
            "Commercial Due Diligence Support",
            "Transaction Structuring",
            "Deal Advisory",
          ],
        },
        {
          label: "Business Valuation",
          items: [
            "Business & Equity Valuation",
            "Share Valuation",
            "Valuation for Mergers & Acquisitions",
            "Valuation for Regulatory & Tax Purposes",
            "Fair Value & Impairment Assessment",
          ],
        },
        {
          label: "Mergers & Acquisitions",
          items: [
            "M&A Strategy & Advisory",
            "Acquisition & Divestment Support",
            "Joint Ventures & Strategic Alliances",
            "Post-Merger Integration Support",
            "Transaction Documentation Support",
          ],
        },
      ],
    },
  },
  {
    title: "Wealth & Family Office",
    icon: Icon.wealth,
    span: "",
    detail: {
      title: "Wealth & Family Office",
      intro:
        "Helping business families, entrepreneurs and high-net-worth individuals preserve, grow and transition wealth through strategic advisory and governance solutions.",
      groups: [
        {
          label: "Wealth Structuring",
          items: [
            "Wealth Structuring Advisory",
            "Asset Protection Planning",
            "Tax-Efficient Wealth Planning",
            "Family Investment Structuring",
            "Cross-Border Wealth Advisory",
          ],
        },
        {
          label: "Family Office Advisory",
          items: [
            "Single & Multi-Family Office Advisory",
            "Family Governance Framework",
            "Family Constitution",
            "Family Council Advisory",
            "Family Office Structuring",
          ],
        },
        {
          label: "Estate & Succession Planning",
          items: [
            "Succession Planning",
            "Estate Planning",
            "Business Succession Advisory",
            "Trust & Estate Structuring Support",
            "Legacy Planning",
          ],
        },
        {
          label: "Trust & Entity Structuring",
          items: [
            "Family Trust Structuring",
            "Private & Public Trust Advisory",
            "HUF Formation & Restructuring",
            "One Person Company (OPC) Advisory",
            "Family Investment Holding Structures",
          ],
        },
      ],
    },
  },
  {
    title: "Startup & Growth Advisory",
    icon: Icon.startup,
    span: "",
    detail: {
      title: "Startup & Growth Advisory",
      intro:
        "Helping startups, entrepreneurs and growth-stage businesses build, scale and raise capital through strategic, financial and regulatory advisory.",
      groups: [
        {
          label: "Business Setup & Structuring",
          items: [
            "Business Incorporation (Company, LLP, OPC & Partnership)",
            "Startup Entity Structuring",
            "Shareholding & Cap Table Advisory",
            "Founder Agreements & ESOP Structuring Support",
            "Corporate & Regulatory Registrations",
          ],
        },
        {
          label: "Startup Advisory",
          items: [
            "Startup India Recognition",
            "DPIIT Registration",
            "Business Model & Growth Strategy",
            "Financial & Business Planning",
            "Startup Compliance Advisory",
          ],
        },
        {
          label: "Fund Raising & Investor Readiness",
          items: [
            "Seed, Angel & Venture Capital Advisory",
            "Debt & Equity Fund Raising",
            "Investor Pitch Deck Support",
            "Financial Modelling & Valuation",
            "Due Diligence Readiness",
            "Investment Term Sheet Advisory",
          ],
        },
        {
          label: "Government Incentives & Subsidies",
          items: [
            "Government Incentive Advisory",
            "PLI Scheme Advisory",
            "MSME Registration & Benefits",
            "Export Incentives",
            "State & Central Government Subsidies",
            "Grant & Incentive Compliance",
          ],
        },
        {
          label: "Virtual CFO Services",
          items: [
            "CFO Advisory",
            "Budgeting & Forecasting",
            "MIS & Management Reporting",
            "Cash Flow Management",
            "Strategic Financial Planning",
            "KPI & Performance Monitoring",
          ],
        },
      ],
    },
  },
  {
    title: "Institutional & Social Sector Advisory",
    icon: Icon.institution,
    span: "lg:col-span-2",
    detail: {
      title: "Institutional & Social Sector Advisory",
      intro:
        "Supporting governments, public institutions, not-for-profit organizations and social sector entities with governance, compliance, financial management and strategic advisory solutions.",
      groups: [
        {
          label: "Trusts & Not-for-Profit Organizations",
          items: [
            "Public Charitable Trust Advisory",
            "Private Trust Advisory",
            "Religious & Educational Trust Advisory",
            "NGO & Section 8 Company Advisory",
            "Society Registration & Compliance",
            "Trust Governance & Restructuring",
          ],
        },
        {
          label: "Cooperative & Institutional Advisory",
          items: [
            "Cooperative Society Advisory",
            "Housing Society Advisory",
            "Producer Company Advisory",
            "Institutional Governance",
          ],
        },
        {
          label: "Government & Public Sector Advisory",
          items: [
            "Central & State Government Advisory",
            "Municipal Corporations & Local Bodies",
            "Panchayats & Urban Local Bodies (ULBs)",
            "Government Agencies & Authorities",
            "Public Sector Undertakings (PSUs)",
            "Government Project & Scheme Advisory",
          ],
        },
        {
          label: "Regulatory & Tax Advisory",
          items: [
            "Income Tax Exemption Advisory",
            "12AB & 80G Registration",
            "CSR Registration & Compliance",
            "FCRA Advisory",
            "Charity Commissioner Compliance",
            "Regulatory Representation",
          ],
        },
      ],
    },
  },
  {
    title: "Business Management & Project Execution",
    icon: Icon.operations,
    span: "lg:col-span-2",
    detail: {
      title: "Business Management & Project Execution",
      intro:
        "To establish, manage and oversee day-to-day business operations, enabling them to focus on strategic decisions while we execute their vision with professional governance and operational excellence.",
      groups: [
        {
          label: "Business Setup & Execution",
          items: [
            "Greenfield Project Execution",
            "Business Setup & Operational Launch",
            "Entity Formation & Registrations",
            "Vendor & Service Provider Identification",
            "Infrastructure & Office Setup Coordination",
          ],
        },
        {
          label: "Business Operations Management",
          items: [
            "End-to-End Business Operations",
            "Business Process Management",
            "Operational Performance Monitoring",
            "Standard Operating Procedures (SOPs)",
            "Operational Efficiency & Cost Optimization",
          ],
        },
        {
          label: "Human Capital & Administration",
          items: [
            "Recruitment & Talent Acquisition",
            "HR Policy & Process Development",
            "Payroll & HR Administration",
            "Performance Management Framework",
            "Team Coordination & Supervision",
          ],
        },
        {
          label: "Finance & Compliance Management",
          items: [
            "Accounts & Bookkeeping Oversight",
            "Receipts & Payments Management",
            "Budgetary Control & MIS Reporting",
            "Statutory & Regulatory Compliance",
            "Vendor Payments & Working Capital Monitoring",
          ],
        },
      ],
    },
  },
  {
    title: "Capital Markets & IPO Advisory",
    icon: Icon.markets,
    span: "lg:col-span-2",
    detail: {
      title: "Capital Markets & IPO Advisory",
      intro:
        "Helping businesses access capital markets through strategic advisory, IPO readiness, financial reporting and transaction support across every stage of the capital raising journey.",
      groups: [
        {
          label: "IPO Readiness",
          items: [
            "IPO Readiness Assessment",
            "Corporate Restructuring",
            "Financial Reporting Readiness",
            "Corporate Governance Framework",
            "Internal Controls & Process Enhancement",
            "Listing Preparation Support",
          ],
        },
        {
          label: "Capital Raising Advisory",
          items: [
            "Equity Capital Raising",
            "Private Equity & Venture Capital Advisory",
            "Qualified Institutional Placement (QIP) Support",
            "Rights Issue & Preferential Allotment Advisory",
            "Debt Capital Advisory",
            "Investor Readiness",
          ],
        },
        {
          label: "Regulatory & Compliance Support",
          items: [
            "SEBI Regulatory Advisory",
            "Stock Exchange Compliance Support",
            "Companies Act Compliance",
            "Listing Agreement Compliance",
            "Corporate Governance Advisory",
            "Regulatory Documentation Support",
          ],
        },
        {
          label: "Capital & Financial Advisory",
          items: [
            "Project Finance Advisory",
            "Debt & Equity Fund Raising",
            "CMA Data & Financial Modelling",
            "Investor Presentation Support",
            "Financial Feasibility Studies",
          ],
        },
        {
          label: "IPO Project Management & Listed Entity Advisory",
          items: [
            "End-to-End IPO Coordination",
            "Merchant Banker Coordination",
            "Legal & Secretarial Coordination",
            "Auditor & Advisor Coordination",
            "IPO Timeline & Milestone Management",
            "Continuous Listing Compliance",
            "Corporate Governance Support",
            "Quarterly & Annual Financial Reporting",
            "Investor Communication Support",
            "Board & Committee Advisory",
          ],
        },
      ],
    },
  },
  {
    title: "Global Capability & Outsourcing Services",
    icon: Icon.outsourcing,
    span: "lg:col-span-2",
    detail: {
      title: "Global Capability & Outsourcing Services",
      intro:
        "Delivering scalable outsourcing solutions that enhance efficiency, strengthen compliance and enable businesses to focus on strategic growth while we manage their critical business processes.",
      groups: [
        {
          label: "Finance & Accounting Outsourcing",
          items: [
            "Accounting & Bookkeeping",
            "Accounts Payable & Receivable",
            "General Ledger Management",
            "Bank Reconciliation",
            "Financial Reporting & MIS",
            "Virtual Accounting Department",
          ],
        },
        {
          label: "Legal Process Outsourcing (LPO)",
          items: [
            "Legal Compliance Management",
            "Contract Administration Support",
            "Compliance Calendar Management",
            "Regulatory Documentation Support",
            "Due Diligence Support",
            "Legal Research & Documentation",
          ],
        },
        {
          label: "Payroll & HR Outsourcing",
          items: [
            "Payroll Processing",
            "Employee Tax Compliance",
            "HR Administration",
            "Leave & Attendance Management",
            "Labour Law Compliance Coordination",
            "HR Documentation Support",
          ],
        },
        {
          label: "IT & Digital Support Services",
          items: [
            "IT Helpdesk Coordination",
            "ERP & Business Application Support",
            "Cloud & Digital Workplace Support",
            "Software Vendor Coordination",
            "IT Asset Management",
            "Technology Support Services",
          ],
        },
        {
          label: "Research & Development (R&D)",
          items: [
            "Industry & Sector Research",
            "Tax & Policy Research",
            "Financial & Investment Research",
            "Economic & Market Analysis",
            "Feasibility Studies",
            "Business Model Research",
            "Product & Process Innovation Support",
            "Benchmarking & Best Practices Analysis",
          ],
        },
      ],
    },
  },
];

/**
 * A tile rests light and quiet — icon and name only. On hover it turns navy,
 * the icon lifts and warms, and the "Explore" cue fades in.
 *
 * The tile has no fixed height: it takes exactly what its heading needs, and
 * the grid squares each row off to its tallest tile. The Explore cue therefore
 * shares the icon's row rather than sitting under the heading — it is shorter
 * than the icon, so fading it in cannot change the tile's height and jog the
 * rest of the row.
 *
 * Below md there is no hover to rely on, so the cue is always visible.
 */
function Tile({
  tile,
  i,
  onOpen,
}: {
  tile: Tile;
  i: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 6) * 0.05, ease }}
      // Alternating white / tinted surfaces so the grid reads as a chequered
      // set of cards rather than one flat slab.
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[16px] ${
        i % 2 === 0 ? "bg-white" : "bg-cloud"
      } p-[clamp(0.7rem,1.7vh,0.95rem)] text-left ring-1 ring-inset ring-navy-900/[0.09] shadow-[0_1px_2px_rgba(10,23,40,0.04),0_10px_26px_-20px_rgba(10,23,40,0.45)] transition-[background-color,box-shadow,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:bg-navy-800 hover:shadow-[0_28px_52px_-24px_rgba(10,23,40,0.6)] ${tile.span}`}
    >
      {/* corner bloom — only lights up once the tile has gone dark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-accent-500/0 blur-3xl transition-colors duration-700 group-hover:bg-accent-500/20"
      />
      {/* accent rule that sweeps across the foot on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent-500 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between gap-2">
        {/* icon in a filled chip — carries far more weight on the page than a
            bare line mark at this tile size */}
        <span className="flex h-[clamp(1.7rem,3.7vh,2.15rem)] w-[clamp(1.7rem,3.7vh,2.15rem)] shrink-0 items-center justify-center rounded-[10px] bg-accent-500/12 text-accent-600 transition-colors duration-500 group-hover:bg-accent-500 group-hover:text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-1/2 w-1/2 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {tile.icon}
          </svg>
        </span>

        <span className="inline-flex shrink-0 items-center gap-1 pt-1 text-[10px] font-800 uppercase tracking-[0.12em] text-accent-600 transition-all duration-500 group-hover:text-accent-300 md:opacity-0 md:group-hover:opacity-100">
          Explore
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5"
            fill="none"
          >
            <path
              d="M3 8h9M8 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h3 className="relative mt-[clamp(0.6rem,1.9vh,1.15rem)] font-display text-[clamp(0.92rem,1.95vh,1.18rem)] font-800 leading-[1.16] tracking-[-0.015em] text-navy-700 transition-colors duration-500 group-hover:text-white">
        {tile.title}
      </h3>
    </motion.button>
  );
}

export function Services() {
  const openConsult = useConsultation();
  const [detail, setDetail] = useState<ServiceDetail | null>(null);

  return (
    // The whole section is sized to one screen: everything below is capped by
    // viewport HEIGHT as well as width, so the twelve tiles and the heading
    // still clear a short laptop without the page needing to scroll.
    <section
      id="services"
      data-section="services"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white pt-24 pb-8 sm:pt-28"
    >
      {/* soft top separation from the dark section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-900/10 to-transparent" />
      {/* ambient brand lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_0%,rgba(78,167,46,0.06),transparent_55%)]" />

      <div className="container-kaps relative z-10">
        {/* Eagle mark in the empty band to the right of the heading. The wrapper
            is half the image's width and clips the overflow, so only the left
            half shows and the right half is cut away. The source PNG has an
            opaque grey backdrop, so it is inverted (light-on-dark becomes
            dark-on-light), multiplied into the white page and faded at the
            edges with a radial mask. */}
        <div className="pointer-events-none absolute -top-52 right-[calc((min(100vw,1240px)-100vw)/2)] -z-10 hidden w-[clamp(350px,32vw,600px)] overflow-hidden lg:block">
          <Image
            src="/Eagle1.png"
            alt=""
            aria-hidden
            width={1536}
            height={1024}
            className="h-auto w-[200%] max-w-none select-none opacity-40 mix-blend-multiply invert [mask-image:radial-gradient(ellipse_at_center,#000_42%,transparent_72%)]"
          />
        </div>

        {/* ---------- Header, full width ---------- */}
        <div className="mb-[clamp(0.75rem,2vh,1.25rem)] inline-flex items-center gap-3">
          <span className="h-px w-8 bg-accent-500" />
          <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-600">
            What we do
          </span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-4xl font-display text-[clamp(1.6rem,min(3.6vw,5.2vh),2.9rem)] font-800 leading-[1.08] tracking-[-0.02em] text-navy-700 text-balance"
        >
          <span className="text-accent-600">One</span> professional partner for
          every regulatory, financial and advisory need.
        </motion.h2>
        {/* ---------- Bento, full width. Six columns from lg, where six of the
            twelve tiles take a double span — so each row carries a different
            number of tiles (5, 4, then 3) and no two rows read alike. Below lg
            the spans drop away and the tiles pair up, then stack. ---------- */}
        <div className="mt-[clamp(1.25rem,3.4vh,2.5rem)] grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {TILES.map((t, i) => (
            <Tile
              key={t.title}
              tile={t}
              i={i}
              // Tiles that carry a capability list open it; the rest still
              // route to the enquiry form.
              onOpen={() => (t.detail ? setDetail(t.detail) : openConsult())}
            />
          ))}
        </div>
      </div>

      <ServiceDetailModal detail={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
