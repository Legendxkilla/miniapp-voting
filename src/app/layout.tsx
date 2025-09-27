export const metadata = {
  title: "Base Voting",
  description: "Voting DApp on Base",
  other: {
    "fc:frame": "vNext",
    "fc:miniapp": "https://miniapp-voting.vercel.app/miniapp.json"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
