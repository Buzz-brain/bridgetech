import React from "react";

const stats = [
  { label: "Total Schools", value: 24, icon: "🏫", color: "bg-primary-100 text-primary-600" },
  { label: "Total Students", value: 5400, icon: "🎓", color: "bg-accent-100 text-accent-600" },
  { label: "SMS Sent", value: 12800, icon: "📩", color: "bg-success-100 text-success-600" },
  { label: "Active Users", value: 320, icon: "🟢", color: "bg-warning-100 text-warning-600" },
];

const SystemAnalytics = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">System Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center gap-4">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Placeholder for charts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-gray-500">[Charts and detailed analytics coming soon]</p>
      </div>
    </div>
  );
};

export default SystemAnalytics;
