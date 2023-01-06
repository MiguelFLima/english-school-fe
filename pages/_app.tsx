import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}
