"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { FincheckResult } from "@/types/fincheck-client";
import { Input } from "@/components/ui/input";
import { FilterCondition } from "./FilterCondition";
import { FinancialDetailDialog } from "../FinancialCheckClient/Detail-Fincheck/FincheckDetailDialog";
import { DownloadButton } from "../DownloadButton";

type Props = {
  data: FincheckResult[];
  advisorName: string;
  loading?: boolean;
};

export function DataFincheckHandledTable({
  data,
  advisorName,
  loading = false,
}: Props) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchFilter, setSearchFilter] = React.useState("");
  const [conditionFilter, setConditionFilter] = React.useState<string[]>([]);
  const conditionOptions = ["Ideal", "Tidak Ideal", "Kurang Optimal"];

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchAdvisor = item.advisorName === advisorName;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
      const matchCondition =
        conditionFilter.length === 0 ||
        conditionFilter.includes(item.status ?? "");
      return matchAdvisor && matchSearch && matchCondition;
    });
  }, [data, advisorName, searchFilter, conditionFilter]);

  const columns: ColumnDef<FincheckResult>[] = [
    {
      id: "no",
      header: "No.",
      cell: ({ row }) => <div className="pl-1">{row.index + 1}.</div>,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nama",
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "Persen",
      cell: ({ row }) => `${row.original.percentage}%`,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Kondisi",
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: "Tanggal",
      cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy"),
    },
    {
      id: "advisorName",
      accessorKey: "advisorName",
      header: "Finansial Advisor",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <FinancialDetailDialog clientId={row.original.id} />
          <DownloadButton clientId={row.original.id} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div className="px-4 lg:px-6">
      {/* Filter & Search */}
      <div className="my-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Cari nama klien..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <FilterCondition
            selected={conditionFilter}
            options={conditionOptions}
            onChange={setConditionFilter}
          />
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.id}>
                      <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10"
                >
                  Tidak ada data yang ditangani
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredRowModel().rows.length} total baris.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
