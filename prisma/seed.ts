import { PrismaClient } from "@/src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // // 🔹 client_finance_category
  // await prisma.finance_category.createMany({
  //   data: [
  //     { name: "Pemasukan" },
  //     { name: "Pengeluaran" },
  //     { name: "Aset" },
  //     { name: "Hutang" },
  //     { name: "Investasi" },
  //     { name: "Tabungan" },
  //     { name: "Menabung" },
  //   ],
  //   skipDuplicates: true,
  // });

  // // 🔹 client_finance_type
  // await prisma.finance_type.createMany({
  //   data: [
  //     { name: "Liquid" },
  //     { name: "Non-Liquid" },
  //     { name: "Tetap" },
  //     { name: "Variabel" },
  //     { name: "Jangka Panjang" },
  //     { name: "Jangka Pendek" },
  //   ],
  //   skipDuplicates: true,
  // });

  // // 🔹 finance_result_category
  // await prisma.fincheck_result_category.createMany({
  //   data: [
  //     { name: "Tabungan" },
  //     { name: "Dana Darurat" },
  //     { name: "Aset Liquid" },
  //     { name: "Hutang Terhadap Aset" },
  //     { name: "Cicilan Hutang" },
  //     { name: "Investasi" },
  //     { name: "Aset Terhadap Hutang" },
  //     { name: "Arus Kas" },
  //     { name: "Kekayaan Bersih" },
  //   ],
  //   skipDuplicates: true,
  // });

  // // 🔹 finance_result_type
  // await prisma.fincheck_result_type.createMany({
  //   data: [
  //     { name: "Ideal" },
  //     { name: "Tidak Ideal" },
  //     { name: "Kurang Optimal" },
  //   ],
  //   skipDuplicates: true,
  // });

  await prisma.user.update({
          where: { id: 2 },
          data: {
            role: "financial-advisor",
            updated_at: new Date(),
          },
        });

  console.log("✅ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding gagal:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
