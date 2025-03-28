import { ConnectKitButton } from "connectkit";

export const TopBar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Specify Publisher SDK Demo</h1>
        <ConnectKitButton />
      </div>
    </div>
  );
}; 