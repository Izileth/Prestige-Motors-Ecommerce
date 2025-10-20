// app/src/components/layout/navigation/DesktopNav.tsx
import { Link, useLocation } from 'react-router';
import { cn } from '~/src/lib/cn';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/src/components/ui/navigation-menu';
import { Badge } from '~/src/components/ui/badge';
import { useAuth } from '~/src/hooks/useAuth';
import { MessageSquare, Search } from 'lucide-react';
import { useNegotiationsCount } from '~/src/hooks/useNegotiationsCount';
import { UserMenu } from './UserMenu';
import { defaultMenuItems } from './menu-items';
import type { NavigationProps } from './types';

import { CategoryDropdown } from './CategoryDropdown';

export const DesktopNav: React.FC<NavigationProps> = ({
  brandName = 'Prestige Motors',
  customMenuItems,
  showNegotiations = true,
  logo,
}) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const negotiationsCounts = useNegotiationsCount();
  const negotiationsCount = negotiationsCounts.active;

  const menuItems = (customMenuItems || defaultMenuItems).filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  const isActive = (path: string): boolean => pathname === path;

  return (
    <div className="hidden md:flex justify-between items-center w-full px-8 py-5">
      <Link to="/" className="text-xl font-extralight tracking-widest uppercase">
        {brandName}
      </Link>

      <NavigationMenu className="mx-6">
        <NavigationMenuList className="gap-8">
        
          {menuItems.map((item, index) =>
            item.submenu ? (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className={cn(
                    'font-extralight tracking-wider text-[0.7rem] uppercase bg-transparent hover:bg-transparent',
                    isActive(item.href) && 'font-normal'
                  )}
                >
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className=" data-[side=top]:animate-slideDown data-[side=right]:animate-slideLeft data-[side=left]:animate-slideRight data-[side=bottom]:animate-slideUp ">
                  <ul className="grid w-[200px] gap-2 px-0 border-t border-border">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={subItem.href}
                            className={cn(
                              'block py-2  text-[0.7rem]  font-extralight uppercase tracking-wider hover:bg-transparent',
                              isActive(subItem.href) && 'font-normal'
                            )}
                          >
                            {subItem.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={index}>
                <Link
                  to={item.href}
                  className={cn(
                    ' text-[0.7rem]  font-extralight uppercase tracking-wider hover:text-foreground/70 transition-colors',
                    isActive(item.href) && 'font-normal'
                  )}
                >
                  {item.name}
                </Link>
              </NavigationMenuItem>
            )
          )}
            <CategoryDropdown />
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-8">
        <Link to="/vehicles/search">
          <Search className="h-5 w-5 stroke-1" />
        </Link>
        <UserMenu />
        {showNegotiations && (
          <Link to="/vehicles/negotiations" className="relative group">
            <MessageSquare className="h-5 w-5 stroke-1" />
            {negotiationsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-extralight bg-foreground text-background rounded-full">
                {negotiationsCount}
              </Badge>
            )}
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Negociações
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};
