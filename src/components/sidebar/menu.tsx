'use client';

import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, type PropsWithChildren } from 'react';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { getMenuList } from '@/lib/menu-list';
import { cn } from '@/lib/utils';
import { EachElement } from '../ui/each-element';
import { CollapseMenuButton } from './collapse-menu-button';

type MenuProps = PropsWithChildren<{
  isOpen?: boolean;
}>;

type MenuListItemProps = {
  isOpen?: boolean;
  groupLabel: string;
};

const MenuListItem: FC<MenuListItemProps> = ({ groupLabel, isOpen }) => {
  if ((isOpen && groupLabel) ?? isOpen === undefined)
    return (
      <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
        {groupLabel}
      </p>
    );

  if (!isOpen && groupLabel)
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="w-full">
            <div className="flex w-full items-center justify-center">
              <Ellipsis className="h-5 w-5" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{groupLabel}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

  return <p className="pb-2" />;
};

export const Menu: FC<MenuProps> = ({ isOpen, children }) => {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="h-full w-full">
        <ul className="flex min-h-[calc(100dvh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100dvh-32px-40px-32px)]">
          <EachElement
            of={menuList}
            render={({ groupLabel, menus }) => (
              <li className={cn('w-full', groupLabel ? 'pt-5' : '')}>
                <MenuListItem groupLabel={groupLabel} isOpen={isOpen} />
                <EachElement
                  of={menus}
                  render={({ href, label, icon: Icon, active, submenus }) =>
                    submenus.length === 0 ? (
                      <div className="w-full">
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={active ? 'default' : 'ghost'}
                                className="mb-1 h-10 w-full justify-start"
                                asChild
                              >
                                <Link href={href}>
                                  <span
                                    className={cn(
                                      isOpen === false ? '' : 'mr-4',
                                    )}
                                  >
                                    <Icon size={18} />
                                  </span>
                                  <p
                                    className={cn(
                                      'max-w-[200px] truncate',
                                      isOpen === false
                                        ? '-translate-x-96 opacity-0'
                                        : 'translate-x-0 opacity-100',
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            {isOpen === false && (
                              <TooltipContent side="right">
                                {label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <div className="w-full">
                        <CollapseMenuButton
                          icon={Icon}
                          label={label}
                          active={active}
                          submenus={submenus}
                          isOpen={isOpen}
                        />
                      </div>
                    )
                  }
                />
              </li>
            )}
          />
          <li className="flex w-full grow items-end">{children}</li>
        </ul>
      </nav>
    </ScrollArea>
  );
};
