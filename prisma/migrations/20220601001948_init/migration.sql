/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCarts" DROP CONSTRAINT "ProductsOnCarts_cartId_fkey";

-- DropTable
DROP TABLE "Cart";

-- AddForeignKey
ALTER TABLE "ProductsOnCarts" ADD CONSTRAINT "ProductsOnCarts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
