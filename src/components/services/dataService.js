export async function fetchData() {
  try {
    const response = await fetch("/data/learning_stats.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    
    const json = await response.json();
    const json2 = json.slice(0, 1000000)
    console.log("✅ Sample data loaded:", json.slice(0, 50000)); // Log first 2 entries
    return json2;
  } catch (err) {
    console.error("❌ Error in fetchData:", err);
    return [];
  }
}