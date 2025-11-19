"use client";

import { useEffect } from "react";
import { Users, UserCheck, UserX, Activity } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

export default function DashboardOverviewPage() {
    const { users, fetchUsers } = useUserStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "Active").length;
    const inactiveUsers = users.filter((u) => u.status === "Inactive").length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your system status.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ totalUsers }</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ activeUsers }</div>
                        <p className="text-xs text-muted-foreground">
                            Currently active on platform
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
                        <UserX className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ inactiveUsers }</div>
                        <p className="text-xs text-muted-foreground">
                            Requires attention
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98.2%</div>
                        <p className="text-xs text-muted-foreground">
                            Operational
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-3 md:gap-4 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            { [1, 2, 3, 4, 5].map((i) => (
                                <div key={ i } className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mr-4">
                                        <span className="text-xs font-medium">U{ i }</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">User Action { i }</p>
                                        <p className="text-sm text-muted-foreground">
                                            User performed an action on the platform.
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-sm text-muted-foreground">
                                        { i }h ago
                                    </div>
                                </div>
                            )) }
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                                <h4 className="font-semibold">Generate Report</h4>
                                <p className="text-sm text-muted-foreground">Download the latest user activity report.</p>
                            </div>
                            <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                                <h4 className="font-semibold">System Maintenance</h4>
                                <p className="text-sm text-muted-foreground">Schedule a maintenance window.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
