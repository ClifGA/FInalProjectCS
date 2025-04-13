import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Learning Stats Dashboard</h1>
        <Dashboard />
      </div>
    </div>
  );
}
