import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          <Header />
          <div className="container mx-auto py-3 px-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { ClientLayout };
