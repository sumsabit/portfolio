function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-slate-900 border-b border-slate-800">
      <h1 className="text-2xl font-bold text-cyan-400">
        Sumeya
      </h1>

      <ul className="flex gap-8 text-sm font-medium">
        <li className="cursor-pointer hover:text-cyan-400">
          Home
        </li>

        <li className="cursor-pointer hover:text-cyan-400">
          About
        </li>

        <li className="cursor-pointer hover:text-cyan-400">
          Skills
        </li>

        <li className="cursor-pointer hover:text-cyan-400">
          Projects
        </li>

        <li className="cursor-pointer hover:text-cyan-400">
          Contact
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
