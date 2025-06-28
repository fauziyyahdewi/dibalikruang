"use client";

import { useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const ClientBirthdayField = () => {
  const { setValue, watch } = useFormContext();
  const date = watch("birthday");
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1 w-full md:w-1/2">
      <Label htmlFor="birthday">Tanggal Lahir<span className="text-red-600">*</span></Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-amber-500",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(new Date(date), "dd MMM yyyy") : "Pilih tanggal"}
            <CalendarIcon className="ml-auto h-4 w-4 text-amber-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setValue("birthday", selectedDate.toISOString().split("T")[0]);
                setOpen(false);
              }
            }}
            initialFocus
            captionLayout="dropdown" // ✅ dropdown untuk bulan dan tahun
            fromYear={1940}
            toYear={new Date().getFullYear()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
