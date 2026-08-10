export default function Navbar({ onReset }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
          <span className="bg-slate-900 text-white font-bold px-2.5 py-1 rounded-md text-sm">a</span>
          <span className="font-semibold tracking-tight text-slate-900">atmo.</span>
        </div>
      </div>
    </header>
  );
}