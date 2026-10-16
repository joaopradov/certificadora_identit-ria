
const express = require("express");
const router = express.Router();

const dashboardController = require(
  "../controllers/dashboardController"
);

// Consultar indicadores do Dashboard
router.get("/", dashboardController.obterDashboard);

module.exports = router;
