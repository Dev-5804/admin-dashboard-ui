import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { SidebarProvider } from "@/lib/sidebar-context";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                    <Topbar />
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-5 md:p-5 lg:gap-6 lg:p-6">
                        { children }
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
