const items = [
  { id: 1, name: "King Burger", sold: 100 },
  { id: 2, name: "Chicken Noodles", sold: 150 },
  { id: 3, name: "Hot & Sour Soup", sold: 80 },
];

function Avatar({ label }) {
  return (
    <div className="h-8 w-8 shrink-0 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-semibold">
      {label
        .split(" ")
        .map((w) => w[0])
        .join("")}
    </div>
  );
}

export function TopSellingItems() {
  return (
    <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-base font-semibold text-gray-900">
          Top Selling Items
        </p>
        <button className="text-xs font-medium text-orange-600 hover:underline">
          View All
        </button>
      </div>
      <p className="mb-4 text-xs text-gray-600">
        The top ordered menu this week
      </p>

      <div className="space-y-3.5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar label={item.name} />
              <span className="text-sm text-gray-800">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 tabular-nums">
              {item.sold}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSellingItems;
