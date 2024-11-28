"use client";
import data from "@/MOCK_DATA.json";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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

  //1. initialize table throught this hook
  const table = useReactTable({
    //1.1 Define columns
    columns,
    //1.2 Define data
    data,
    //1.3 call and pass the function getCoreRowModel()
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
    </div>
  );
}
