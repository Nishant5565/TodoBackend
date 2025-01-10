"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const dietChartRoutes_1 = __importDefault(require("./routes/dietChartRoutes"));
const pantryRoutes_1 = __importDefault(require("./routes/pantryRoutes"));
const deliveryRoutes_1 = __importDefault(require("./routes/deliveryRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const pantryTasksRoutes_1 = __importDefault(require("./routes/pantryTasksRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://hospital-management-rose.vercel.app'],
    credentials: true
}));
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/auth', authRoutes_1.default);
//* Middleware to authenticate JWT token
app.use(authMiddleware_1.authenticateToken);
//* Routes
app.use('/patients', patientRoutes_1.default);
app.use('/diet-charts', dietChartRoutes_1.default);
app.use('/pantry', pantryRoutes_1.default);
app.use('/delivery', deliveryRoutes_1.default);
app.use('/pantry-tasks', pantryTasksRoutes_1.default); // Add this line
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
