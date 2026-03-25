import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface InquiryInput {
    service: ServiceType;
    name: string;
    phone: string;
}
export interface Inquiry {
    id: bigint;
    service: ServiceType;
    status: InquiryStatus;
    name: string;
    timestamp: Time;
    phone: string;
}
export enum InquiryStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum ServiceType {
    voterIdUpdate = "voterIdUpdate",
    panCardNew = "panCardNew",
    aadharCardDownload = "aadharCardDownload",
    voterIdNew = "voterIdNew",
    aadharCardUpdate = "aadharCardUpdate",
    panCardUpdate = "panCardUpdate",
    identityCardUpdate = "identityCardUpdate",
    rationCardUpdate = "rationCardUpdate",
    bankAccountOpening = "bankAccountOpening",
    identityCardApplication = "identityCardApplication",
    aadharCardNew = "aadharCardNew",
    pmgScheme = "pmgScheme",
    rationCardNew = "rationCardNew",
    otherGovernmentSchemes = "otherGovernmentSchemes"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteInquiry(id: bigint): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiriesByStatus(status: InquiryStatus): Promise<Array<Inquiry>>;
    getInquiryById(id: bigint): Promise<Inquiry>;
    isCallerAdmin(): Promise<boolean>;
    submitInquiry(input: InquiryInput): Promise<bigint>;
    updateInquiryStatus(id: bigint, status: InquiryStatus): Promise<void>;
}
