// @ts-nocheck
import React, { forwardRef } from 'react'
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from '@/utilities/utils'

const ScrollArea = forwardRef(({ className,onScroll, children, ...props }, ref) => (
	<ScrollAreaPrimitive.Root
		ref={ref}
		className={cn("relative overflow-hidden", className)}
		{...props}
	>
		<ScrollAreaPrimitive.Viewport
            className="h-full w-full rounded-[inherit]"
            onScroll={onScroll}
        >
			{children}
		</ScrollAreaPrimitive.Viewport>
		<ScrollBar />
		<ScrollAreaPrimitive.Corner />
	</ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = forwardRef(({ className, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			"flex touch-none select-none transition-colors",
			orientation === "vertical" &&
			"h-full w-1.5 border-l border-l-transparent p-[1px]",
			orientation === "horizontal" &&
			"h-2.5 border-t border-t-transparent p-[1px]",
			className
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb
			className={cn(
				"relative rounded-full bg-blue-900",
				orientation === "vertical" && "flex-1"
			)}
		/>
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
