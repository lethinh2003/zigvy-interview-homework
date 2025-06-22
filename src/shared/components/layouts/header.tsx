import { Grid3X3 } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ui/theme-toggle";
import { ProfileDropdown } from "./profile-dropdown";
import { Suspense } from "react";

const Header = () => {
  return (
    <div className=" border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* Main Header */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <SidebarTrigger className="text-gray-600 hover:bg-gray-100" /> */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Grid3X3 className="w-5 h-5 text-white " />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Zigtask
              </span>
            </div>
          </Link>
        </div>

        {/* <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-purple-500"
            />
          </div>
        </div> */}

        <div className="flex items-center gap-3">
          <div className="">
            <ThemeToggle />
          </div>

          <Suspense>
            <ProfileDropdown />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export { Header };
