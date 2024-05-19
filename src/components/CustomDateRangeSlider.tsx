import React, { useState, useEffect } from "react";
import { useRange } from "react-instantsearch";
import Slider from "react-slider";

type CustomDateRangeSliderProps = {
  attribute: string;
};

// Converts date string or timestamp to UNIX timestamp
const ensureTimestamp = (date: string | number): number => {
  if (typeof date === "number") {
    return date; // Already a timestamp
  }
  // Assume date is in the format "dd/mm/yyyy hh:mm"
  return new Date(
    date.split(" ")[0].split("/").reverse().join("-") + "T" + date.split(" ")[1]
  ).getTime();
};

// Converts UNIX timestamp to formatted date string
const timestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${("0" + date.getDate()).slice(-2)}/${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}/${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
};

const CustomDateRangeSlider: React.FC<CustomDateRangeSliderProps> = ({
  attribute,
}) => {
  const { start, range, canRefine, refine } = useRange({ attribute });

  const defaultMin = ensureTimestamp("01/01/2022 00:00"); // Provide a fallback min date as a timestamp
  const defaultMax = Date.now(); // Current time as max fallback

  const [value, setValue] = useState<[number, number]>([
    ensureTimestamp(start[0]) ?? defaultMin,
    ensureTimestamp(start[1]) ?? defaultMax,
  ]);

  useEffect(() => {
    setValue([
      Math.max(
        ensureTimestamp(range.min) ?? defaultMin,
        ensureTimestamp(start[0]) ?? defaultMin
      ),
      Math.min(
        ensureTimestamp(range.max) ?? defaultMax,
        ensureTimestamp(start[1]) ?? defaultMax
      ),
    ]);
    console.log("Component Updated:", { start, range, value, canRefine });
  }, [start, range.min, range.max, canRefine]);

  const handleChange = (newValues: [number, number]) => {
    setValue(newValues);
    console.log(
      "Values Changed:",
      newValues.map((v) => timestampToDate(v))
    );
  };

  const handleChangeEnd = (newValues: [number, number]) => {
    refine(newValues.map(timestampToDate));
    console.log(
      "Refinement Sent:",
      newValues.map((v) => timestampToDate(v))
    );
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="custom-date-range-slider">
      <Slider
        className="w-full my-4"
        thumbClassName="w-4 h-4 bg-blue-500 rounded-full"
        trackClassName="h-1 bg-gray-300"
        value={value}
        onChange={handleChange}
        onAfterChange={handleChangeEnd}
        min={defaultMin}
        max={defaultMax}
        step={86400000} // One day in milliseconds
        pearling
        minDistance={86400000} // Minimum distance of one day
        disabled={!canRefine}
      />
      <div className="flex justify-between text-sm text-gray-700">
        <span>{formatDate(value[0])}</span>
        <span>{formatDate(value[1])}</span>
      </div>
    </div>
  );
};

export default CustomDateRangeSlider;
