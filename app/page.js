"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/vehicles/GetMakesForVehicleType/car?format=json`
        );
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Помилка при завантаженні марок авто:", error);
      }
    };

    const generateYears = () => {
      const currentYear = new Date().getFullYear();
      const yearsArray = [];
      for (let year = 2015; year <= currentYear; year++) {
        yearsArray.push(year);
      }
      setYears(yearsArray);
    };

    fetchMakes();
    generateYears();
  }, [baseUrl]);

  const isButtonEnabled = selectedMake && selectedYear;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">🔎 Фільтр авто</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Марка авто</label>
            <select
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setSelectedMake(e.target.value)}
              value={selectedMake || ""}
            >
              <option value="">Оберіть марку</option>
              {makes.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Рік випуску</label>
            <select
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setSelectedYear(e.target.value)}
              value={selectedYear || ""}
            >
              <option value="">Оберіть рік</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href={isButtonEnabled ? `/result/${selectedMake}/${selectedYear}` : "#"}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
              isButtonEnabled
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Next ➡️
          </Link>
        </div>
      </div>
    </main>
  );
}
