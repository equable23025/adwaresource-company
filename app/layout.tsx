// app/layout.tsx
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";

export const metadata = {
  title: "Adwaresource Consulting",
  description: "Adwaresource Consulting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">
        <div className="h-screen flex flex-col">
          <Header />
          <main className="h-100 w-screen flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
