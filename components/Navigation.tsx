import Sidebar from "./Sidebar";
import Profile from "./Profile";
import { SignedIn } from "@clerk/nextjs";

export default function Navigation() {
  return (
    <nav>
      <SignedIn>
        <Sidebar />
      </SignedIn>

      <div className="absolute left-[30vw] top-4 flex w-2/5 justify-between text-lg text-white md:max-w-[10rem]">
        <button className="">Home</button>
        <button className="">Chat</button>
      </div>

      <Profile />
    </nav>
  );
}
