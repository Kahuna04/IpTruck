import { ResponseWrapper } from './constants';
export declare class HelperService {
    hashData(data: string): Promise<string>;
    compareHash(data: string, hash: string): Promise<boolean>;
    generateRandomString(length?: number): string;
    generateRandomNumber(min?: number, max?: number): number;
    formatPhoneNumber(phoneNumber: string, countryCode?: string): string;
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit?: 'km' | 'miles'): number;
    private toRadians;
    createResponse<T>(status: number, message: string, data: T): ResponseWrapper<T>;
    isValidNigerianPhone(phoneNumber: string): boolean;
    isValidEmail(email: string): boolean;
    slugify(text: string): string;
    generateReferenceNumber(prefix?: string): string;
    isFutureDate(date: Date): boolean;
    addDays(date: Date, days: number): Date;
    formatCurrency(amount: number, currency?: string): string;
    sanitizeString(input: string): string;
    isEmpty(str: string): boolean;
    titleCase(str: string): string;
    getPaginationMeta(page: number, limit: number, total: number): {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        nextPage: number | null;
        previousPage: number | null;
    };
}
