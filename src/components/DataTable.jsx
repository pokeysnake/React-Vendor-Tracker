export default function DataTable({ columns, rows, keyField = "id" }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.className || ""}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="empty">No data</td></tr>
          ) : (
            rows.map((r) => (
              <tr key={r[keyField]}>
                {columns.map((c) => (
                  <td key={c.key} className={c.className || ""}>
                    {typeof c.render === "function" ? c.render(r[c.key], r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
