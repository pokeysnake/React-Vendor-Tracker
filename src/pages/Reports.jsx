import { useMemo, useState } from "react";
import DateRangePicker from "../components/DateRangePicker";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";

export default function Reports() {
  const [range, setRange] = useState({ range: "30d" });

  // TODO: replace with services/api.js -> getSummary(range)
  const summary = useMemo(() => {
    return {
      totalSpend: 123456.78,
      ordersPlaced: 420,
      onTimePct: 0.69,
      avgDelayDays: -0.2,
      topVendorsBySpend: [
        { id: "lester-llc", name: "Lester's Logistics Company", spend: 45213.23 },
        { id: "cluck-bell", name: "Cluck n Bells", spend: 32450.0 },
        { id: "ponsonboys", name: "Ponsonboys", spend: 28760.55 },
      ],
    };
  }, [range]);

  const columns = [
    { 
        key: "name", 
        label: "Vendor",
        render: (value, row) => <Link to={`/vendors/${row.id}`}>{value}</Link>
    },
    {
      key: "spend",
      label: "Spend",
      className: "num",
      render: (v) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    },
  ];

  return (
    <section className="page page--reports" style={{ "--stack-gap": "2rem" }}>
      <div className="container stack">
        <h1 className="page-title">Reports</h1>

        {/* Filters / Toolbar */}
        <div className="toolbar">
          <DateRangePicker value={range} onChange={setRange} />
          {/* TODO: add export/download once services are wired */}
        </div>

        {/* KPI grid + Table under it in the same grid */}
        <div className="grid kpi-grid">
          <StatCard
            label="Total Spend"
            value={`$${summary.totalSpend.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            subtext={range.range.toUpperCase()}
          />
          <StatCard label="Orders Placed" value={summary.ordersPlaced} />
          <StatCard label="On Time %" value={`${Math.round(summary.onTimePct * 100)}%`} />
          <StatCard label="Avg Delay (days)" value={summary.avgDelayDays.toFixed(1)} subtext="(negative = early)" />

          <div className="card span-all">
            <h2 className="card-title" >Top Vendors by Spend</h2>
            <DataTable
              
              columns={columns}
              rows={summary.topVendorsBySpend /* TODO: from services */}
              keyField="id"
            />
          </div>
        </div>

        {/* TODO: add more sections: on‑time ranking, most orders, etc. */}
      </div>
    </section>
  );
}
