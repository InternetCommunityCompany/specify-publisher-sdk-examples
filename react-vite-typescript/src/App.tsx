import { TopBar } from "./components/top-bar";
import { Ad } from "./components/ad";

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <Ad />
      </div>
    </div>
  );
}

export default App;
