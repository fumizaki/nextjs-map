import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const locations = [
        { position: { lat: 35.6895, lng: 139.6917 }, message: "Here: 35.6895, 139.6000" },
        { position: { lat: 35.6895, lng: 139.8000 }, message: "Here: 35.6895, 139.7000" },
        { position: { lat: 35.6895, lng: 139.8000 }, message: "Here: 35.6895, 139.8000" },
        { position: { lat: 35.6895, lng: 139.8000 }, message: "Here: 35.6895, 139.9000" },
        { position: { lat: 35.6895, lng: 140 }, message: "Here: 35.6895, 140.0000" }
    ]
    return await NextResponse.json(locations);
}