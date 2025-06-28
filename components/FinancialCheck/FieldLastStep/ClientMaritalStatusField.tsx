import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export const ClientMaritalStatusField = () => {
  const { setValue, watch } = useFormContext();
  const married = watch("married");
  console.log("married", married);

  return (
    <div className="space-y-1">
      <Label htmlFor="married">Status Pernikahan<span className="text-red-600">*</span></Label>
      <Select
        value={
          married === true
            ? "true"
            : married === false
            ? "false"
            : undefined
        }
        onValueChange={(val) => setValue("married", val === "true")}
      >
        <SelectTrigger className="w-full border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-b-2 focus:border-amber-500">
          <SelectValue placeholder="Pilih status pernikahan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Sudah Menikah</SelectItem>
          <SelectItem value="false">Belum Menikah</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
