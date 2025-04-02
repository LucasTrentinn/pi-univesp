import "../styles/globals.css";

export const metadata = {
  title: "Biblioteca PI",
  description: "Sistema de gerenciamento de bibliotecas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
