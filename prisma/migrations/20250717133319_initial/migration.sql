-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('SHIPPER', 'CARRIER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('ACTIVE', 'PENDING_BIDS', 'BIDS_RECEIVED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COUNTER_OFFERED', 'WITHDRAWN', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('BILL_OF_LADING', 'INSURANCE_CERTIFICATE', 'DRIVER_LICENSE', 'CARGO_PHOTO', 'DELIVERY_SIGNATURE', 'INSPECTION_REPORT', 'INVOICE', 'RECEIPT');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "resetPasswordToken" TEXT,
    "refreshToken" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipper" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "taxId" TEXT,
    "businessEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "website" TEXT,
    "companySize" "CompanySize" NOT NULL,
    "description" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "contactFirstName" TEXT NOT NULL,
    "contactLastName" TEXT NOT NULL,
    "contactJobTitle" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "expectedMonthlyVolume" TEXT,
    "operatingRegions" TEXT,
    "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrier" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "taxId" TEXT,
    "businessEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "website" TEXT,
    "companySize" "CompanySize" NOT NULL,
    "description" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "contactFirstName" TEXT NOT NULL,
    "contactLastName" TEXT NOT NULL,
    "contactJobTitle" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "fleetSize" TEXT,
    "operatingRegions" TEXT,
    "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "id" TEXT NOT NULL,
    "carrierId" TEXT NOT NULL,
    "makeModel" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "maxPayload" DOUBLE PRECISION NOT NULL,
    "cargoVolume" DOUBLE PRECISION,
    "truckType" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "mileage" DOUBLE PRECISION,
    "equipment" TEXT[],
    "availableServices" TEXT[],
    "photoUrl" TEXT,
    "insuranceNumber" TEXT,
    "insuranceExpiryDate" TIMESTAMP(3),
    "driverName" TEXT,
    "driverLicenseNumber" TEXT,
    "driverLicenseExpiry" TIMESTAMP(3),
    "driverExperience" INTEGER,
    "driverPhone" TEXT,
    "driverRating" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "shipperId" TEXT NOT NULL,
    "referenceNumber" TEXT,
    "description" TEXT NOT NULL,
    "pickupLocation" JSONB NOT NULL,
    "deliveryLocation" JSONB NOT NULL,
    "cargoDetails" JSONB NOT NULL,
    "preferredTruckType" TEXT NOT NULL,
    "preferredPickupTime" TIMESTAMP(3) NOT NULL,
    "latestPickupTime" TIMESTAMP(3),
    "requiredDeliveryTime" TIMESTAMP(3),
    "urgencyLevel" "UrgencyLevel" NOT NULL,
    "loadingType" TEXT NOT NULL,
    "unloadingType" TEXT NOT NULL,
    "proposedPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "minimumPrice" DOUBLE PRECISION,
    "maximumPrice" DOUBLE PRECISION,
    "isNegotiable" BOOLEAN NOT NULL DEFAULT true,
    "additionalRequirements" TEXT,
    "requiredServices" TEXT[],
    "contactPerson" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT,
    "expiresAt" TIMESTAMP(3),
    "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrencePattern" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'ACTIVE',
    "acceptedBidId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "carrierId" TEXT NOT NULL,
    "bidAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "proposedPickupTime" TIMESTAMP(3) NOT NULL,
    "estimatedDeliveryTime" TIMESTAMP(3) NOT NULL,
    "truckDetails" JSONB NOT NULL,
    "driverDetails" JSONB NOT NULL,
    "message" TEXT,
    "includedServices" TEXT[],
    "bidExpiresAt" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "isNegotiable" BOOLEAN NOT NULL DEFAULT true,
    "paymentTerms" TEXT,
    "specialTerms" TEXT,
    "minimumAcceptablePrice" DOUBLE PRECISION,
    "documentationUrl" TEXT,
    "contactPerson" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT,
    "status" "BidStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "bookingId" TEXT,
    "bidId" TEXT,
    "carrierId" TEXT,
    "uploadedById" TEXT NOT NULL,
    "billOfLadingId" TEXT,
    "metadata" JSONB,
    "expiresAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "verifiedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillOfLading" (
    "id" TEXT NOT NULL,
    "bolNumber" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "shipperName" TEXT NOT NULL,
    "shipperAddress" JSONB NOT NULL,
    "shipperContact" JSONB NOT NULL,
    "consigneeName" TEXT NOT NULL,
    "consigneeAddress" JSONB NOT NULL,
    "consigneeContact" JSONB NOT NULL,
    "carrierName" TEXT NOT NULL,
    "carrierAddress" JSONB NOT NULL,
    "carrierContact" JSONB NOT NULL,
    "driverName" TEXT NOT NULL,
    "driverLicense" TEXT NOT NULL,
    "truckInfo" JSONB NOT NULL,
    "cargoDescription" TEXT NOT NULL,
    "cargoWeight" DOUBLE PRECISION NOT NULL,
    "cargoValue" DOUBLE PRECISION,
    "packageCount" INTEGER NOT NULL,
    "packageType" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "route" JSONB NOT NULL,
    "specialInstructions" TEXT,
    "hazmatInfo" JSONB,
    "status" TEXT NOT NULL DEFAULT 'CREATED',
    "shipperSignature" TEXT,
    "carrierSignature" TEXT,
    "deliverySignature" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "signedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillOfLading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "department" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_userType_idx" ON "User"("userType");

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_userId_key" ON "Shipper"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_businessEmail_key" ON "Shipper"("businessEmail");

-- CreateIndex
CREATE INDEX "Shipper_businessEmail_idx" ON "Shipper"("businessEmail");

-- CreateIndex
CREATE INDEX "Shipper_companyName_idx" ON "Shipper"("companyName");

-- CreateIndex
CREATE INDEX "Shipper_city_state_idx" ON "Shipper"("city", "state");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_userId_key" ON "Carrier"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_businessEmail_key" ON "Carrier"("businessEmail");

-- CreateIndex
CREATE INDEX "Carrier_businessEmail_idx" ON "Carrier"("businessEmail");

-- CreateIndex
CREATE INDEX "Carrier_companyName_idx" ON "Carrier"("companyName");

-- CreateIndex
CREATE INDEX "Carrier_city_state_idx" ON "Carrier"("city", "state");

-- CreateIndex
CREATE INDEX "Carrier_rating_idx" ON "Carrier"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "Truck_licensePlate_key" ON "Truck"("licensePlate");

-- CreateIndex
CREATE INDEX "Truck_carrierId_idx" ON "Truck"("carrierId");

-- CreateIndex
CREATE INDEX "Truck_truckType_idx" ON "Truck"("truckType");

-- CreateIndex
CREATE INDEX "Truck_licensePlate_idx" ON "Truck"("licensePlate");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_shipperId_idx" ON "Booking"("shipperId");

-- CreateIndex
CREATE INDEX "Booking_urgencyLevel_idx" ON "Booking"("urgencyLevel");

-- CreateIndex
CREATE INDEX "Booking_preferredTruckType_idx" ON "Booking"("preferredTruckType");

-- CreateIndex
CREATE INDEX "Booking_createdAt_idx" ON "Booking"("createdAt");

-- CreateIndex
CREATE INDEX "Bid_bookingId_idx" ON "Bid"("bookingId");

-- CreateIndex
CREATE INDEX "Bid_carrierId_idx" ON "Bid"("carrierId");

-- CreateIndex
CREATE INDEX "Bid_status_idx" ON "Bid"("status");

-- CreateIndex
CREATE INDEX "Bid_createdAt_idx" ON "Bid"("createdAt");

-- CreateIndex
CREATE INDEX "Document_type_idx" ON "Document"("type");

-- CreateIndex
CREATE INDEX "Document_status_idx" ON "Document"("status");

-- CreateIndex
CREATE INDEX "Document_bookingId_idx" ON "Document"("bookingId");

-- CreateIndex
CREATE INDEX "Document_carrierId_idx" ON "Document"("carrierId");

-- CreateIndex
CREATE INDEX "Document_createdAt_idx" ON "Document"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "BillOfLading_bolNumber_key" ON "BillOfLading"("bolNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BillOfLading_bookingId_key" ON "BillOfLading"("bookingId");

-- CreateIndex
CREATE INDEX "BillOfLading_bolNumber_idx" ON "BillOfLading"("bolNumber");

-- CreateIndex
CREATE INDEX "BillOfLading_bookingId_idx" ON "BillOfLading"("bookingId");

-- CreateIndex
CREATE INDEX "BillOfLading_status_idx" ON "BillOfLading"("status");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_userId_key" ON "AdminUser"("userId");

-- CreateIndex
CREATE INDEX "AdminUser_role_idx" ON "AdminUser"("role");

-- CreateIndex
CREATE INDEX "AdminUser_isActive_idx" ON "AdminUser"("isActive");

-- CreateIndex
CREATE INDEX "AuditLog_adminId_idx" ON "AuditLog"("adminId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog"("entityType");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrier" ADD CONSTRAINT "Carrier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_shipperId_fkey" FOREIGN KEY ("shipperId") REFERENCES "Shipper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Bid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_billOfLadingId_fkey" FOREIGN KEY ("billOfLadingId") REFERENCES "BillOfLading"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfLading" ADD CONSTRAINT "BillOfLading_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
