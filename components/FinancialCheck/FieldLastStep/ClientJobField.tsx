import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ClientJobField = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedJob = watch("jobSelect");
  const jobText = watch("jobText");

  const [isOther, setIsOther] = useState(false);

  useEffect(() => {
    setIsOther(selectedJob === "lainnya");

    if (selectedJob !== "lainnya") {
      setValue("job", selectedJob);
    } else {
      setValue("job", jobText);
    }
  }, [selectedJob, jobText, setValue]);

  return (
    <div className="space-y-2">
      <Label htmlFor="jobSelect">Pekerjaan<span className="text-red-600">*</span></Label>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
        <div className="w-full md:w-1/2">
          <Select
            onValueChange={(val) =>
              setValue("jobSelect", val, { shouldValidate: true })
            }
            defaultValue={selectedJob || ""}
          >
            <SelectTrigger className="w-full border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-b-2 focus:border-amber-500">
              <SelectValue placeholder="Pilih pekerjaan Anda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pelajar / Mahasiswa">
                Pelajar / Mahasiswa
              </SelectItem>
              <SelectItem value="Karyawan Swasta">Karyawan Swasta</SelectItem>
              <SelectItem value="Pegawai Negeri / BUMN">
                Pegawai Negeri / BUMN
              </SelectItem>
              <SelectItem value="Wirausaha">Wirausaha</SelectItem>
              <SelectItem value="lainnya">Lainnya (isi sendiri)</SelectItem>
            </SelectContent>
          </Select>
          {errors.jobSelect && (
            <p className="text-sm text-red-600 mt-1">
              {errors.jobSelect.message as string}
            </p>
          )}
        </div>

        {isOther && (
          <div className="w-full md:w-1/2">
            <Input
              {...register("jobText")}
              id="custom-job"
              placeholder="Tulis pekerjaan Anda"
              className="w-full border-0 border-b rounded-none focus:ring-0 focus:border-b-2 focus:border-amber-500"
            />
            {errors.jobText && (
              <p className="text-sm text-red-600 mt-1">
                {errors.jobText.message as string}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
