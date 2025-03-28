import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Specify, { AdResponse, AuthenticationError, ValidationError } from "specify-publisher-sdk-test";
import { Loader2 } from "lucide-react";

export const Ad = () => {
  const { address, isConnected } = useAccount();
  const [content, setContent] = useState<AdResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!isConnected || !address) return;

      setLoading(true);
      setError(null);
      setContent(null);

      try {
        const specify = new Specify({
          publisherKey: import.meta.env.VITE_SPECIFY_PUBLISHER_KEY
        });
        const content = await specify.serve(address);
        setContent(content);
      } catch (err) {
        if (err instanceof AuthenticationError) {
          setError("Authentication failed. Please check your publisher key.");
        } else if (err instanceof ValidationError) {
          setError("Invalid wallet address format.");
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred while fetching content');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-gray-400">Please connect your wallet to view personalized ad content</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl">
          <div className="text-blue-500 mb-4">
            <Loader2 className="w-12 h-12 mx-auto animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Loading Content</h3>
          <p className="text-gray-400">Please wait while we fetch your personalized ad content</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/20 shadow-xl">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="space-y-6 p-8">
          {/* Image Section */}
          {content.imageUrl && (
            <div className="aspect-video bg-gray-700 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={`https://assets.specify.sh/campaign-images/${content.imageUrl}`}
                alt={content.headline}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">{content.headline}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{content.content}</p>
            
            {/* Campaign Info */}
            <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700/50 pt-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Campaign ID: {content.campaignId}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ad ID: {content.adId}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          {content.ctaLabel && content.ctaUrl && (
            <div className="pt-4">
              <a
                href={content.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                {content.ctaLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 