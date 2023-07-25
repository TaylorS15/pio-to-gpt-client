'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

export default function Profile() {
	return (
		<div className="absolute top-4 right-4">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<User color="white" size={25} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-black border border-white text-white mr-4">
					<DropdownMenuItem className="font-semibold">Account Info</DropdownMenuItem>
					<SignOutButton>
						<DropdownMenuItem className="font-semibold cursor-pointer">
							Sign Out
						</DropdownMenuItem>
					</SignOutButton>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
