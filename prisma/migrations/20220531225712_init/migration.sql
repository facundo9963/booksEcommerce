/*
  Warnings:

  - Added the required column `amount` to the `ProductsOnCarts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductsOnCarts" ADD COLUMN     "amount" INTEGER NOT NULL;
