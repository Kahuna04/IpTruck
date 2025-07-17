"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const documents_controller_1 = require("./documents.controller");
const documents_service_1 = require("./documents.service");
const prisma_service_1 = require("../prisma/prisma.service");
const multer_1 = require("multer");
const path_1 = require("path");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: process.env.UPLOAD_PATH || './uploads',
                    filename: (req, file, cb) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
                    },
                }),
                limits: {
                    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
                },
                fileFilter: (req, file, cb) => {
                    const allowedMimeTypes = [
                        'application/pdf',
                        'image/jpeg',
                        'image/png',
                        'image/gif',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    ];
                    if (allowedMimeTypes.includes(file.mimetype)) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Invalid file type'), false);
                    }
                },
            }),
        ],
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService, prisma_service_1.PrismaService],
        exports: [documents_service_1.DocumentsService],
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map