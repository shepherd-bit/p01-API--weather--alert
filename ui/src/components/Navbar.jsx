import { Sun } from 'lucide-react';

export default function Navbar({ onReset }) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
          <span className="bg-slate-900 text-white font-bold px-2.5 py-1 rounded-md text-sm">a</span>
          <span className="font-semibold tracking-tight text-slate-900">atmo.</span>
        </div>

        {/* Right side: Theme Toggle */}
        <div className="flex items-center">
          <button className="border border-slate-200 px-3.5 py-1.5 rounded-full hover:bg-slate-100 transition-colors flex items-center shadow-xs">
            <Sun className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}