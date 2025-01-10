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
exports.deletePantryTask = exports.updatePantryTask = exports.createPantryTask = exports.getPantryTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPantryTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pantryTasks = yield prisma.mealPreparation.findMany();
        res.json(pantryTasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getPantryTasks = getPantryTasks;
const createPantryTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dietChartId, pantryId, deliveryNotes } = req.body.pantryTaskData;
    try {
        const newPantryTask = yield prisma.mealPreparation.create({
            data: {
                dietChartId: dietChartId,
                pantryId: pantryId,
                deliveryNotes: deliveryNotes,
            },
        });
        res.json(newPantryTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createPantryTask = createPantryTask;
const updatePantryTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("update pantry task");
        const { id } = req.params;
        const updatedValues = req.body;
        console.log(updatedValues);
        const pantryTask = yield prisma.mealPreparation.update({
            where: { id: Number(id) },
            data: {
                dietChartId: updatedValues === null || updatedValues === void 0 ? void 0 : updatedValues.dietChartId,
                pantryId: updatedValues === null || updatedValues === void 0 ? void 0 : updatedValues.pantryId,
                deliveryNotes: updatedValues === null || updatedValues === void 0 ? void 0 : updatedValues.deliveryNotes,
                deliveryStatus: updatedValues === null || updatedValues === void 0 ? void 0 : updatedValues.deliveryStatus,
                preparationStatus: updatedValues === null || updatedValues === void 0 ? void 0 : updatedValues.preparationStatus,
                assignedTo: parseInt(updatedValues === null || updatedValues === void 0 ? void 0 : updatedValues.assignedTo, 10),
            },
        });
        res.json(pantryTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updatePantryTask = updatePantryTask;
const deletePantryTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dietChartId = id;
        yield prisma.mealPreparation.delete({
            where: { id: Number(id) },
        });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deletePantryTask = deletePantryTask;
