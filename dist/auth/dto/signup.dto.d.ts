export declare enum CompanyType {
    SHIPPER = "SHIPPER",
    CARRIER = "CARRIER",
    BOTH = "BOTH"
}
export declare enum CompanySize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    ENTERPRISE = "ENTERPRISE"
}
export declare class AddressDto {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
}
export declare class CreateCompanyDto {
    userType: CompanyType;
    email: string;
    companyName: string;
    registrationNumber?: string;
    taxId?: string;
    address: AddressDto;
    businessEmail: string;
    phoneNumber: string;
    website?: string;
    companyType: CompanyType;
    companySize: CompanySize;
    description?: string;
    contactFirstName: string;
    contactLastName: string;
    contactJobTitle: string;
    contactPhone: string;
    contactEmail: string;
    password: string;
    acceptTerms: string;
    acceptPrivacy: string;
    marketingOptIn?: boolean;
    expectedMonthlyVolume?: string;
    fleetSize?: string;
    operatingRegions?: string;
}
