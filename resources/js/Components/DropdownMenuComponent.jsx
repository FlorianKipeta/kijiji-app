import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const DropdownMenuComponent = ({ triggerButton, menuItems }) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                {triggerButton}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[120px] rounded-md bg-white p-1 shadow-lg will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}
                >
                    {menuItems.map((item, index) => {
                        if (item.type === "separator") {
                            return <DropdownMenu.Separator key={index} className="m-1 h-px bg-gray-300" />;
                        }

                        if (item.type === "label") {
                            return (
                                <DropdownMenu.Label
                                    key={index}
                                    className="pl-6 text-xs leading-6 text-gray-500"
                                >
                                    {item.label}
                                </DropdownMenu.Label>
                            );
                        }

                        return (
                            <DropdownMenu.Item
                                key={index}
                                className={`group relative flex h-6 select-none items-center rounded px-2 text-sm leading-none text-gray-700 outline-none ${
                                    item.disabled
                                        ? "pointer-events-none text-gray-400"
                                        : "hover:bg-blue-500 hover:text-white"
                                }`}
                                disabled={item.disabled}
                                onClick={item.onClick}
                            >
                                {item.icon && (
                                    <item.icon className="h-4 w-4 mr-3 text-gray-500 group-hover:text-white" />
                                )}
                                {item.label}
                            </DropdownMenu.Item>
                        );
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuComponent;
