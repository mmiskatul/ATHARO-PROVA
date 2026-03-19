"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function DonationChart({
  data,
}: {
  data: { name: string; amount: number }[];
}) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ded3c3" />
          <XAxis dataKey="name" stroke="#556371" />
          <YAxis stroke="#556371" />
          <Tooltip />
          <Line dataKey="amount" stroke="#b46a2d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
