"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./src/app");
var PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
