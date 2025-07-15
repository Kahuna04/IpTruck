"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_RESPONSE_MESSAGES = exports.EMAIL_TEMPLATES = exports.DEFAULT_PAGINATION = exports.NIGERIAN_STATES = exports.CARGO_TYPES = exports.URGENCY_LEVELS = exports.TRUCK_TYPES = exports.UserRole = exports.DocumentStatus = exports.DocumentType = exports.BidStatus = exports.BookingStatus = exports.UrgencyLevel = exports.CompanySize = exports.UserType = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "UserType", { enumerable: true, get: function () { return client_1.UserType; } });
Object.defineProperty(exports, "CompanySize", { enumerable: true, get: function () { return client_1.CompanySize; } });
Object.defineProperty(exports, "UrgencyLevel", { enumerable: true, get: function () { return client_1.UrgencyLevel; } });
Object.defineProperty(exports, "BookingStatus", { enumerable: true, get: function () { return client_1.BookingStatus; } });
Object.defineProperty(exports, "BidStatus", { enumerable: true, get: function () { return client_1.BidStatus; } });
Object.defineProperty(exports, "DocumentType", { enumerable: true, get: function () { return client_1.DocumentType; } });
Object.defineProperty(exports, "DocumentStatus", { enumerable: true, get: function () { return client_1.DocumentStatus; } });
Object.defineProperty(exports, "UserRole", { enumerable: true, get: function () { return client_1.UserRole; } });
exports.TRUCK_TYPES = [
    'FLATBED',
    'VAN',
    'REFRIGERATED',
    'TANKER',
    'CONTAINER',
    'DUMP',
    'HEAVY_HAUL',
    'PICKUP',
    'BOX_TRUCK',
    'TRACTOR_TRAILER'
];
exports.URGENCY_LEVELS = [
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT'
];
exports.CARGO_TYPES = [
    'GENERAL',
    'PERISHABLE',
    'HAZARDOUS',
    'FRAGILE',
    'OVERSIZED',
    'LIQUID',
    'BULK',
    'CONSTRUCTION',
    'AUTOMOTIVE',
    'ELECTRONICS'
];
exports.NIGERIAN_STATES = [
    'ABIA', 'ADAMAWA', 'AKWA_IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE', 'BORNO',
    'CROSS_RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU', 'FCT', 'GOMBE',
    'IMO', 'JIGAWA', 'KADUNA', 'KANO', 'KATSINA', 'KEBBI', 'KOGI', 'KWARA',
    'LAGOS', 'NASARAWA', 'NIGER', 'OGUN', 'ONDO', 'OSUN', 'OYO', 'PLATEAU',
    'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA'
];
exports.DEFAULT_PAGINATION = {
    page: 1,
    limit: 20,
    maxLimit: 100
};
exports.EMAIL_TEMPLATES = {
    SHIPPER_WELCOME: 'shipperWelcome',
    CARRIER_WELCOME: 'carrierWelcome',
    ACCOUNT_VERIFICATION: 'accountVerification',
    PASSWORD_RESET: 'passwordReset',
    NEW_BOOKING_NOTIFICATION: 'newBookingNotification',
    BID_RECEIVED: 'bidReceived',
    BID_ACCEPTED: 'bidAccepted',
    BID_REJECTED: 'bidRejected',
    BOOKING_CONFIRMATION: 'bookingConfirmation',
    BOOKING_REMINDER: 'bookingReminder'
};
exports.API_RESPONSE_MESSAGES = {
    SUCCESS: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    VALIDATION_ERROR: 'Validation failed',
    SERVER_ERROR: 'Internal server error',
    CONFLICT: 'Resource already exists'
};
//# sourceMappingURL=index.js.map