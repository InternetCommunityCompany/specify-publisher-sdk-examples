import { useState } from "react";

export const AddressInput = ({ onAddressSubmit }: { onAddressSubmit: (address: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddressSubmit(inputValue.trim());
    }
  };

  const isValidEthAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Paste wallet address here..."
            className="w-full h-12 px-4 py-2 text-white bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl focus:outline-none focus:border-[#D8FF57]/50 focus:ring-2 focus:ring-[#D8FF57]/20 transition-all duration-300 placeholder:text-white/50"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={!inputValue.trim() || !isValidEthAddress(inputValue)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-[#D8FF57] text-black rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E5FF70] active:scale-95"
          >
            Fetch Ad
          </button>
        </form>

        {/* Validation indicator */}
        {inputValue && (
          <div className="absolute -bottom-6 left-0 text-xs">
            {isValidEthAddress(inputValue) ? (
              <span className="text-green-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Valid Ethereum address
              </span>
            ) : (
              <span className="text-red-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Invalid address format
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 