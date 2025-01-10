"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDietChart = exports.updateDietChart = exports.createDietChart = exports.getDietCharts = exports.getAllDietCharts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllDietCharts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dietCharts = yield prisma.dietChart.findMany();
    res.json(dietCharts);
});
exports.getAllDietCharts = getAllDietCharts;
const getDietCharts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dietCharts = yield prisma.dietChart.findMany({
        where: {
            patientId: Number(id)
        }
    });
    res.json(dietCharts);
});
exports.getDietCharts = getDietCharts;
const createDietChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mealType, ingredients, instructions } = req.body;
    const { id } = req.params;
    const newDietChart = yield prisma.dietChart.create({
        data: {
            name,
            mealType,
            ingredients,
            instructions,
            patientId: Number(id)
        },
    });
    res.json(newDietChart);
});
exports.createDietChart = createDietChart;
const updateDietChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mealType, ingredients, instructions } = req.body;
    const { id } = req.params;
    console.log(id);
    const dietChart = yield prisma.dietChart.update({
        where: { id: Number(id) },
        data: {
            name,
            mealType,
            ingredients,
            instructions,
        },
    });
    res.json(dietChart);
});
exports.updateDietChart = updateDietChart;
const deleteDietChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.dietChart.delete({
        where: { id: Number(id) },
    });
    res.sendStatus(204);
});
exports.deleteDietChart = deleteDietChart;
