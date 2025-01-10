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
exports.deleteDelivery = exports.updateDelivery = exports.createDelivery = exports.getDeliveries = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDeliveries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield prisma.deliveryPersonnel.findMany();
        res.json(deliveries);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getDeliveries = getDeliveries;
const createDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDelivery = yield prisma.deliveryPersonnel.create({
            data: req.body,
        });
        res.json(newDelivery);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createDelivery = createDelivery;
const updateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedDelivery = yield prisma.deliveryPersonnel.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(updatedDelivery);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateDelivery = updateDelivery;
const deleteDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.deliveryPersonnel.delete({
            where: { id: Number(id) },
        });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteDelivery = deleteDelivery;
