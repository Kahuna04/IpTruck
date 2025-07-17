// Import and re-export Prisma enums
import {
  UserType,
  CompanySize,
  UrgencyLevel,
  BookingStatus,
  BidStatus,
  DocumentType,
  DocumentStatus,
  UserRole,
} from '@prisma/client';

export {
  UserType,
  CompanySize,
  UrgencyLevel,
  BookingStatus,
  BidStatus,
  DocumentType,
  DocumentStatus,
  UserRole,
};

export interface User {
  id: string;
  email: string;
  password: string;
  userType: UserType;
  isActive: boolean;
  isVerified: boolean;
  resetPasswordToken?: string;
  refreshToken?: string;
  lat?: number;
  lng?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  sub: string;
  email: string;
  userType: UserType;
  iat?: number;
  exp?: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface ResponseWrapper<T> {
  status: number;
  message: string;
  data: T;
}

export interface LocationData {
  locationName?: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  specialInstructions?: string;
  contactPerson?: string;
  contactPhone?: string;
}

export interface CargoDetails {
  description: string;
  type: string;
  weight: number;
  volume?: number;
  length?: number;
  width?: number;
  height?: number;
  quantity?: number;
  unit?: string;
  declaredValue?: number;
  requiresRefrigeration?: boolean;
  requiredTemperature?: number;
  isFragile?: boolean;
  isHazardous?: boolean;
  hazardousClass?: string;
  specialHandling?: string;
}

export interface TruckDetails {
  makeModel: string;
  year: number;
  licensePlate: string;
  maxPayload: number;
  cargoVolume?: number;
  condition: string;
  mileage?: number;
  equipment?: string[];
  availableServices?: string[];
  photoUrl?: string;
  insuranceNumber?: string;
  insuranceExpiryDate?: string;
}

export interface DriverDetails {
  fullName: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  experienceYears: number;
  contactPhone: string;
  rating?: number;
  completedTrips?: number;
  certifications?: string[];
}

export const TRUCK_TYPES = [
  'FLATBED',
  'VAN',
  'REFRIGERATED',
  'TANKER',
  'CONTAINER',
  'DUMP',
  'HEAVY_HAUL',
  'PICKUP',
  'BOX_TRUCK',
  'TRACTOR_TRAILER',
] as const;

export const URGENCY_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;

export const CARGO_TYPES = [
  'GENERAL',
  'PERISHABLE',
  'HAZARDOUS',
  'FRAGILE',
  'OVERSIZED',
  'LIQUID',
  'BULK',
  'CONSTRUCTION',
  'AUTOMOTIVE',
  'ELECTRONICS',
] as const;

export const NIGERIAN_STATES = [
  'ABIA',
  'ADAMAWA',
  'AKWA_IBOM',
  'ANAMBRA',
  'BAUCHI',
  'BAYELSA',
  'BENUE',
  'BORNO',
  'CROSS_RIVER',
  'DELTA',
  'EBONYI',
  'EDO',
  'EKITI',
  'ENUGU',
  'FCT',
  'GOMBE',
  'IMO',
  'JIGAWA',
  'KADUNA',
  'KANO',
  'KATSINA',
  'KEBBI',
  'KOGI',
  'KWARA',
  'LAGOS',
  'NASARAWA',
  'NIGER',
  'OGUN',
  'ONDO',
  'OSUN',
  'OYO',
  'PLATEAU',
  'RIVERS',
  'SOKOTO',
  'TARABA',
  'YOBE',
  'ZAMFARA',
] as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  maxLimit: 100,
} as const;

export const EMAIL_TEMPLATES = {
  SHIPPER_WELCOME: 'shipperWelcome',
  CARRIER_WELCOME: 'carrierWelcome',
  ACCOUNT_VERIFICATION: 'accountVerification',
  PASSWORD_RESET: 'passwordReset',
  NEW_BOOKING_NOTIFICATION: 'newBookingNotification',
  BID_RECEIVED: 'bidReceived',
  BID_ACCEPTED: 'bidAccepted',
  BID_REJECTED: 'bidRejected',
  BOOKING_CONFIRMATION: 'bookingConfirmation',
  BOOKING_REMINDER: 'bookingReminder',
} as const;

export const API_RESPONSE_MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  VALIDATION_ERROR: 'Validation failed',
  SERVER_ERROR: 'Internal server error',
  CONFLICT: 'Resource already exists',
} as const;
