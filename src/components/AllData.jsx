"use client";
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiDownloadCloud,
} from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { BsViewList } from "react-icons/bs";
import { TbArrowsDownUp } from "react-icons/tb";
import axios from "axios";
import Image from "next/image";
import { Loading } from "@geist-ui/react";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const API_BASE = "https://api.datakeep.civicdays.in";
// const PAGE_SIZE = 12;

const AllData = ({ filters }) => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const fetchFilteredData = async (search = "", pageNum = 1) => {
    setLoading(true);
    const params = {
      size: pageSize,
      page: pageNum,
    };
    if (search) params.query = search;
    if (filters.sectors.length) params.sectors = filters.sectors.join(",");
    if (filters.dataTypes.length) params.formats = filters.dataTypes.join(",");

    try {
      const res = await axios.get(`${API_BASE}/api/search/dataset/`, {
        params,
      });

      let data = res.data.results;

      if (filters.timePeriods.length) {
        data = data.filter((item) => {
          const dateMeta = item.metadata.find(
            (m) => m.metadata_item.label === "Date of Creation of Dataset"
          );
          if (!dateMeta) return false;
          const year = new Date(dateMeta.value).getFullYear();
          return filters.timePeriods.some((range) => {
            const [start, end] = range.split("-").map(Number);
            return year >= start && year <= end;
          });
        });
      }

      setDatasets(data);
      setTotalResults(res.data.total || 0);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchFilteredData(searchTerm, 1);
  }, [filters, pageSize]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchFilteredData(searchTerm, 1);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchFilteredData(searchTerm, newPage);
    }
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  if (loading) {
    return (
      <div className="text-center p-10">
        <Loading size="large" />
      </div>
    );
  }

  return (
    <div>
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4">
        <div className="relative w-full max-w-md">
          <FiSearch
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 h-10 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Start typing to search for any Dataset"
          />
        </div>
        <div className="flex gap-4 text-gray-700">
          <HiOutlineViewGrid
            size={24}
            className={`cursor-pointer ${
              view === "grid" ? "text-[#B17F3D]" : ""
            }`}
            onClick={() => setView("grid")}
          />
          <BsViewList
            size={24}
            className={`cursor-pointer ${
              view === "list" ? "text-[#B17F3D]" : ""
            }`}
            onClick={() => setView("list")}
          />
          <TbArrowsDownUp size={24} className="cursor-pointer" />
        </div>
      </div>

      {/* Dataset Cards */}
      <div className="p-6">
        {datasets.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No datasets found matching your filters.
          </p>
        ) : (
          <>
            <div
              className={`gap-6 ${
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col"
              }`}
            >
              {datasets.map((item) => {
                const geographyMeta = item.metadata.find(
                  (meta) => meta.metadata_item.label === "Geography"
                );

                return (
                  <div
                    key={item.id}
                    className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${
                      view === "list"
                        ? "flex flex-row gap-6 items-start"
                        : "flex flex-col h-full"
                    }`}
                  >
                    <div className="flex flex-col justify-between flex-1">
                      <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h2>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="text-[#B17F3D]" />
                          {new Date(item.created).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiDownloadCloud className="text-[#B17F3D]" />
                          {item.download_count}
                        </div>
                        {geographyMeta && (
                          <div className="flex items-center gap-1 max-w-[66px] truncate">
                            <FiMapPin className="text-[#B17F3D] shrink-0" />
                            <span className="truncate">
                              {geographyMeta.value}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-gray-700 line-clamp-4 mb-4 flex-1">
                        {item.description}
                      </p>

                      <div className="flex justify-between items-center pt-4 border-t text-sm text-gray-500 mt-auto">
                        <span>published by</span>
                        {item.organization?.logo ? (
                          <Image
                            src={`${API_BASE}${item.organization.logo}`}
                            alt="org logo"
                            width={view === "list" ? 32 : 24}
                            height={view === "list" ? 32 : 24}
                            className="object-contain rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mt-10 px-4 py-6 bg-white rounded-lg shadow-sm">
                {/* Rows per page */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    Rows per page
                  </span>
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    {[5, 10, 12, 20, 50].map((n) => (
                      <option key={n} value={n}>
                        {n.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Page info and controls */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-700">
                  <span className="text-center sm:text-left">
                    Page {String(page).padStart(2, "0")} of{" "}
                    {String(totalPages).padStart(2, "0")}
                  </span>

                  <div className="flex items-center justify-center gap-2 text-[#1F5F8D]">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={page === 1}
                      className="disabled:opacity-30 p-1"
                      aria-label="First Page"
                    >
                      <MdKeyboardDoubleArrowLeft size={22} />
                    </button>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="disabled:opacity-30 p-1"
                      aria-label="Previous Page"
                    >
                      <GrFormPrevious size={22} />
                    </button>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="disabled:opacity-30 p-1"
                      aria-label="Next Page"
                    >
                      <GrFormNext size={22} />
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={page === totalPages}
                      className="disabled:opacity-30 p-1"
                      aria-label="Last Page"
                    >
                      <MdKeyboardDoubleArrowRight size={22} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllData;
