import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export function Header(){
    return (<div className="border-b py-4 bg-gray-50">
        <div className=" items-center  Containe mx-auto justify-between flex">
            <div>FileDrive</div>
            <div className="flex gap-2">
            <OrganizationSwitcher />
            <UserButton/>
            </div>
        </div>
    </div>);
}