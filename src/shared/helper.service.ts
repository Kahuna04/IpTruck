import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ResponseWrapper } from './constants';

@Injectable()
export class HelperService {
  /**
   * Hash data using bcrypt
   */
  async hashData(data: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(data, saltRounds);
  }

  /**
   * Compare hashed data
   */
  async compareHash(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }

  /**
   * Generate random string
   */
  generateRandomString(length: number = 32): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random number
   */
  generateRandomNumber(min: number = 1000, max: number = 9999): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Format phone number to international format
   */
  formatPhoneNumber(phoneNumber: string, countryCode: string = '+234'): string {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Handle Nigerian numbers
    if (countryCode === '+234') {
      // If starts with 234, remove it
      if (cleaned.startsWith('234')) {
        return `+234${cleaned.substring(3)}`;
      }
      // If starts with 0, replace with country code
      if (cleaned.startsWith('0')) {
        return `+234${cleaned.substring(1)}`;
      }
      // Otherwise, add country code
      return `+234${cleaned}`;
    }

    return phoneNumber;
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: 'km' | 'miles' = 'km',
  ): number {
    const R = unit === 'km' ? 6371 : 3958.8; // Earth's radius in km or miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Create standardized API response
   */
  createResponse<T>(
    status: number,
    message: string,
    data: T,
  ): ResponseWrapper<T> {
    return {
      status,
      message,
      data,
    };
  }

  /**
   * Validate Nigerian phone number
   */
  isValidNigerianPhone(phoneNumber: string): boolean {
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Check if it's a valid Nigerian number format
    const patterns = [
      /^234[789]\d{9}$/, // +234 format
      /^0[789]\d{9}$/, // 0 format
      /^[789]\d{9}$/, // Without country code or 0
    ];

    return patterns.some((pattern) => pattern.test(cleaned));
  }

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /**
   * Slugify text (useful for URLs)
   */
  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Generate reference number
   */
  generateReferenceNumber(prefix: string = 'REF'): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Check if date is in the future
   */
  isFutureDate(date: Date): boolean {
    return date > new Date();
  }

  /**
   * Add days to date
   */
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Format currency
   */
  formatCurrency(amount: number, currency: string = 'NGN'): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Sanitize string input
   */
  sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Check if string is empty or whitespace
   */
  isEmpty(str: string): boolean {
    return !str || str.trim().length === 0;
  }

  /**
   * Capitalize first letter of each word
   */
  titleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  }

  /**
   * Generate pagination metadata
   */
  getPaginationMeta(page: number, limit: number, total: number) {
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
}
