import { Home, Flame, Video, User } from "lucide-react";

const items = [
  { icon: Home, label: "Home" },
  { icon: Flame, label: "Trending" },
  { icon: Video, label: "Subscriptions" },
  { icon: User, label: "You" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 border-r h-[calc(100vh-56px)] p-3">
      {items.map((Item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <Item.icon className="w-5 h-5" />
          <span>{Item.label}</span>
        </div>
      ))}
    </aside>
  );
}
