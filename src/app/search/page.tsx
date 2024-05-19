"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { meilisearchClient } from "@/lib/meilisearch";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "@/components/ui/badge";

export type News = {
  STOCK_NAME: string;
  STOCK_CODE: string;
  LONG_TEXT: string;
  FILE_LINK: string;
  node_text: string;
  t1_name: string;
  t2g_name: string;
  t2_name: string;
};

function truncate(text: string, length: number) {
  if (text.length <= length) {
    return text;
  }

  return text.substr(0, length) + "\u2026";
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  //   const [searchResults, setSearchResults] = useState<Array<News> | any>();
  const [searchResults, setSearchResults] = useState<Array<News> | any>([]);

  const index = meilisearchClient.getIndex("hkexnews_test");

  async function search(query = "") {
    return await index
      .search(truncate(query, 50))
      .then((res) => {
        console.log("res:", res);
        return res.hits;
      })
      .catch((err) => {
        console.error("err:", err);
        return [];
      });
  }

  useEffect(() => {
    (async () => setSearchResults(await search()))();
  }, []);

  return (
    <div className="flex flex-col p-10">
      <div className="flex items-center justify-between mb-10">
        <Input
          placeholder="Search companies..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            search(event.target.value).then((results) => {
              setSearchResults(results);
            });
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex flex-col space-y-6">
        {searchResults.map((news: News) => (
          <div key={uuidv4()} className="border rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold">{news.STOCK_NAME}</span>
              <Badge>{news.STOCK_CODE}</Badge>
            </div>
            <div className="flex space-x-2 mb-4">
              <Badge color="blue">{news.t1_name}</Badge>
              <Badge color="green">{news.t2g_name}</Badge>
              <Badge color="purple">{news.t2_name}</Badge>
            </div>
            <div className="text-gray-600 mb-2">{news.LONG_TEXT}</div>
            <div className="text-gray-600 mb-4 break-words">
              {news.node_text}
            </div>
            <Button>
              <Link
                href={news.FILE_LINK}
                className="text-blue-500 hover:underline"
              >
                Download
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
