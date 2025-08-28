import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";

const VENDORS_KEY = "vendors";
const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function Home() {
  // UI state for add-vendor form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    contact: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // Vendors loaded from localStorage for "Recent Vendors" card
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(VENDORS_KEY) || "[]");
    // newest first
    stored.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    setVendors(stored);
  }, []);

  const onField = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.category) errs.category = "Category is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const id = slugify(form.name);
    const newVendor = {
      id,
      name: form.name,
      category: form.category,
      status: "Active",
      contact: form.contact,
      phone: form.phone,
      address: form.address,
      kpis: { mtdSpend: 0, ytdSpend: 0, onTimePct: 1, openInvoices: 0 },
      invoices: [],
      createdAt: Date.now(),
    };

    // upsert into localStorage
    const existing = JSON.parse(
      localStorage.getItem(VENDORS_KEY) || "[]"
    ).filter((v) => v.id !== id);
    const next = [newVendor, ...existing];
    localStorage.setItem(VENDORS_KEY, JSON.stringify(next));
    setVendors(next.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));

    // reset UI
    setShowForm(false);
    setForm({ name: "", category: "", contact: "", phone: "", address: "" });
    setErrors({});
  };

  return (
    <section className="page page--home">
      {/* A generic container to constrain width and add padding */}
      <div className="container stack">
        <h1 className="page-title">Vendor Tracker</h1>
        <p className="page-subtitle">
          Track vendors, contacts, and reports. Start by adding a vendor.
        </p>

        {/* Call to action row */}
        <div className="cta-row">
          <Link className="btn btn--primary" to="/vendors">
            Go to Vendors
          </Link>
          <Link className="btn" to="/reports">
            View Reports
          </Link>
        </div>

        {/* Add Vendor card */}
        <div className="card">
          <div className="cta-row" style={{ margin: 0 }}>
            <button
              className="btn btn--primary"
              onClick={() => setShowForm((s) => !s)}
            >
              {showForm ? "Close" : "Add Vendor"}
            </button>
            <span className="page-subtitle">
              Create a vendor (stored locally for now)
            </span>
          </div>

          {showForm && (
            <form
              className="stack"
              style={{ "--stack-gap": "1rem", marginTop: "1rem", marginBottom: "1rem" }}
              onSubmit={submit}
            >
              <div className="form-row">
                <FormInput
                  label="Vendor Name"
                  name="name"
                  value={form.name}
                  onChange={onField}
                  required
                  error={errors.name}
                  placeholder="e.g., Acme Supplies"
                />
                <FormInput
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={onField}
                  required
                  error={errors.category}
                  placeholder="e.g., Office, IT, Facilities"
                />
                <FormInput
                  label="Contact Email"
                  type="email"
                  name="contact"
                  value={form.contact}
                  onChange={onField}
                  placeholder="name@example.com"
                />
                <FormInput
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={onField}
                  placeholder="(555) 123-4567"
                />
              </div>
              <FormInput
                label="Address"
                name="address"
                value={form.address}
                onChange={onField}
                as="textarea"
                rows={2}
                placeholder="Street, City, State"
              />
              <div className="form-actions">
                <button className="btn btn--primary" type="submit">Save Vendor</button>
                
              </div>
            </form>
          )}
        </div>

        {/* A simple feature area */}
        <div className="grid">
          <div className="card">
            <h2 className="card-title">Fast Routing</h2>
            <p className="card-text">
              Client-side navigation with React Router. COMPLETE SORTA
            </p>
          </div>
          <div className="card">
            <h2 className="card-title">Controlled Forms</h2>
            <p className="card-text">
              Validate inputs and manage state cleanly. STILL NEED
            </p>
          </div>
          <div className="card">
            <h2 className="card-title">MERN READY</h2>
            <p className="card-text">
              Hook up Express + MongoDb when the UI is set. NEED MONGO DB AND
              EXPRESS API
            </p>
          </div>
        </div>

        {/* Home dashboard rows */}
        <div className="grid">
          <div className="card">
            <h2 className="card-title">Recent Vendors</h2>
            {vendors.length === 0 ? (
              <p className="card-text">No vendors yet — add one above.</p>
            ) : (
              <ul className="stack" style={{ "--stack-gap": ".5rem" }}>
                {vendors.slice(0, 5).map((v) => (
                  <li key={v.id}>
                    <Link className="btn btn--link" to={`/vendors/${v.id}`}>
                      {v.name}
                    </Link>
                    <span className="card-text" style={{ marginLeft: ".5rem" }}>
                      • {v.category || "Uncategorized"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card">
            <h2 className="card-title">Copy previous orders</h2>
            <p className="card-text">
              Have a new page where user can see previous orders and copy them.
              (CSV import later)
            </p>
          </div>

          <div className="card">
            <h2 className="card-title">Most Popular Vendor</h2>
            <p className="card-text">
              You have spent the most money with Vendor X (wire up once invoices
              exist)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
