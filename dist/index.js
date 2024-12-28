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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swaggerui = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path_1.default.resolve(__dirname, ".././src/swagger.yaml"));
const auth_routes_1 = __importDefault(require("./component/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./component/user/user.routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Provide a fallback port in case PORT is undefined
// Set up the rate limiter to allow 100 requests per hour
const limiter = (0, express_rate_limit_1.default)({
    max: 100, // 100 requests
    windowMs: 60 * 60 * 1000, // 1 hour
    message: "We have received too many requests from this IP. Please try again after one hour.",
});
// Middleware setup
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_URL || "*", // Your frontend URL, default to *
    methods: "*",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(limiter);
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ success: true, message: "Backend Connected Successfully" });
}));
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/docs", swaggerui.serve, swaggerui.setup(swaggerDocument));
// Start server and connect to the database
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    // connectDB();
});
