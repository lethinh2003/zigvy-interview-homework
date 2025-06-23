"use client";

import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useRouter } from "next/navigation";
import { PathEnum } from "@/shared/enums";

const ProfileDropdown = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    useAuthStore.getState().logout();
    toast.success("Logged out successfully");
    router.push(PathEnum.LOGIN);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8 border border-gray-200">
          <AvatarImage src="/avatar.png" className="object-contain" />
          <AvatarFallback className="bg-purple-100 text-purple-600 text-sm">
            JD
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ProfileDropdown };
