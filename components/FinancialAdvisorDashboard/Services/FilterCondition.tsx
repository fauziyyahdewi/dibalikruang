"use client";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";

export function FilterCondition({
  selected,
  options,
  onChange,
}: {
  selected: string[];
  options: string[];
  onChange: (selected: string[]) => void;
}) {
  const [temp, setTemp] = React.useState<string[]>(selected);

  React.useEffect(() => {
    setTemp(selected); // reset saat dibuka ulang
  }, [selected]);

  const toggle = (value: string) => {
    setTemp((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={temp.includes(option)}
                onCheckedChange={() => toggle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setTemp([])}>
              Reset
            </Button>
            <Button variant="default" size="sm" onClick={() => onChange(temp)}>
              Terapkan
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
