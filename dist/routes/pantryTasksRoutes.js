"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pantryTasksController_1 = require("../controllers/pantryTasksController");
const router = (0, express_1.Router)();
router.get('/', pantryTasksController_1.getPantryTasks);
router.post('/', pantryTasksController_1.createPantryTask);
router.put('/', pantryTasksController_1.updatePantryTask);
router.delete('/:id', pantryTasksController_1.deletePantryTask);
exports.default = router;
