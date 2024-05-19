// PineconeResult.tsx
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type PineconeResultProps = {
  result: any;
  setShownUrl: (url: string) => void;
  setDataToCCR: (data: any) => void;
};

const HtmlTextRenderer: React.FC<{ htmlText: string }> = ({ htmlText }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlText }} />;
};

const getTextFromResult = (result: any) => {
  const metadata = result.metadata;
  const _node_content = JSON.parse(metadata._node_content);
  const text = _node_content.text;

  return text;
};

const PineconeResult: React.FC<PineconeResultProps> = ({
  result,
  setShownUrl,
  setDataToCCR,
}) => {
  return (
    <div className="flex flex-col border-2 border-gray-900 p-7">
      <div className="flex justify-between mb-4">
        <div>
          <Badge variant={"default"}>
            <HtmlTextRenderer htmlText={result.metadata.STOCK_NAME} />
          </Badge>
        </div>
        <div>
          <strong>
            <HtmlTextRenderer htmlText={result.metadata.STOCK_NAME} />
          </strong>
        </div>
        <div>
          <span className="text-sm">{result.metadata.DATE_TIME}</span>
        </div>
      </div>
      {/* <div className="flex space-x-2 mb-4">
        <Badge variant={"green"}>{result.metadata.FILE_TYPE}</Badge>
      </div> */}
      <div className="text-xl font-bold mb-2">
        <HtmlTextRenderer htmlText={result.metadata.LONG_TEXT} />
      </div>
      {/* <div className="text-sm mb-4">{getTextFromResult(result)}</div> */}
      <Button
        onClick={() => {
          setShownUrl(
            `/api/proxy-pdf?url=https://www1.hkexnews.hk${result.metadata.FILE_LINK}`
          );
          setDataToCCR(result.metadata);
        }}
      >
        View Original
      </Button>
    </div>
  );
};

export default PineconeResult;
