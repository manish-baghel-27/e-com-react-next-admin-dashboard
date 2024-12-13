import type { Metadata } from "next";
import StoreProvider from "../StoreProvider";

export const metadata :Metadata = {
  title: {
    default:"OnlineMarket",
    template:"%s | OnlineMarket"
  },
  description: "OnlineMarket a ecommerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
