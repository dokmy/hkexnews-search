"use client";
import React from "react";
import ResultCard from "./ChatResultCard";
import ChatMessages from "./ChatMessages";
import { useChat } from "ai/react";
import { Message } from "ai";
import { useEffect, useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useRouter } from "next/navigation";

interface ChatComponentReadyProps {
  data: {
    LONG_TEXT: string;
    SHORT_TEXT: string;
    STOCK_NAME: string;
    DATE_TIME: string;
    URL: string;
  };
  query: string;
  chatArgs: chatArgs;
  //   countryOption: string;
  //   isIframeShown: boolean;
  //   onToggleIframe: () => void;
}

interface chatArgs {
  initialInput?: string;
}

const ChatComponentReady: React.FC<ChatComponentReadyProps> = (props) => {
  const {
    data,
    query,
    chatArgs,
    // countryOption,
    // isIframeShown,
    // onToggleIframe,
  } = props;

  const router = useRouter();

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   if (endOfMessagesRef.current) {
  //     const scrollContainer = endOfMessagesRef.current.parentElement;
  //     if (scrollContainer) {
  //       // Set the scrollTop to the bottom of the container
  //       scrollContainer.scrollTop = scrollContainer.scrollHeight;
  //     }
  //   }
  //   // endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  //   console.log("CCR is here. Here is the real chatArgs: ", chatArgs);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      ...chatArgs,
      body: {
        filter: data.URL,
      },
    });

  useEffect(() => {
    const mockEvent = {
      preventDefault: () => {},
    } as unknown as React.FormEvent<HTMLFormElement>;
    handleSubmit(mockEvent);
  }, [query]);

  // useEffect(() => {
  //   setTimeout(scrollToBottom, 100);
  // }, [messages]);

  return (
    <div className="flex flex-col h-full border-2 border-slate-900">
      <div className="h-full overflow-y-auto w-full">
        <div className="w-full sticky top-0 bg-black">
          <ResultCard data={data} />
        </div>

        <div className="flex-1">
          <ChatMessages
            // key={data.id}
            messages={messages}
            endOfMessagesRef={endOfMessagesRef}
          />
        </div>

        <div className="w-full p-3 border-t bg-gray-900 sticky bottom-0">
          <form onSubmit={handleSubmit}>
            <div className="relative w-full">
              <input
                className="resize-none overflow-auto max-h-24 border rounded w-full p-3 pl-3 pr-20 text-gray-200 leading-tight bg-black border-gray-700 duration-200 h-20"
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
              ></input>

              <span className="absolute inset-y-0 right-5 flex items-center pr-3 pointer-events-none text-gray-400">
                {isLoading ? (
                  <MoonLoader
                    color="#36d7b7"
                    loading={isLoading}
                    size={20} // Adjust size as needed
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <div className="h-3 w-3">⮐</div>
                )}
              </span>
            </div>
          </form>
        </div>
        {/* <div ref={endOfMessagesRef} /> */}
      </div>
    </div>
  );
};

export default ChatComponentReady;
