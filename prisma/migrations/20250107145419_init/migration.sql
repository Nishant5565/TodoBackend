/*
  Warnings:

  - You are about to drop the `Delivery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bedNumber` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactInfo` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContact` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorNumber` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "additionalInfo" JSONB,
ADD COLUMN     "bedNumber" TEXT NOT NULL,
ADD COLUMN     "contactInfo" TEXT NOT NULL,
ADD COLUMN     "emergencyContact" TEXT NOT NULL,
ADD COLUMN     "floorNumber" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Delivery";

-- DropTable
DROP TABLE "Staff";

-- CreateTable
CREATE TABLE "DietChart" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "morningMeal" TEXT NOT NULL,
    "morningIngredients" TEXT[],
    "morningInstructions" TEXT NOT NULL,
    "eveningMeal" TEXT NOT NULL,
    "eveningIngredients" TEXT[],
    "eveningInstructions" TEXT NOT NULL,
    "nightMeal" TEXT NOT NULL,
    "nightIngredients" TEXT[],
    "nightInstructions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DietChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pantry" (
    "id" SERIAL NOT NULL,
    "staffName" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pantry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPreparation" (
    "id" SERIAL NOT NULL,
    "dietChartId" INTEGER NOT NULL,
    "pantryId" INTEGER NOT NULL,
    "preparationStatus" TEXT NOT NULL DEFAULT E'Pending',
    "deliveryStatus" TEXT NOT NULL DEFAULT E'Not Delivered',
    "assignedTo" INTEGER,
    "deliveryNotes" TEXT,
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPreparation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryPersonnel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "additionalDetails" JSONB,
    "pantryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryPersonnel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPreparation" ADD CONSTRAINT "MealPreparation_dietChartId_fkey" FOREIGN KEY ("dietChartId") REFERENCES "DietChart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPreparation" ADD CONSTRAINT "MealPreparation_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "Pantry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPreparation" ADD CONSTRAINT "MealPreparation_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "DeliveryPersonnel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryPersonnel" ADD CONSTRAINT "DeliveryPersonnel_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "Pantry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
