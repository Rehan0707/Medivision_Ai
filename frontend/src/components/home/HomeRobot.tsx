"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { MapPin, Newspaper, ExternalLink, Loader2, ShieldAlert, ChevronDown, X } from "lucide-react";
import { apiUrl } from "@/lib/api";

const DoctorBot = dynamic(() => import("@/components/animations/DoctorBot"), { ssr: false });

type LocationState = "idle" | "asking" | "getting" | "denied" | "error" | "ready";
type NewsArticle = {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  source?: string;
  author?: string;
  publishedAt?: string;
};

const COUNTRY_TO_NEWS = new Map([
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["IN", "India"],
  ["CA", "Canada"],
  ["AU", "Australia"],
  ["DE", "Germany"],
  ["FR", "France"],
  ["JP", "Japan"],
  ["BR", "Brazil"],
  ["MX", "Mexico"],
]);

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    if (hrs < 24) return hrs <= 0 ? "Just now" : `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } catch {
    return "";
  }
}

export default function HomeRobot() {
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [dismissedPrompt, setDismissedPrompt] = useState(false);

  const reverseGeocode = useCallback(async (lat: number, lon: number): Promise<string | null> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: { "User-Agent": "MediVisionAI-HealthNews/1.0 (health-app)" },
        }
      );
      const data = await res.json();
      const code = data?.address?.country_code;
      return typeof code === "string" ? code.toUpperCase() : null;
    } catch {
      return null;
    }
  }, []);

  const fetchHealthNews = useCallback(async (country: string) => {
    try {
      const res = await fetch(apiUrl(`/api/health-news?country=${country.toLowerCase()}`));
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load news");
      setArticles(data.articles || []);
      setNewsError(null);
      return data.articles?.length > 0;
    } catch (err: any) {
      const msg =
        err.message?.includes("NEWS_API_KEY") || err.message?.includes("not configured")
          ? "Health news requires setup. Contact support."
          : err.message || "Unable to load health news";
      setNewsError(msg);
      setArticles([]);
      return false;
    }
  }, []);

  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError("Location is not supported by your browser.");
      setLocationState("error");
      return;
    }

    setLocationState("asking");
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLocationState("getting");
        const { latitude, longitude } = pos.coords;
        const code = await reverseGeocode(latitude, longitude);
        if (!code) {
          setLocationError("Could not determine your region.");
          setLocationState("error");
          return;
        }
        setCountryCode(code);
        setCountryName(COUNTRY_TO_NEWS.get(code) || code);
        const hasNews = await fetchHealthNews(code);
        setLocationState("ready");
        if (hasNews) setNewsExpanded(true);
      },
      (err) => {
        setLocationState(err.code === 1 ? "denied" : "error");
        setLocationError(
          err.code === 1
            ? "Location access was denied. Enable it to see health news for your area."
            : err.message || "Could not get your location."
        );
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 3600000 }
    );
  }, [reverseGeocode, fetchHealthNews]);

  useEffect(() => {
    if (locationState === "idle" && !dismissedPrompt) {
      const timer = setTimeout(() => setLocationState("asking"), 1500);
      return () => clearTimeout(timer);
    }
  }, [locationState, dismissedPrompt]);

  const showPrompt =
    locationState === "asking" || locationState === "denied" || locationState === "error";
  const isLoading = locationState === "getting";
  const hasNews = articles.length > 0;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Robot */}
      <div
        className="relative cursor-pointer"
        onClick={() => {
          if (locationState === "idle") requestLocation();
          else if (locationState === "denied" || locationState === "error") requestLocation();
        }}
      >
        <DoctorBot />
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-[#020617]/60 rounded-[3rem] z-20"
          >
            <Loader2 className="w-12 h-12 text-[#00D1FF] animate-spin" />
          </motion.div>
        )}
      </div>

      {/* Location permission prompt */}
      <AnimatePresence>
        {showPrompt && !dismissedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4"
          >
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-[#00D1FF]/30 shadow-xl shadow-[#00D1FF]/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-[#00D1FF]" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white mb-1">Enable location for health news</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    {locationState === "denied" || locationState === "error"
                      ? locationError
                      : "Allow access to show health news relevant to your area."}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={requestLocation}
                      className="px-4 py-2 rounded-xl bg-[#00D1FF] text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00D1FF]/90 transition-colors"
                    >
                      {locationState === "denied" || locationState === "error" ? "Try again" : "Allow"}
                    </button>
                    <button
                      onClick={() => {
                        setDismissedPrompt(true);
                        setLocationState("idle");
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                      Not now
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDismissedPrompt(true);
                    setLocationState("idle");
                  }}
                  className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-white/5"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Health news section */}
      {(hasNews || newsError) && locationState === "ready" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mt-12"
        >
          <button
            onClick={() => setNewsExpanded(!newsExpanded)}
            className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00D1FF]/30 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="text-[#00D1FF]" size={20} />
              <span className="text-sm font-bold text-white">
                Health news {countryName ? `in ${countryName}` : ""}
              </span>
            </div>
            <ChevronDown
              size={20}
              className={`text-slate-500 transition-transform ${newsExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {newsError && !hasNews && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <ShieldAlert className="text-amber-500 shrink-0" size={20} />
              <p className="text-sm text-amber-200/90">{newsError}</p>
            </div>
          )}

          <AnimatePresence>
            {newsExpanded && hasNews && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  {articles.slice(0, 5).map((art, i) => (
                    <motion.a
                      key={art.url || i}
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="block p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00D1FF]/30 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex gap-4">
                        {art.urlToImage && (
                          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5">
                            <img
                              src={art.urlToImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-bold text-white group-hover:text-[#00D1FF] transition-colors line-clamp-2">
                            {art.title}
                          </h5>
                          {art.description && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{art.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            {art.source && (
                              <span className="text-[10px] text-slate-600 uppercase tracking-wider">
                                {art.source}
                              </span>
                            )}
                            {art.publishedAt && (
                              <span className="text-[10px] text-slate-600">
                                · {formatDate(art.publishedAt)}
                              </span>
                            )}
                            <ExternalLink
                              size={12}
                              className="text-slate-500 group-hover:text-[#00D1FF] ml-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Hint when idle and dismissed */}
      {locationState === "idle" && dismissedPrompt && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={requestLocation}
          className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-[#00D1FF] transition-colors flex items-center gap-2"
        >
          <MapPin size={14} />
          Get health news for my area
        </motion.button>
      )}
    </div>
  );
}
