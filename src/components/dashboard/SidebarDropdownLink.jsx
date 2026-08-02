"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CollapsibleLink from "@/components/dashboard/CollapsibleLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SidebarDropdownLink({ icon: Icon, title, links }) {
  const pathname = usePathname();
  const isAnyActive = links.some((link) =>
    link.exact
      ? pathname === link.href
      : pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
  const [open, setOpen] = useState(isAnyActive);

  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <CollapsibleTrigger className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 font-medium text-slate-300 text-sm transition-colors hover:bg-slate-800 hover:text-slate-50">
        <Icon aria-hidden="true" className="shrink-0" size={18} />
        <span className="flex-1 truncate text-left">{title}</span>
        <ChevronRight
          className="h-4 w-4 shrink-0 transition-transform [[data-state=open]>&]:rotate-90"
          size={14}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-0.5 space-y-0.5">
        {links.map((link) => (
          <CollapsibleLink
            exact={link.exact}
            href={link.href}
            key={link.href}
            title={link.title}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
