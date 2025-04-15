import "@/app/globals.css";
import Navbar from "@/components/extensionNav";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <body className="rounded-lg">
          <Navbar/>
          {children}
        </body>
      </html>
    )
  }