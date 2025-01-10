/*
  Warnings:

  - You are about to drop the column `eveningIngredients` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `eveningInstructions` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `eveningMeal` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `morningIngredients` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `morningInstructions` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `morningMeal` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `nightIngredients` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `nightInstructions` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `nightMeal` on the `DietChart` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealType` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DietChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DietChart" DROP COLUMN "eveningIngredients",
DROP COLUMN "eveningInstructions",
DROP COLUMN "eveningMeal",
DROP COLUMN "morningIngredients",
DROP COLUMN "morningInstructions",
DROP COLUMN "morningMeal",
DROP COLUMN "nightIngredients",
DROP COLUMN "nightInstructions",
DROP COLUMN "nightMeal",
ADD COLUMN     "ingredients" TEXT[],
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "mealType" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
