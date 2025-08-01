import { ConnectKitButton } from "connectkit";
import faviconUrl from "../assets/favicon.ico";

export const TopBar = () => {
  return (
    <div className="relative">
      <nav className="glass-card mx-6 mt-6 p-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={faviconUrl}
                alt="Specify Logo"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
              <div className="absolute inset-0 rounded-xl bg-[#D8FF57] opacity-30 blur-lg"></div>
            </div>
          </div>
          <ConnectKitButton />
        </div>
      </nav>
    </div>
  );
}; 