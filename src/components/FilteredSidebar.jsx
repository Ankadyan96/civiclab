"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const FilterSection = ({ title, options, selected, onChange }) => {
  const [expanded, setExpanded] = useState(true);
  const toggle = () => setExpanded(!expanded);

  const handleCheckboxChange = (option) => {
    onChange(title, option);
  };

  return (
    <div className="mb-6">
      <div
        onClick={toggle}
        className="flex items-center justify-between bg-[#E9EFF4] text-[#1F5F8D] font-semibold text-sm px-4 py-2 rounded-lg cursor-pointer border border-[#D5E1EA]"
      >
        <span>{title.toUpperCase()}</span>
        <ChevronDownIcon
          className={`w-4 h-4 text-[#194C71] transition-transform duration-200 ${
            expanded ? "" : "rotate-180"
          }`}
        />
      </div>

      {expanded && (
        <ul className="mt-3 space-y-2 px-3 max-h-56 overflow-y-auto pr-1 custom-scroll">
          {options.map((option, idx) => (
            <li key={`${title}-${option}-${idx}`}>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#1F5F8D] cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#B17F3D] w-4 h-4 border border-[#D5E1EA] rounded-sm"
                  checked={selected.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <span className="capitalize">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FilteredSidebar = ({ selectedFilters, setSelectedFilters }) => {
  const [filterOptions, setFilterOptions] = useState({
    sectors: [],
    timePeriods: [],
    dataTypes: [],
    tags: [],
    geographies: [],
  });

  const handleFilterChange = (category, option) => {
    const keyMap = {
      Sectors: "sectors",
      "Time Period": "timePeriods",
      "Data Type": "dataTypes",
      Tags: "tags",
      Geographies: "geographies",
    };
    const key = keyMap[category] || category.toLowerCase();

    setSelectedFilters((prev) => {
      const current = new Set(prev[key]);
      current.has(option) ? current.delete(option) : current.add(option);
      return { ...prev, [key]: Array.from(current) };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      sectors: [],
      timePeriods: [],
      dataTypes: [],
      tags: [],
      geographies: [],
    });
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(
          "https://api.datakeep.civicdays.in/api/search/dataset/"
        );
        const data = res.data;

        const sectors = Object.keys(data.aggregations?.sectors || {});
        const dataTypes = Object.keys(data.aggregations?.formats || {});

        const allYears = data.results
          .map((item) => {
            const dateMeta = item.metadata.find(
              (m) => m.metadata_item.label === "Date of Creation of Dataset"
            );
            return dateMeta ? new Date(dateMeta.value).getFullYear() : null;
          })
          .filter((year) => year !== null)
          .sort((a, b) => a - b);

        const timePeriods = [];
        if (allYears.length > 0) {
          const min = Math.floor(allYears[0] / 3) * 3;
          const max = Math.ceil(allYears[allYears.length - 1] / 3) * 3;
          for (let y = min; y <= max; y += 3) {
            timePeriods.push(`${y}-${y + 2}`);
          }
        }
        const tags = Object.keys(data.aggregations?.tags || {});
        const geographies = Object.keys(data.aggregations?.Geography || {});

        setFilterOptions({
          sectors,
          dataTypes,
          timePeriods,
          tags,
          geographies,
        });
      } catch (error) {
        console.error("Failed to fetch filter options", error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <aside className="w-full md:w-[260px] bg-white shadow-lg border border-gray-200 rounded-xl p-4 md:p-5 mb-6 md:mb-0 md:sticky md:top-20 max-h-[90vh] overflow-y-auto custom-scroll">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#1F5F8D]">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-[#B17F3D] hover:underline font-medium cursor-pointer"
        >
          Reset
        </button>
      </div>

      <FilterSection
        title="Sectors"
        options={filterOptions.sectors}
        selected={selectedFilters.sectors}
        onChange={handleFilterChange}
      />
      <FilterSection
        title="Time Period"
        options={filterOptions.timePeriods}
        selected={selectedFilters.timePeriods}
        onChange={handleFilterChange}
      />
      <FilterSection
        title="Data Type"
        options={filterOptions.dataTypes}
        selected={selectedFilters.dataTypes}
        onChange={handleFilterChange}
      />
      <FilterSection
        title="Tags"
        options={filterOptions.tags}
        selected={selectedFilters.tags}
        onChange={handleFilterChange}
      />
      <FilterSection
        title="Geographies"
        options={filterOptions.geographies}
        selected={selectedFilters.geographies}
        onChange={handleFilterChange}
      />
    </aside>
  );
};

export default FilteredSidebar;
