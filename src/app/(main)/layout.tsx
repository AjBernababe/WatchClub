import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/appSideBar";
import { AppHeader } from "@/components/shared/appHeader";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <AppHeader title="Dashboard" />
        <main className="flex justify-center">{children}</main>
      </div>
    </SidebarProvider>
  );
}
