"use server"
import { db } from '@/lib/db';

export async function getLogs(username : string) {
    console.log("Fetching logs for user:", username);
    try {
        const lock = await db.lock.findFirst({
            where:{
                username
            }
        })
        console.log(lock);
        if(!lock) return [];

        const logs = await db.accessLog.findMany({
            where:{
                lockId: lock.id
            },
            include:{
                card: {
                    select: {
                        ownerName: true
                    }
                }
            },
            orderBy: { timestamp: 'desc' },
        });
        // console.log(logs)
        return logs;
    } catch (error) {
        console.error('Failed to fetch access logs:', error);
        throw new Error('Could not fetch access logs');
    }
}