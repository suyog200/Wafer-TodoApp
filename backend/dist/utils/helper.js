"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInput = exports.isValidStatus = exports.isValidObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
    return mongoose_1.default.Types.ObjectId.isValid(id);
};
exports.isValidObjectId = isValidObjectId;
// Helper function to validate status
const isValidStatus = (status) => {
    return status === "completed" || status === "incomplete";
};
exports.isValidStatus = isValidStatus;
// Helper function to sanitize and validate input
const sanitizeInput = (input) => {
    return input?.toString().trim() || "";
};
exports.sanitizeInput = sanitizeInput;
//# sourceMappingURL=helper.js.map