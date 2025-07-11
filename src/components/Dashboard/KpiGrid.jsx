import React from "react";

const KpiGrid = ({ kpiData }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {kpiData.map((kpi, i) => (
      <div key={i} className="bg-white rounded-2xl shadow p-7 flex items-center gap-4">
        {kpi.icon}
        <div className="flex flex-col items-start">
          <span className="text-5xl font-extrabold text-blue-800 leading-none">{kpi.value}</span>
          <span className="font-bold text-lg text-gray-800">{kpi.label} <span className="font-normal text-gray-500">{kpi.sub}</span></span>
        </div>
      </div>
    ))}
  </div>
);

export default KpiGrid; 