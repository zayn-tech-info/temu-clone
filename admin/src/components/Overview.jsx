const COLORS = ["#ea580c", "#f59e0b", "#fdba74"]; // orange-600, amber-500-ish, orange-300

function LegendItem({ color, label, value }) {
  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span>{label}</span>
      </div>
      <span className="font-medium text-gray-900">{value}%</span>
    </div>
  );
}

export function Overview() {
  const segments = [
    { label: "Morning", value: 28, color: COLORS[0] },
    { label: "Afternoon", value: 35, color: COLORS[1] },
    { label: "Evening", value: 37, color: COLORS[2] },
  ];


  let current = 0;
  const conic = segments
    .map((s) => {
      const start = (current / 100) * 360;
      current += s.value;
      const end = (current / 100) * 360;
      return `${s.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-base font-semibold text-gray-900">Overview</p>
        <button className="text-xs font-medium text-orange-600 hover:underline">
          View All
        </button>
      </div>
      <p className="mb-4 text-xs text-gray-600">
        The top ordered menu this week
      </p>

      <div className="flex items-center gap-5">
        <div
          className="relative h-24 w-24 shrink-0 rounded-full"
          style={{ background: `conic-gradient(${conic})` }}
        >
          <div className="absolute inset-3 rounded-full bg-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-900">52%</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {segments.map((s) => (
            <LegendItem
              key={s.label}
              color={s.color}
              label={s.label}
              value={s.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
