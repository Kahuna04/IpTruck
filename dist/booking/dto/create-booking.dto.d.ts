import { UrgencyLevel } from '@prisma/client';
export declare enum CargoType {
    BEVERAGES = "beverages",
    FOOD_PRODUCTS = "food_products",
    ELECTRONICS = "electronics",
    TEXTILES = "textiles",
    CONSTRUCTION_MATERIALS = "construction_materials",
    AUTOMOTIVE_PARTS = "automotive_parts",
    CHEMICALS = "chemicals",
    PHARMACEUTICALS = "pharmaceuticals",
    MACHINERY = "machinery",
    GENERAL_CARGO = "general_cargo",
    HAZARDOUS_MATERIALS = "hazardous_materials",
    PERISHABLES = "perishables",
    FRAGILE_ITEMS = "fragile_items",
    BULK_CARGO = "bulk_cargo",
    LIQUID_CARGO = "liquid_cargo",
    OTHER = "other"
}
export declare enum TruckType {
    FLATBED = "flatbed",
    REFRIGERATED = "refrigerated",
    DRY_VAN = "dry_van",
    TANKER = "tanker",
    CONTAINER = "container",
    HEAVY_HAUL = "heavy_haul",
    PICKUP = "pickup",
    BOX_TRUCK = "box_truck",
    DUMP_TRUCK = "dump_truck",
    CEMENT_MIXER = "cement_mixer",
    CRANE_TRUCK = "crane_truck",
    LOWBOY = "lowboy",
    STEP_DECK = "step_deck",
    DOUBLE_DROP = "double_drop",
    SIDE_LOADER = "side_loader",
    CAR_CARRIER = "car_carrier",
    LIVESTOCK = "livestock",
    LOGGING = "logging",
    GARBAGE = "garbage",
    TOWING = "towing"
}
export declare enum LoadingType {
    SELF_LOADING = "self_loading",
    ASSISTED_LOADING = "assisted_loading",
    CRANE_REQUIRED = "crane_required",
    FORKLIFT_REQUIRED = "forklift_required",
    MANUAL_LOADING = "manual_loading"
}
export declare class LocationDto {
    [key: string]: any;
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
export declare class CargoDetailsDto {
    [key: string]: any;
    description: string;
    type: CargoType;
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
export declare class CreateBookingDto {
    referenceNumber?: string;
    description: string;
    pickupLocation: LocationDto;
    deliveryLocation: LocationDto;
    cargoDetails: CargoDetailsDto;
    preferredTruckType: TruckType;
    preferredPickupTime: string;
    latestPickupTime?: string;
    requiredDeliveryTime?: string;
    urgencyLevel: UrgencyLevel;
    loadingType: LoadingType;
    unloadingType: LoadingType;
    proposedPrice: number;
    currency?: string;
    minimumPrice?: number;
    maximumPrice?: number;
    isNegotiable?: boolean;
    additionalRequirements?: string;
    requiredServices?: string[];
    contactPerson: string;
    contactPhone: string;
    contactEmail?: string;
    expiresAt?: string;
    notificationsEnabled?: boolean;
    isRecurring?: boolean;
    recurrencePattern?: string;
}
