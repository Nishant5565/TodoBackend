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
exports.deleteDeliveryPersonal = exports.updateDeliveryPersonal = exports.createDeliveryPersonal = exports.getDeliveriePersonal = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDeliveriePersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield prisma.deliveryPersonnel.findMany();
        res.json(deliveries);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getDeliveriePersonal = getDeliveriePersonal;
const createDeliveryPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("createDeliveryPersonal");
    const { name, additionalDetails, contactInfo, pantryId } = req.body;
    try {
        const newDelivery = yield prisma.deliveryPersonnel.create({
            data: {
                name,
                additionalDetails,
                contactInfo,
                pantryId: parseInt(pantryId, 10), // Convert pantryId to integer
            }
        });
        res.json(newDelivery);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.createDeliveryPersonal = createDeliveryPersonal;
const updateDeliveryPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.updateDeliveryPersonal = updateDeliveryPersonal;
const deleteDeliveryPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteDeliveryPersonal = deleteDeliveryPersonal;
