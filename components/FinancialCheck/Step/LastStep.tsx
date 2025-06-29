"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { parseISO, differenceInYears } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footprints } from "lucide-react";
import { ClientJobField } from "../FieldLastStep/ClientJobField";
import { ClientMaritalStatusField } from "../FieldLastStep/ClientMaritalStatusField";
import { ClientDependentsField } from "../FieldLastStep/ClientDependentField";
import { ClientBirthdayField } from "../FieldLastStep/ClientBirthdayField";
import { ClientDomisiliField } from "../FieldLastStep/ClientDomisiliField";

function LastStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const birthday = watch("birthday");

  useEffect(() => {
    if (birthday) {
      const age = differenceInYears(new Date(), parseISO(birthday));
      setValue("age", age);
    }
  }, [birthday, setValue]);

  return (
    <div className="px-4 py-12 bg-white rounded-lg border border-amber-200 shadow-sm space-y-10">
      {/* Tengah: Icon dan Judul */}
      <div
        className="mx-10
"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="bg-white rounded-full border border-gray-300 shadow-sm p-3">
            <Footprints className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-semibold text-center pb-10">
            Satu langkah lagi untuk menyelesaikan Financial Check-Up Anda
          </h2>
        </div>

        {/* Form: rata kiri, underlined style */}
        <div className="space-y-6 max-w-xl">
          <div className="space-y-1">
            <Label htmlFor="name">Nama<span className="text-red-600">*</span></Label>
            <Input
              {...register("name", { required: "Nama wajib diisi" })}
              id="name"
              placeholder="Nama Lengkap"
              className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-1 focus-visible:border-amber-500"
            />
            {errors.name && (
              <p className="text-sm text-red-600">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email<span className="text-red-600">*</span></Label>
            <Input
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format email tidak valid",
                },
              })}
              id="email"
              type="email"
              placeholder="Alamat Email"
              className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-1 focus-visible:border-amber-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone_number">Nomor Telepon<span className="text-red-600">*</span></Label>
            <Input
              {...register("phone_number", {
                required: "Nomor telepon wajib diisi",
              })}
              id="phone_number"
              type="tel"
              placeholder="08xxxxxxxxxx"
              className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-1 focus-visible:border-amber-500"
            />
            {errors.phone_number && (
              <p className="text-sm text-red-600">
                {errors.phone_number.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Tanggal Lahir */}
            <ClientBirthdayField />

            {/* Umur */}
            <div className="space-y-1 w-full md:w-1/2">
              <Label htmlFor="age">Usia (Isi Tanggal Lahir)</Label>
              <div className="flex items-center gap-2">
                <Input
                  {...register("age")}
                  id="age"
                  type="number"
                  readOnly
                  className="bg-gray-100 border-0 border-b border-gray-300 rounded-non"
                />
                <span className="text-sm text-gray-600">Tahun</span>
              </div>
            </div>
          </div>

          <ClientDomisiliField />

          <ClientJobField />

          <ClientMaritalStatusField />

          <ClientDependentsField />
        </div>
      </div>
    </div>
  );
}

export default LastStep;
