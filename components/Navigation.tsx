import Sidebar from "./Sidebar";
import Profile from "./Profile";
import { SignedIn } from "@clerk/nextjs";

export default function Navigation() {
  return (
    <nav>
      <SignedIn>
        <Sidebar />
      </SignedIn>

      {/* <div className="w-full ">
        <button className="">Home</button>
        <button className="">Chat</button>
      </div> */}

      <Profile />
    </nav>
  );
}
