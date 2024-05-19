"use client";

import React from "react";
import { useRefinementList, RefinementListProps } from "react-instantsearch";

type CustomRefinementListProps = RefinementListProps & {
  attribute: string;
};

function CustomRefinementList(props: CustomRefinementListProps) {
  const {
    items,
    hasExhaustiveItems,
    createURL,
    refine,
    sendEvent,
    isFromSearch,
    canRefine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  return (
    <div className="custom-refinement-list">
      <ul className="list-none p-0">
        {items.map((item) => (
          <li key={item.label} className="mb-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="mr-2"
              />
              <span className="text-sm">{item.label}</span>
              <span className="ml-2 text-xs text-gray-600">({item.count})</span>
            </label>
          </li>
        ))}
      </ul>
      {canToggleShowMore && (
        <button
          className="mt-2 p-2 border rounded bg-blue-500 text-white"
          onClick={toggleShowMore}
          disabled={!canToggleShowMore}
        >
          {isShowingMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default CustomRefinementList;
