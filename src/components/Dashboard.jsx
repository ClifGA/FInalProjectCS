import React, { useEffect, useState } from "react";
import AccuracyChart from "./Charts/AccuracyChart";
import LanguagePieChart from "./Charts/LanguagePieChart";
import FilterPanel from "./FilterPanel";
import { fetchData } from "./services/dataService";
import POSAccuracyScatter from "./Charts/POSAccuracyScatter";
import POSFrequencyBarChart from "./Charts/POSFrequencyBarChart";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedLang, setSelectedLang] = useState("All");
  const [selectedUI, setSelectedUI] = useState("All");

  useEffect(() => {
    fetchData().then(data => {
      const sorted = [...data].sort((a, b) => b.timestamp - a.timestamp);
      setData(sorted.slice(0, 1000000)); // sample for performance
    });
  }, []);

  useEffect(() => {
    let filtered = data;
    if (selectedLang !== "All") {
      filtered = filtered.filter(d => d.learning_language === selectedLang);
    }
    if (selectedUI !== "All") {
      filtered = filtered.filter(d => d.ui_language === selectedUI);
    }
    setFilteredData(filtered);
  }, [data, selectedLang, selectedUI]);

  const languages = [...new Set(data.map(d => d.learning_language))];
  const uiLanguages = [...new Set(data.map(d => d.ui_language))];

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <FilterPanel
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        languages={languages}
        selectedUI={selectedUI}
        setSelectedUI={setSelectedUI}
        uiLanguages={uiLanguages}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-300 rounded-lg p-4 bg-white h-[500px]">
          <AccuracyChart data={filteredData} />
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white h-[500px]">
          <LanguagePieChart data={filteredData} />
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white h-[500px]">
          <POSAccuracyScatter data={filteredData} />
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white h-[500px]">
          <POSFrequencyBarChart data={filteredData} />
        </div>
      </div>
    </div>
  );
}
