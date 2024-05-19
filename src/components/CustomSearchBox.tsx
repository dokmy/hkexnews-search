import React from "react";
import { useSearchBox } from "react-instantsearch";

const CustomSearchBox: React.FC<{ setSearchTerm: (term: string) => void }> = ({
  setSearchTerm,
}) => {
  const { query, refine } = useSearchBox();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Modified: Added handleInputChange function
    const newQuery = event.currentTarget.value;
    refine(newQuery);
    setSearchTerm(newQuery); // Modified: Set searchTerm when query changes
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        // onChange={(event) => refine(event.currentTarget.value)}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full px-4 py-2 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default CustomSearchBox;
