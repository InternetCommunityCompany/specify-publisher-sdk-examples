import { TopBar } from "./components/top-bar";
import { Ad } from "./components/ad";

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(216,255,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(216,255,89,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <div className="relative z-10">
        <TopBar />
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                <span className="text-gradient">Specify</span>
                <br />
                <span className="text-white/90">Publisher SDK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                Hyper specific web3 advertising
              </p>
              
              {/* Floating particles */}
              <div className="absolute top-20 left-10 w-2 h-2 bg-[#D8FF57] rounded-full opacity-60 animate-ping"></div>
              <div className="absolute top-40 right-20 w-1 h-1 bg-[#D8FF57] rounded-full opacity-40 animate-ping animation-delay-1000"></div>
              <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#D8FF57] rounded-full opacity-50 animate-ping animation-delay-2000"></div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="container mx-auto px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <Ad />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
