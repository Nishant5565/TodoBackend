/*
  Warnings:

  - A unique constraint covering the columns `[dietChartId]` on the table `MealPreparation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MealPreparation_dietChartId_key" ON "MealPreparation"("dietChartId");
