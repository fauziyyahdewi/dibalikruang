"use client";

import React from "react";

type Props = {
  data: any;
};

export default function ClientProfileSection({ data }: Props) {
  return (
    <section>
      <h3 className="font-semibold text-base mb-4 border-b pb-1 text-amber-600">
        Data Klien
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <span className="text-xs text-gray-500">Nama</span>
          <p className="text-sm font-medium">
            {data.user?.name || "-"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Email</span>
          <p className="text-sm font-medium">
            {data.user?.email || "-"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Nomor Telepon</span>
          <p className="text-sm font-medium">
            {data.user?.clients?.phone_number || "-"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Tanggal Lahir</span>
          <p className="text-sm font-medium">
            {data.user?.clients?.birthday
              ? new Date(data.user.clients.birthday).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )
              : "-"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Pekerjaan</span>
          <p className="text-sm font-medium">
            {data.user?.clients?.jobs || "-"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Status Menikah</span>
          <p className="text-sm font-medium">
            {data.user?.clients?.is_married ? "Menikah" : "Belum menikah"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Tanggungan</span>
          <p className="text-sm font-medium">
            {data.user?.clients?.dependents_note || "Tidak Ada Tanggungan"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Jumlah Tanggungan</span>
          <p className="text-sm font-medium">
            {data.user?.clients?.dependents || 0}
          </p>
        </div>
      </div>
    </section>
  );
}
