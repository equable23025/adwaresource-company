import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Adwaresource Accounting — สำนักงานบัญชี สอบบัญชี ที่ปรึกษาภาษี SME",
  description: "สำนักงานบัญชี–สอบบัญชี–ที่ปรึกษาภาษีครบวงจรสำหรับ SME ไทย โดยทีม Big 4 Alumni — บัญชี ปิดงบ สอบบัญชี ภาษี BOI Payroll จดทะเบียนบริษัท",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={kanit.variable} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
