const ORANGE_500 = "#f97316";
const ORANGE_400 = "#fb923c";
const ORANGE_300 = "#fdba74";
const ORANGE_TRACK = "#ffedd5";

function Donut({ percent, color = ORANGE_500, label }) {
  const angle = Math.max(0, Math.min(100, percent)) * 3.6;
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-24 w-24 rounded-full"
        style={{
          background: `conic-gradient(${color} ${angle}deg, ${ORANGE_TRACK} 0)`,
        }}
        aria-label={`${label} ${percent}%`}
      >
        <div className="absolute inset-3 rounded-full bg-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900 tabular-nums">
            {percent}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs text-gray-700">{label}</span>
    </div>
  );
}

export function OrderSummary() {
  return (
    <div className="h-full rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-base font-semibold text-gray-900">Order Summary</p>
        <select
          className="rounded-full border border-orange-200 bg-white px-3 py-1 text-sm text-gray-700 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
          defaultValue="today"
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last-month">Last Month</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <Donut percent={25} color={ORANGE_400} label="On Delivery" />
        <Donut percent={85} color={ORANGE_500} label="Delivered" />
        <Donut percent={7} color={ORANGE_300} label="Cancelled" />
      </div>
    </div>
  );
}
