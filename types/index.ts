export type AccessLog = {
    id: number;
    rfidTag: string;
    accessGranted: boolean;
    eventType: string;
    timestamp: Date;
    lockId: number;
    lock: Lock;
    userName: string
};

// export type RfidCard = {
//     rfidTag: string;
//     ownerName: string;
//     isActive: boolean;
//     issuedAt: Date;
//     lockId?: number | null;
// };