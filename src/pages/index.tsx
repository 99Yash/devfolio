import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const user = useUser();

  return (
    <main
      className={`flex min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        {!!user.isSignedIn && <SignOutButton />}
        {!user.isSignedIn && <SignInButton />}
      </div>
    </main>
  );
}
