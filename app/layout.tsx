import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>

        <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
