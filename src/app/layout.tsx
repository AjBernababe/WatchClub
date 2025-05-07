export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Project</title>
        {/* Add other meta tags or head elements as needed */}
      </head>
      <body>{children}</body>
    </html>
  );
}
