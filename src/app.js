require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// conexión a DB
require('../config/db');