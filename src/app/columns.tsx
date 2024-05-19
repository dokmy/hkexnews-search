"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export const columns: ColumnDef<News>[] = [
  {
    accessorKey: "STOCK_NAME",
    enableResizing: false,
    header: "Stock Name",
    cell: ({ row }) => {
      const stockName: string = row.getValue("STOCK_NAME");
      return <p className="line-clamp-1">{stockName}</p>;
    },
    size: 10, // Set the fixed width for this column
  },
  // {
  //   accessorKey: "STOCK_CODE",
  //   enableResizing: false,
  //   header: "Stock Code",
  //   cell: ({ row }) => {
  //     const stockCode: string = row.getValue("STOCK_CODE");
  //     return <Badge variant="outline">{stockCode}</Badge>;
  //   },
  //   size: 10, // Set the fixed width for this column
  // },
  {
    accessorKey: "LONG_TEXT",
    enableResizing: false,
    header: "Long Text",
    cell: ({ row }) => {
      const longText: string = row.getValue("LONG_TEXT");
      return <p className="line-clamp-1">{longText}</p>;
    },
    size: 20, // Set the fixed width for this column
  },
  {
    accessorKey: "FILE_LINK",
    enableResizing: false,
    header: "File Link",
    cell: ({ row }) => {
      const fileLink: string = row.getValue("FILE_LINK");
      return <a href={fileLink}>Download</a>;
    },
    size: 10, // Set the fixed width for this column
  },
  {
    accessorKey: "node_text",
    enableResizing: false,
    header: "Node Text",
    cell: ({ row }) => {
      const nodeText: string = row.getValue("node_text");
      return (
        <p className="whitespace-pre-wrap text-xs overflow-y-auto h-48">
          {nodeText}
        </p>
      );
    },
    size: 3000, // Set the fixed width for this column
  },
  {
    accessorKey: "t1_name",
    enableResizing: false,
    header: "T1 Name",
    size: 150, // Set the fixed width for this column
  },
  {
    accessorKey: "t2g_name",
    enableResizing: false,
    header: "T2G Name",
    size: 10, // Set the fixed width for this column
  },
  {
    accessorKey: "t2_name",
    enableResizing: false,
    header: "T2 Name",
    size: 10, // Set the fixed width for this column
  },
  {
    id: "actions",
    enableResizing: false,
    cell: ({ row }) => {
      const news = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Download File</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 10, // Set the fixed width for this column
  },
];
