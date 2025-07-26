"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import FilteredSidebar from "@/components/FilteredSidebar";
import AllData from "@/components/AllData";

export default function Home() {
  const [filters, setFilters] = useState({
    sectors: [],
    timePeriods: [],
    dataTypes: [],
    tags: [],
    licenses: [],
    geographies: [],
  });

  return (
    <div className="font-poppins">
      <Header />
      <div className="flex flex-col md:flex-row bg-white min-h-screen font-poppins">
        <FilteredSidebar
          selectedFilters={filters}
          setSelectedFilters={setFilters}
        />
        <div className="flex-1 p-4 transition-all duration-300 overflow-auto h-full">
          <AllData filters={filters} />
        </div>
      </div>
    </div>
  );
}
