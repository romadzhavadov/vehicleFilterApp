import React from "react";
import Loading from "@/app/loading";
import VehicleModels from "@/app/VehicleModels";
import { Suspense } from "react";

// Генерація статичних шляхів
export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const makesResponse = await fetch(
    `${baseUrl}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  const makesData = await makesResponse.json();
  const makes = makesData.Results;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  const paths = [];

  makes.forEach((make) => {
    years.forEach((year) => {
      paths.push({ makeId: make.MakeId.toString(), year: year.toString() });
    });
  });

  return paths;
}

async function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🚗 Моделі авто {year} року
        </h1>

        <Suspense fallback={<Loading />}>
          <VehicleModels makeId={makeId} year={year} />
        </Suspense>
      </div>
    </main>
  );
}

export default ResultPage;

