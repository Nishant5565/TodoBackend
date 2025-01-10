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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getSpecificPatient = exports.getPatients = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield prisma.patient.findMany();
    res.json(patients);
});
exports.getPatients = getPatients;
const getSpecificPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(id);
    const patient = yield prisma.patient.findUnique({
        where: { id: Number(id) },
    });
    // console.log(patient);
    res.json(patient);
});
exports.getSpecificPatient = getSpecificPatient;
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = yield prisma.user.findUnique({
        where: { id: decoded.id },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'Manager') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    const newPatient = yield prisma.patient.create({
        data: req.body,
    });
    res.json(newPatient);
});
exports.createPatient = createPatient;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedPatient = yield prisma.patient.update({
        where: { id: Number(id) },
        data: req.body,
    });
    res.json(updatedPatient);
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.patient.delete({
        where: { id: Number(id) },
    });
    res.sendStatus(204);
});
exports.deletePatient = deletePatient;
