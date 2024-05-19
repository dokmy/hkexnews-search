// Hit.tsx

import React from "react";
import { Highlight, Snippet } from "react-instantsearch";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type HitProps = {
  hit: any;
  setShownUrl: (url: string) => void;
  searchTerm: string;
};

type HtmlTextRendererProps = {
  htmlText: string;
};

const HtmlTextRenderer: React.FC<HtmlTextRendererProps> = ({ htmlText }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlText }} />;
};

const Hit: React.FC<HitProps> = ({ hit, setShownUrl, searchTerm }) => (
  <div className="flex flex-col border-2 border-gray-900 p-7">
    <div className="flex justify-between mb-4">
      <div>
        <Badge variant={"default"}>
          <HtmlTextRenderer htmlText={hit.STOCK_CODE} />
        </Badge>
      </div>
      <div>
        <strong>
          <HtmlTextRenderer htmlText={hit.STOCK_NAME} />
        </strong>
      </div>
      <div>
        <Highlight attribute="DATE_TIME" hit={hit} className="text-sm" />
      </div>
    </div>
    <div className="flex space-x-2 mb-4">
      <Badge variant={"green"}>{hit.t1_name}</Badge>
      <Badge variant={"blue"}>{hit.t2g_name}</Badge>
      <Badge variant={"cyan"}>{hit.t2_name}</Badge>
    </div>
    <div className="text-xl font-bold mb-2">
      <HtmlTextRenderer htmlText={hit.LONG_TEXT} />
    </div>
    <div className="text-sm mb-4">
      <Snippet attribute="node_text" hit={hit} />
    </div>
    <Button
      onClick={() =>
        setShownUrl(
          `/api/proxy-pdf?url=https://www1.hkexnews.hk/${hit.FILE_LINK}`
        )
      }
    >
      View Original
    </Button>
  </div>
);

export default Hit;
