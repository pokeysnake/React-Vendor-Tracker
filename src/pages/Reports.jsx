import {useMemo, useState} from "react";
import DateRangePicker from "../components/DateRangePicker";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";



export default function Reports(){
    
    const [range, setRange] = useState({range: "30d"})

    //NEED TO USE SERVICES --> CONST SUMMARY = AWAIT GETSUMMARY(RANGE)

    //SAMPLE DATA FOR NOW:
    const summary = useMemo(() => {
        return {
            totalSpend: 123456.78,
            ordersPlaced: 420,
            onTimePct: 0.69,
            avgDelayDays: -0.2,
            topVendorsBySpend: [
                {id: "feet-1", name: "Cameron's Feet Pics", spend: 45213.23},
                {id: "wap-1", name: "Cam W.A.P. Pics", spend: 10000000.23},
                {id: "only-1", name: "Camerons Premium OnlyFans Subscription", spend: 100000000.00},
            ],
        };
    }, [range]);
    
    return (
        <section className = "page page--reports" style={{ "--stack-gap": "2rem" }}>
            <div className = "container stack">
            <h1 className = "page-title">Reports</h1>

            {/*Filters and Toolbar */}
            <div className = "toolbar">
                <DateRangePicker value = {range} onChange = {setRange} />
                {/*NEED TO ADD MORE FILTERS*/}
            </div>

            {/*KPI CARDS */}
            <div className = "grid kpi-grid">
                <StatCard
                    label = "Total Spend"
                    value = {`$${summary.totalSpend.toLocaleString(undefined, { maximumFractionDigits: 2})}`}
                    subtext = {range.range.toUpperCase()}
                />

                <StatCard
                    label = "Orders Placed"
                    value = {summary.ordersPlaced}
                />
                <StatCard
                    label = "On Time %"
                    value = {`${Math.round(summary.onTimePct * 100)}%`}
                />
                <StatCard
                    label="Avg Delay (days)"
                    value={summary.avgDelayDays.toFixed(1)}
                    subtext="(negative = early)"
                />

                {/* Tables */}
                <h2 className="section-title">Top Vendors by Spend</h2>
                <DataTable
                    columns={[
                    { key: "name",  label: "Vendor" },
                    { key: "spend", label: "Spend", className: "num",
                        render: (v) => `$${v.toLocaleString()}` },
                ]}
                rows={summary.topVendorsBySpend /* TODO: use from services */}
                keyField="id"
                />
            </div>




            {/*NEED TO ADD MORE SECTIONS : ON TIME RANKING, MOST ORDERS, ETC */}



            </div>
        </section>
    )
}