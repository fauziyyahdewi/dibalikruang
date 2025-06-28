import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const ClientDependentsField = () => {
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const hasDependents = watch("hasDependents") ?? false;

  return (
    <div className="space-y-4">
      {/* Switch */}
      <div className="flex items-center gap-3">
        <Label htmlFor="hasDependents" className="text-sm font-medium">
          Memiliki tanggungan?
        </Label>
        <Switch
          id="hasDependents"
          checked={hasDependents}
          onCheckedChange={(val) => {
            setValue("hasDependents", val, { shouldValidate: true });

            // Kosongkan field saat tidak punya tanggungan
            if (!val) {
              setValue("dependents", 0);
              setValue("dependents_note", "");
            }
          }}
        />
      </div>

      {/* Field hanya muncul kalau ya */}
      {hasDependents && (
        <>
          {/* Penjelasan Tanggungan */}
          <div className="space-y-1">
            <Label htmlFor="dependents_note">Rincian Tanggungan</Label>
            <Input
              {...register("dependents_note", {
                validate: (val) =>
                  hasDependents
                    ? val?.trim().length > 0 || "Penjelasan wajib diisi"
                    : true,
              })}
              id="dependents_note"
              placeholder="Contoh: Orang Tua, Pendidikan Anak"
              className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-amber-500"
            />
            {errors.dependents_note && (
              <p className="text-sm text-red-600">
                {errors.dependents_note.message as string}
              </p>
            )}
          </div>

          {/* Jumlah Tanggungan */}
          <div className="space-y-1">
            <Label htmlFor="dependents">Jumlah Tanggungan</Label>
            <Input
              {...register("dependents", {
                valueAsNumber: true,
                validate: (val) =>
                  hasDependents
                    ? val > 0 || "Jumlah tanggungan harus lebih dari 0"
                    : true,
              })}
              id="dependents"
              type="number"
              placeholder="Contoh: 2"
              className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-amber-500"
            />
            {errors.dependents && (
              <p className="text-sm text-red-600">
                {errors.dependents.message as string}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
