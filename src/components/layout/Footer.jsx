import Link from 'next/link';
import { Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 mt-auto bg-[var(--card)]">
      <div className="container flex flex-col items-center gap-6 text-center">
        <Link href="/" className="flex items-center gap-3 justify-center">
          <Landmark size={24} className="text-[var(--primary)]" />
          <span className="font-bold text-xl">DemocracyLens</span>
        </Link>
        <p className="p max-w-[500px]">
          An interactive educational platform designed to simplify and explain the Indian Election System to citizens and students alike.
        </p>
        <div className="text-[var(--muted-foreground)] text-sm">
          © {new Date().getFullYear()} DemocracyLens. Built for educational purposes.
        </div>
      </div>
    </footer>
  );
}
