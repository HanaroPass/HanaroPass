'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

function TabsLine({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs-line"
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  );
}

function TabsLineList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-line-list"
      className={cn(
        'inline-flex w-full items-center justify-start border-gray-100 border-b bg-transparent p-0 text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

function TabsLineTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-line-trigger"
      className={cn(
        'relative inline-flex items-center justify-center whitespace-nowrap rounded-none border-transparent border-b-2 px-4 py-2.5 font-medium text-sm transition-all',
        'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:border-black-900 data-[state=active]:text-black-900 data-[state=active]:shadow-none',
        'dark:data-[state=active]:border-primary dark:data-[state=active]:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

function TabsLineContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-line-content"
      className={cn('py-2 outline-none', className)}
      {...props}
    />
  );
}

export { TabsLine, TabsLineList, TabsLineTrigger, TabsLineContent };
