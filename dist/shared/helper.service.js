"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
let HelperService = class HelperService {
    async hashData(data) {
        const saltRounds = 10;
        return bcrypt.hash(data, saltRounds);
    }
    async compareHash(data, hash) {
        return bcrypt.compare(data, hash);
    }
    generateRandomString(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    generateRandomNumber(min = 1000, max = 9999) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    formatPhoneNumber(phoneNumber, countryCode = '+234') {
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (countryCode === '+234') {
            if (cleaned.startsWith('234')) {
                return `+234${cleaned.substring(3)}`;
            }
            if (cleaned.startsWith('0')) {
                return `+234${cleaned.substring(1)}`;
            }
            return `+234${cleaned}`;
        }
        return phoneNumber;
    }
    calculateDistance(lat1, lon1, lat2, lon2, unit = 'km') {
        const R = unit === 'km' ? 6371 : 3958.8;
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) *
                Math.cos(this.toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    createResponse(status, message, data) {
        return {
            status,
            message,
            data,
        };
    }
    isValidNigerianPhone(phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const patterns = [
            /^234[789]\d{9}$/,
            /^0[789]\d{9}$/,
            /^[789]\d{9}$/,
        ];
        return patterns.some((pattern) => pattern.test(cleaned));
    }
    isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    generateReferenceNumber(prefix = 'REF') {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8);
        return `${prefix}-${timestamp}-${random}`.toUpperCase();
    }
    isFutureDate(date) {
        return date > new Date();
    }
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    formatCurrency(amount, currency = 'NGN') {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }
    sanitizeString(input) {
        return input.trim().replace(/[<>]/g, '');
    }
    isEmpty(str) {
        return !str || str.trim().length === 0;
    }
    titleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    getPaginationMeta(page, limit, total) {
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        return {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage,
            hasPreviousPage,
            nextPage: hasNextPage ? page + 1 : null,
            previousPage: hasPreviousPage ? page - 1 : null,
        };
    }
};
exports.HelperService = HelperService;
exports.HelperService = HelperService = __decorate([
    (0, common_1.Injectable)()
], HelperService);
//# sourceMappingURL=helper.service.js.map