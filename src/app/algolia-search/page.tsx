"use client";

import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  RefinementList,
} from "react-instantsearch";
import CustomHits from "@/components/CustomHits";
import CustomSearchBox from "@/components/CustomSearchBox";
import CustomRefinementList from "@/components/CustomRefinementList";
import CustomDateRangeSlider from "@/components/CustomDateRangeSlider";

const searchClient = algoliasearch(
  "9YPL3516KI",
  "907c5a97c4373c93f655d5bd17ae6622"
);

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Added state for searchTerm

  return (
    <div className="flex flex-col">
      <InstantSearch searchClient={searchClient} indexName="hkexnew_test">
        <div className="w-full py-3 px-12 border-b-2 fixed top-0 left-0 right-0 z-10 bg-white">
          <div className="flex flex-row space-x-5 justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold">HKEXNEWS</span>
            </div>
            <CustomSearchBox setSearchTerm={setSearchTerm} />{" "}
          </div>
        </div>
        <div className="flex flex-row mt-20 gap-x-1">
          <div className="flex flex-col p-4 w-1/6 border-2 border-gray-900 h-full fixed top-20 left-0 space-y-3">
            <div>
              <strong>Refine by Stock Name: </strong>
              <CustomRefinementList attribute="STOCK_NAME" />{" "}
            </div>
            <div>
              <strong>Refine by Categories: </strong>
              <CustomRefinementList attribute="t1_name" />
            </div>
            <strong>Refine by Sub-categories: </strong>
            <CustomRefinementList attribute="t2g_name" />
            <div>
              <strong>Refine by Tier-three Categories: </strong>
              <CustomRefinementList attribute="t2_name" />
            </div>
            {/* <div>
              <strong>Refine by Date: </strong>
              <CustomDateRangeSlider attribute="DATE_TIME" />
            </div> */}
          </div>
          <div className="w-5/6 ml-[16.86%]">
            <CustomHits searchTerm={searchTerm} />{" "}
            {/* Passed searchTerm as prop */}
          </div>
        </div>
        <Pagination />
      </InstantSearch>
    </div>
  );
};

export default Search;
