"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { useTheme } from "@/lib/use-theme";

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account's profile information and email address.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input defaultValue="Admin User" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input defaultValue="admin@example.com" />
                        </div>
                        <div className="flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium">Theme</label>
                                <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={ theme === 'light' ? 'default' : 'outline' }
                                    onClick={ () => theme === 'dark' && toggleTheme() }
                                    size="sm"
                                >
                                    Light
                                </Button>
                                <Button
                                    variant={ theme === 'dark' ? 'default' : 'outline' }
                                    onClick={ () => theme === 'light' && toggleTheme() }
                                    size="sm"
                                >
                                    Dark
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>Irreversible and destructive actions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                            <div>
                                <h4 className="font-medium text-destructive">Delete Account</h4>
                                <p className="text-sm text-destructive/80">Permanently delete your account and all data.</p>
                            </div>
                            <Button variant="destructive">Delete Account</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
