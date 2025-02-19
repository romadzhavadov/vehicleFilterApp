async function VehicleModels({ makeId, year }) {
  
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(
    `${baseUrl}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!response.ok) throw new Error("Не вдалося отримати моделі авто.");
  const data = await response.json();
  const models = data.Results;

  if (models.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        ⚠️ Моделі для цієї марки та року відсутні.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((model, index) => (
        <li
          key={`${model.Model_ID}-${index}`}
          className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <p className="font-medium text-lg">{model.Model_Name}</p>
        </li>
      ))}
    </ul>
  );
}
export default VehicleModels;