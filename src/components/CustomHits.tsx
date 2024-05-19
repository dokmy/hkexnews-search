// CustomHits.tsx

import React, { useState, useEffect } from "react";
import { useHits } from "react-instantsearch";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/search/lib/styles/index.css";
import Hit from "./Hit";
import { Button } from "./ui/button";
import SearchSidebar from "@/components/SearchSidebar";

interface SearchSidebarExampleProps {
  fileUrl: string;
}

const CustomHits: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { hits } = useHits();
  const [shownUrl, setShownUrl] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const searchPluginInstance = searchPlugin();
  const [resetMatchesKey, setResetMatchesKey] = useState(0);

  useEffect(() => {
    setResetMatchesKey((prevKey) => prevKey + 1);
  }, [shownUrl]);

  const resetMatches = () => {
    setResetMatchesKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-row space-x-4">
      <div className="space-y-1 w-2/3">
        {hits.map((hit: any) => (
          <Hit
            key={hit.objectID}
            hit={hit}
            setShownUrl={setShownUrl}
            searchTerm={searchTerm}
          />
        ))}
      </div>
      <div className="w-full h-screen">
        {/* {shownUrl && (
          <div className="h-20">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <div className="fixed top-20 right-0 w-1/2 h-full">
                <Viewer
                  fileUrl={shownUrl}
                  // plugins={[defaultLayoutPluginInstance, searchPluginInstance]}
                />
              </div>
            </Worker>
          </div>
        )} */}
        {shownUrl && (
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "50%",
            }}
            className="fixed top-20 right-0 w-1/2 h-full border-2 border-slate-900 bg-white"
          >
            <div
              style={{
                borderRight: "1px solid rgba(0, 0, 0, .2)",
                flex: "0 0 15rem",
                width: "15rem",
              }}
            >
              {/* <SearchSidebar searchPluginInstance={searchPluginInstance} /> */}
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
                  plugins={[searchPluginInstance, defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomHits;
