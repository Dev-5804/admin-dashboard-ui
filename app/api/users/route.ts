import { NextResponse } from 'next/server';

// Mock database in memory (will reset on server restart)
let users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', status: 'Active' },
    { id: '5', name: 'Evan Wright', email: 'evan@example.com', status: 'Inactive' },
];

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
    };
    users.push(newUser);
    return NextResponse.json(newUser);
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { id, ...updates } = body;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    users[index] = { ...users[index], ...updates };
    return NextResponse.json(users[index]);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    users = users.filter((u) => u.id !== id);
    return NextResponse.json({ success: true });
}
