"use client";

import { Search, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useTheme } from "@/lib/use-theme";

export function Topbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <Button variant="ghost" size="icon" onClick={ toggleTheme }>
                { theme === "light" ? (
                    <Moon className="h-5 w-5" />
                ) : (
                    <Sun className="h-5 w-5" />
                ) }
                <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">AD</span>
                </div>
                <span className="sr-only">Toggle user menu</span>
            </Button>
        </header>
    );
}
