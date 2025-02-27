import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import favIcon from '../public/img/Credential-image.svg'
import { SnackbarProvider } from './hooks/snackbar-service';
import { Suspense } from 'react';
import Loading from './loading';
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Credential',
  description: 'Credential',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href={favIcon.src}></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        ></link>
        <GoogleTagManager gtmId="G-0RWHX4L0M3" />
      </head>
      <body className={inter.className}>
        <SnackbarProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </SnackbarProvider>
      </body>
    </html>
  );
}
