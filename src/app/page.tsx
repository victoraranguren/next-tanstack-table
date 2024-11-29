"use client";
import data from "@/MOCK_DATA.json";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export default function HomePage() {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", { header: "id" }),
    columnHelper.accessor("name", { header: "name" }),
    columnHelper.accessor("lastname", { header: "lastname" }),
    columnHelper.accessor("email", { header: "email" }),
    columnHelper.accessor("country", { header: "country" }),
    columnHelper.accessor("dayOfBirthday", { header: "dayOfBirthday" }),
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  //1. initialize table throught this hook
  const table = useReactTable({
    //1.1 Define columns
    columns,
    //1.2 Define data
    data,
    //1.3 call and pass the function getCoreRowModel()
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  console.log(data);

  return (
    <div>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        {
                          asc: "⬆️",
                          desc: "⬇️",
                        }[header.column.getIsSorted() ?? null]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => table.setPageIndex(0)}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Primer Pagina
      </button>
      <button
        onClick={() => table.previousPage()}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Pagina Anterior
      </button>
      <button
        onClick={() => table.nextPage()}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Pagina Siguiente
      </button>
      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Ultima Pagina
      </button>
    </div>
  );
}
