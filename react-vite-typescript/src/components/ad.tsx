import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Specify, { SpecifyAd, AuthenticationError, ValidationError, NotFoundError } from "@specify-sh/sdk";
import { Loader2, Check } from "lucide-react";
import { AddressInput } from "./address-input";

export const Ad = () => {
  const { address: walletAddress, isConnected } = useAccount();
  const [customAddress, setCustomAddress] = useState<string>("");
  const [content, setContent] = useState<SpecifyAd | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Use custom address if provided, otherwise use wallet address
  const targetAddress = customAddress || walletAddress;

  useEffect(() => {
    const fetchContent = async () => {
      if (!targetAddress) return;

      setLoading(true);
      setError(null);
      setContent(null);

      try {
        const specify = new Specify({
          publisherKey: import.meta.env.VITE_SPECIFY_PUBLISHER_KEY
        });
        const content = await specify.serve(targetAddress as `0x${string}`);
        setContent(content);
      } catch (err) {
        if (err instanceof AuthenticationError) {
          setError("Authentication failed. Please check your publisher key.");
        } else if (err instanceof ValidationError) {
          const details = err.details?.map(d => `${d.field}: ${d.message}`).join(', ');
          setError(`Invalid request: ${err.message}${details ? ` (${details})` : ''}`);
        } else if (err instanceof NotFoundError) {
          setError("No ad found for this address.");
        } else {
          console.log({err});
          setError(err instanceof Error ? err.message : 'An error occurred while fetching content');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [targetAddress]);

  const handleAddressSubmit = (address: string) => {
    setCustomAddress(address);
  };

  if (!isConnected && !customAddress) {
    return (
      <div className="flex items-center justify-center">
        <div className="floating-card glass-card text-center p-12 gradient-bg relative overflow-hidden max-w-md">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-3">Connect Your Wallet!</h3>
            <p className="text-white/70 leading-relaxed mb-6">Unlock personalized Web3 advertising experiences tailored just for you</p>
            
            <div className="flex items-center mb-6">
              <hr className="flex-1 border-white/20" />
              <span className="px-4 text-white/40 text-sm">OR</span>
              <hr className="flex-1 border-white/20" />
            </div>
            
            {/* Address Input for non-connected users */}
            <AddressInput onAddressSubmit={handleAddressSubmit} />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-[#D8FF57] rounded-full opacity-60 animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#D8FF57] rounded-full opacity-40 animate-ping animation-delay-1000"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="floating-card glass-card text-center p-12 gradient-bg relative overflow-hidden max-w-md">
          <div className="relative z-10">
            <div className="text-[#D8FF57] mb-6 relative">
              <div className="w-16 h-16 mx-auto relative">
                <Loader2 className="w-16 h-16 animate-spin" />
                <div className="pulse-ring border-2 border-[#D8FF57]"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Fetching Your Ad...</h3>
            <p className="text-white/60 text-sm">Address: {targetAddress?.slice(0, 6)}...{targetAddress?.slice(-4)}</p>
          </div>
          
          {/* Loading particles */}
          <div className="absolute top-6 right-6 w-1 h-1 bg-[#D8FF57] rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-12 left-8 w-1.5 h-1.5 bg-[#D8FF57] rounded-full opacity-40 animate-ping animation-delay-500"></div>
          <div className="absolute bottom-8 right-8 w-1 h-1 bg-[#D8FF57] rounded-full opacity-50 animate-ping animation-delay-1000"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="floating-card glass-card text-center p-12 relative overflow-hidden max-w-md border border-red-500/20">
          <div className="relative z-10">
            <div className="text-red-400 mb-6 relative">
              <div className="w-16 h-16 mx-auto relative">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Oops! Something went wrong</h3>
            <p className="text-white/60 text-sm mb-4">{error}</p>
            
            {/* Address Input for retry */}
            <AddressInput onAddressSubmit={handleAddressSubmit} />
          </div>
          
          {/* Error indicators */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-red-400 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="floating-card glass-card relative overflow-hidden gradient-bg">
          <div className="p-8 md:p-12 space-y-8">
            {/* Address Display and Input */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Specify API Response</h2>
                <p className="text-white/60 mb-4">Raw JSON data from the Specify Publisher SDK</p>
                
                {/* Current address display */}
                <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-[#D8FF57]/20">
                  <span className="text-white/60 text-sm">Address:</span>
                  <span className="text-[#D8FF57] font-mono text-sm">
                    {targetAddress?.slice(0, 6)}...{targetAddress?.slice(-4)}
                  </span>
                  {customAddress && (
                    <button
                      onClick={() => setCustomAddress("")}
                      className="text-white/40 hover:text-white/60 text-xs transition-colors"
                    >
                      (use wallet)
                    </button>
                  )}
                </div>
              </div>
              
              {/* Address Input for changing address */}
              <div className="flex justify-center">
                <AddressInput onAddressSubmit={handleAddressSubmit} />
              </div>
            </div>
            
            {/* No Content Message */}
            <div className="space-y-6">
              <div className="relative">
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 text-center border border-[#D8FF57]/20 neon-border">
                  <div className="text-[#D8FF57] mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No Content Available</h3>
                  <p className="text-white/60 leading-relaxed">
                    No personalized ad content found for address <span className="text-[#D8FF57] font-mono">{targetAddress?.slice(0, 6)}...{targetAddress?.slice(-4)}</span>
                  </p>
                  <p className="text-white/40 text-sm mt-2">Try a different address or check back later</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-8 right-8 w-2 h-2 bg-[#D8FF57] rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-[#D8FF57] rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-[#D8FF57] rounded-full opacity-25 animate-pulse animation-delay-1000"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="floating-card glass-card relative overflow-hidden gradient-bg">
        <div className="p-8 md:p-12 space-y-8">
          {/* Address Display and Input */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Specify API Response</h2>
              <p className="text-white/60 mb-4">Raw JSON data from the Specify Publisher SDK</p>
              
              {/* Current address display */}
              <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-[#D8FF57]/20">
                <span className="text-white/60 text-sm">Address:</span>
                <span className="text-[#D8FF57] font-mono text-sm">
                  {targetAddress?.slice(0, 6)}...{targetAddress?.slice(-4)}
                </span>
                {customAddress && (
                  <button
                    onClick={() => setCustomAddress("")}
                    className="text-white/40 hover:text-white/60 text-xs transition-colors"
                  >
                    (use wallet)
                  </button>
                )}
              </div>
            </div>
            
            {/* Address Input for changing address */}
            <div className="flex justify-center">
              <AddressInput onAddressSubmit={handleAddressSubmit} />
            </div>
          </div>
          
          {/* JSON Display */}
          <div className="space-y-6">
            <div className="relative">
              <pre className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 overflow-x-auto text-sm text-[#D8FF57] border border-[#D8FF57]/20 neon-border">
                <code>{JSON.stringify(content, null, 2)}</code>
              </pre>
              
              {/* Copy button */}
              <button 
                onClick={async () => {
                  await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-xs transition-all duration-300 flex items-center space-x-1 ${
                  copied 
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400' 
                    : 'bg-[#D8FF57]/10 border border-[#D8FF57]/30 text-[#D8FF57] hover:bg-[#D8FF57]/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <span>Copy JSON</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-8 right-8 w-2 h-2 bg-[#D8FF57] rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-[#D8FF57] rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-[#D8FF57] rounded-full opacity-25 animate-pulse animation-delay-1000"></div>
      </div>
    </div>
  );
}; 