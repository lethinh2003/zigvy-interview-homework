import { Header } from "./header";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export { ClientLayout };
