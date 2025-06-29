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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Filter } from "lucide-react";
import { format } from "date-fns";
import { FincheckResult } from "@/types/fincheck-client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Swal from "sweetalert2";
import { FinancialDetailDialog } from "./Detail-Fincheck/FincheckDetailDialog";
import { DownloadButton } from "../DownloadButton";

const kondisiList = ["Ideal", "Tidak Ideal", "Kurang Optimal"];

export function DataFincheckTable({ data }: { data: FincheckResult[] }) {
  const [tableData, setTableData] = React.useState<FincheckResult[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterPopoverOpen, setFilterPopoverOpen] = React.useState(false);
  const [tempFilter, setTempFilter] = React.useState({
    advisor: "all",
    kondisi: [] as string[],
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTableData(data);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const handleAssign = async (id: number) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menangani hasil Financial Check-Up ini.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, tangani",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch("/api/fincheck/advisor", {
        method: "POST",
        body: JSON.stringify({ fincheckId: id }),
      });

      if (!res.ok) throw new Error("Gagal mengassign advisor");

      const updatedRes = await fetch("/api/fincheck/list/all");
      const updatedData = await updatedRes.json();

      setTableData(updatedData);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data telah diperbarui.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Assign gagal:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat assign advisor.",
      });
    }
  };

  const columns: ColumnDef<FincheckResult>[] = [
    {
      id: "no",
      accessorKey: "no",
      header: "No.",
      cell: ({ row }) => <div className="pl-1">{row.index + 1}.</div>,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => <div className="pl-1">{row.original.name}</div>,
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
      cell: ({ row }) => row.original.status,
      filterFn: (row, columnId, value) => {
        if (value === "all") return true;
        if (Array.isArray(value)) return value.includes(row.getValue(columnId));
        return row.getValue(columnId) === value;
      },
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
      cell: ({ row }) => row.original.advisorName || "-",
      filterFn: (row, columnId, value) => {
        const val = row.getValue(columnId);
        if (value === "all") return true;
        if (value === "ada") return val !== null && val !== "";
        if (value === "-") return !val || val === "";
        return true;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <FinancialDetailDialog clientId={row.original.id} />

          <DownloadButton clientId={row.original.id} />

          <Button
            variant="default"
            size="icon"
            disabled={!!row.original.advisorName}
            onClick={() => handleAssign(row.original.id)}
          >
            <Check className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
  });

  const applyFilter = () => {
    table.getColumn("advisorName")?.setFilterValue(tempFilter.advisor);
    table
      .getColumn("status")
      ?.setFilterValue(
        tempFilter.kondisi.length === 0 ? "all" : tempFilter.kondisi
      );
    setFilterPopoverOpen(false);
  };

  return (
    <Tabs defaultValue="list" className="w-full flex-col gap-6">
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Cari nama..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
          <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Status Advisor</p>
                {["all", "-", "ada"].map((status) => (
                  <div key={status} className="flex items-center gap-2">
                    <Checkbox
                      checked={tempFilter.advisor === status}
                      onCheckedChange={() =>
                        setTempFilter((prev) => ({ ...prev, advisor: status }))
                      }
                    />
                    <label className="text-sm capitalize">
                      {status === "all"
                        ? "Semua"
                        : status === "-"
                        ? "Belum Ditangani"
                        : "Sudah Ditangani"}
                    </label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-medium">Kondisi</p>
                {kondisiList.map((k) => (
                  <div key={k} className="flex items-center gap-2">
                    <Checkbox
                      checked={tempFilter.kondisi.includes(k)}
                      onCheckedChange={(checked) =>
                        setTempFilter((prev) => ({
                          ...prev,
                          kondisi: checked
                            ? [...prev.kondisi, k]
                            : prev.kondisi.filter((val) => val !== k),
                        }))
                      }
                    />
                    <label className="text-sm">{k}</label>
                  </div>
                ))}
              </div>
              <Button onClick={applyFilter} className="w-full mt-2">
                Terapkan
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <TabsContent value="list" className="px-4 lg:px-6">
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
                        <Skeleton className="h-4 w-full" />
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
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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
      </TabsContent>
    </Tabs>
  );
}
