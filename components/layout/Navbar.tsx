import { Menu, Youtube } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-14 border-b flex items-center px-4 justify-between">
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 cursor-pointer" />
        <div className="flex items-center gap-1 font-semibold text-lg">
          <Youtube className="text-red-500" />
          <span>YouTube</span>
        </div>
      </div>

      <input
        placeholder="Search"
        className="border rounded-full px-4 py-1 w-[40%]"
      />

      <div className="w-8 h-8 bg-gray-300 rounded-full" />
    </header>
  );
}
