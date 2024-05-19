"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Play, Loader2 } from "lucide-react";
import PineconeResult from "@/components/PineconeResult";
import ChatComponentReady from "@/components/ChatComponentReady";
import SearchSidebar from "@/components/SearchSidebar";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface dataToCCR {
  LONG_TEXT: string;
  SHORT_TEXT: string;
  STOCK_NAME: string;
  DATE_TIME: string;
  URL: string;
}

const AISearch: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [shownUrl, setShownUrl] = useState("");
  const [dataToCCR, setDataToCCR] = useState({} as dataToCCR);
  const [resetMatchesKey, setResetMatchesKey] = useState(0);

  useEffect(() => {
    setResetMatchesKey((prevKey) => prevKey + 1);
  }, [shownUrl]);

  const resetMatches = () => {
    setResetMatchesKey((prevKey) => prevKey + 1);
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const searchPluginInstance = searchPlugin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitted search query:", searchQuery);

    try {
      const response = await fetch("/api/vector-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        const results = await response.json();
        // console.log("Search results:", results);
        setSearchResults(results.matches);
        console.log("Search results:", results.matches);
      } else {
        console.error("Error during vector search:", response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error("Error during vector search:", error);
      // Handle the error case
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="w-full py-3 px-12 border-b-2 z-10 bg-white fixed top-0">
        <div className="flex flex-row space-x-5 justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold">HKEXNEWS</span>
          </div>
          <form className="w-full relative" onSubmit={handleSubmit}>
            <Input
              placeholder="Search in natural language..."
              disabled={isLoading}
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Play />}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-20 px-2 flex flex-row space-x-5">
        <div className="flex flex-col space-y-3 w-1/4">
          {searchResults.map((result, index) => (
            <PineconeResult
              key={index}
              result={result}
              setShownUrl={setShownUrl}
              setDataToCCR={setDataToCCR}
            />
          ))}
        </div>
        <div className="w-1/2">
          {shownUrl && (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
              }}
              className="border-2 border-slate-900"
            >
              <div
                style={{
                  borderRight: "1px solid rgba(0, 0, 0, .2)",
                  flex: "0 0 10rem",
                  width: "10rem",
                }}
              >
                <SearchSidebar
                  key={resetMatchesKey}
                  searchPluginInstance={searchPluginInstance}
                  resetMatches={resetMatches}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={shownUrl}
                    plugins={[
                      searchPluginInstance,
                      defaultLayoutPluginInstance,
                    ]}
                  />
                </Worker>
              </div>
            </div>
          )}
        </div>
        <div className="w-1/4">
          {searchResults.length > 0 && (
            <ChatComponentReady data={dataToCCR} query={searchQuery} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AISearch;
