import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

export default function VendorDetail() {
  const { vendorId } = useParams();

  // Mock DB
  const vendors = {
    "lester-llc": {
      id: "lester-llc",
      name: "Lester's Logistics Company",
      category: "IT",
      status: "Active",
      contact: "support@lester.com",
      phone: "(555) 010-1234",
      address: "123 Playground St, Los Santos, CA",
      kpis: { mtdSpend: 8240.12, ytdSpend: 68240.55, onTimePct: 0.968, openInvoices: 2 },
      invoices: [
        { id: "INV-10244", date: "2025-08-18", amount: 1240.55, due: "2025-09-01", status: "Paid" },
        { id: "INV-10198", date: "2025-08-07", amount: 4200.0, due: "2025-08-21", status: "Paid" },
        { id: "INV-10033", date: "2025-07-22", amount: 2800.0, due: "2025-08-05", status: "Pending" },
      ],
    },
    "cluck-bell": {
      id: "cluck-bell",
      name: "Cluck n Bells",
      category: "Food",
      status: "Active",
      contact: "support@clucknbell.example",
      phone: "(555) 010-9876",
      address: "44 Dingleberry Blvd, San Andreas, CA",
      kpis: { mtdSpend: 9800.0, ytdSpend: 112400.9, onTimePct: 0.892, openInvoices: 2 },
      invoices: [
        { id: "CB-5592", date: "2025-08-16", amount: 9800.0, due: "2025-08-30", status: "Pending" },
        { id: "CB-5518", date: "2025-08-01", amount: 15000.0, due: "2025-08-15", status: "Paid Late" },
      ],
    },
    "ponsonboys": {
      id: "ponsonboys",
      name: "Ponsonboys",
      category: "High-end Fashion",
      status: "Active",
      contact: "support@ponsonboys.example",
      phone: "(555) 010-9876",
      address: "44 Strawberry Ave, Los Santos, CA",
      kpis: { mtdSpend: 9800.0, ytdSpend: 112400.9, onTimePct: 0.923, openInvoices: 2 },
      invoices: [
        { id: "P-5592", date: "2025-08-16", amount: 9800.0, due: "2025-08-30", status: "Pending" },
        { id: "P-5518", date: "2025-08-01", amount: 15000.0, due: "2025-08-15", status: "Paid Late" },
      ],
    },
  };

  const vendor = vendors[vendorId] ?? vendors["cluck-bell"];

  const kpiCards = [
    { label: "MTD Spend", value: `$${vendor.kpis.mtdSpend.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, subtext: "Month to date" },
    { label: "YTD Spend", value: `$${vendor.kpis.ytdSpend.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, subtext: "Year to date" },
    { label: "On‑Time %", value: `${Math.round(vendor.kpis.onTimePct * 100)}%`, subtext: "All invoices" },
    { label: "Open Invoices", value: vendor.kpis.openInvoices, subtext: "Awaiting payment" },
  ];

  const columns = useMemo(
    () => [
      { key: "date", label: "Date" },
      { key: "id", label: "Invoice #" },
      { key: "amount", label: "Amount", render: (v) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
      { key: "due", label: "Due" },
      { key: "status", label: "Status" },
    ],
    []
  );

  return (
    <section className="page page--vendor-detail">
      <div className="container stack" style = {{paddingTop: "1.5rem" }}>
        <nav aria-label="Breadcrumb">
          <Link to="/vendors" className="btn btn--primary" style={{ borderColor: "transparent" }}>
            ← Vendors
          </Link>
        </nav>

        <header className="vendor-header">
          <div className="vendor-header__main">
            <h1 className="page-title" style={{ margin: 0 }}>{vendor.name}</h1>
            <span className="vendor-meta__item">{vendor.category} • {vendor.status}</span>
          </div>
          <div className="vendor-meta">
            <div className="card">
              <strong>Contact</strong>
              <div>{vendor.contact}</div>
              <div>{vendor.phone}</div>
            </div>
            <div className="card">
              <strong>Address</strong>
              <div>{vendor.address}</div>
            </div>
          </div>
        </header>

        <div className="grid kpi-grid">
          {kpiCards.map((k) => (
            <StatCard key={k.label} {...k} />
          ))}

          <div className="card span-all">
            <h2 className="card-title">Recent Invoices</h2>
            <DataTable columns={columns} rows={vendor.invoices} keyField="id" />
            {/* TODO: replace with services/api.js -> getVendor(vendorId), getVendorInvoices(vendorId) */}
          </div>
        </div>
      </div>
    </section>
  );
}
