"use client";

import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { domisiliList } from "@/lib/constants/domisiliList";

export const ClientDomisiliField = () => {
  const { control, formState: { errors } } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <Label htmlFor="domisili">Domisili<span className="text-red-600">*</span></Label>
      <Controller
        control={control}
        name="domisili"
        rules={{ required: "Domisili wajib dipilih" }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                className="w-full justify-between border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-amber-500"
              >
                {field.value || "Pilih Kota/Kabupaten"}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Cari kota..." />
                <CommandList>
                  {domisiliList.map((kota) => (
                    <CommandItem
                      key={kota}
                      value={kota}
                      onSelect={() => {
                        field.onChange(kota);
                        setOpen(false);
                      }}
                    >
                      {kota}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {errors.domisili && (
        <p className="text-sm text-red-600">{errors.domisili.message as string}</p>
      )}
    </div>
  );
};
