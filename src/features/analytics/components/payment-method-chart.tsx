"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#b46a2d", "#135d66", "#8fbc8f", "#f2c572"];

export function PaymentMethodChart({
  data,
}: {
  data: { method: string; total: number }[];
}) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="total" nameKey="method" innerRadius={70} outerRadius={110}>
            {data.map((entry, index) => (
              <Cell key={entry.method} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
