import Image from 'next/image';
import Main from './ui/Main';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Main />
    </main>
  );
}
