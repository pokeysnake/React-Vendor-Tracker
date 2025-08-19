export default function StatCard({ label, value, subtext}){
    return (
        <div className = "card stat-card">
            <div className = "stat-value">{value}</div>
            <div className = "stat-label">{label}</div>
            {subtext ? <div className = "stat-subtext">{subtext}</div> : null}
        </div>
    );
}