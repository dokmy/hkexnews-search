import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

interface ResultCardProps {
  data: {
    LONG_TEXT: string;
    SHORT_TEXT: string;
    STOCK_NAME: string;
    DATE_TIME: string;
    URL: string;
  };
}

type HtmlTextRendererProps = {
  htmlText: string;
};

const HtmlTextRenderer: React.FC<HtmlTextRendererProps> = ({ htmlText }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlText }} />;
};

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="text-white">
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="justify-center">
            <div className="px-2">
              <HtmlTextRenderer htmlText={data.LONG_TEXT} />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="text-center">
              <li>
                <p>Date and Time: {data.DATE_TIME}</p>
              </li>
              <li>
                <p>STOCK NAME: {data.STOCK_NAME}</p>
              </li>
              {/* <li>
                <p>URL: {data.URL}</p>
              </li> */}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResultCard;
