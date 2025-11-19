"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar-context";
import { Button } from "@/components/Button";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "Users", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isOpen, closeSidebar } = useSidebar();

    return (
        <>
            {/* Mobile Overlay */ }
            { isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={ closeSidebar }
                />
            ) }

            <aside className={ cn(
                "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r bg-card text-card-foreground transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 md:h-screen md:flex",
                isOpen ? "translate-x-0" : "-translate-x-full"
            ) }>
                <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold" onClick={ closeSidebar }>
                        <span className="">AdminPanel</span>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={ closeSidebar }>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        { navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={ item.href }
                                    href={ item.href }
                                    onClick={ closeSidebar }
                                    className={ cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        isActive
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground"
                                    ) }
                                >
                                    <Icon className="h-4 w-4" />
                                    { item.label }
                                </Link>
                            );
                        }) }
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </div>
                </div>
            </aside>
        </>
    );
}
