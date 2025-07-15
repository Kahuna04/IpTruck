export declare enum CompanySize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    ENTERPRISE = "ENTERPRISE"
}
export declare class CreateCarrierDto {
    userId: string;
    companyName: string;
    registrationNumber?: string;
    taxId?: string;
    businessEmail: string;
    phoneNumber: string;
    website?: string;
    companySize: CompanySize;
    description?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
    contactFirstName: string;
    contactLastName: string;
    contactJobTitle: string;
    contactPhone: string;
    contactEmail: string;
    fleetSize?: string;
    operatingRegions?: string;
    marketingOptIn?: boolean;
}
