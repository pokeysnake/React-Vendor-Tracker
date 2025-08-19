export default function DateRangePicker( {value, onChange}) {
    const {range = "30d"} = value || {};

    return (
        <div className = "date-range">
            <label className = "form-label" htmlFor="range">Date Range</label>
            <select
                id = "range"
                className = "form-input"
                value = {range}
                onChange={(e) => onChange({range : e.target.value})}
            >
                <option value = "30d">Last 30 days</option>
                <option value = "90d">Last 90 days</option>
                <option value = "ytd">Year to date</option>
                <option value = "custom">Custom (implement later)</option>
            </select>
        </div>
    );
}