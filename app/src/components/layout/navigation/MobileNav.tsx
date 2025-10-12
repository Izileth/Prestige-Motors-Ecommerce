
import { Link, useLocation } from 'react-router-dom';
import { cn } from '~/src/lib/cn';
import { Button } from '~/src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/src/components/ui/sheet';
import { Badge } from '~/src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/src/components/ui/avatar';
import { Menu, ChevronRight, MessageSquare, ChevronDown } from 'lucide-react';
import { useNegotiationsCount } from '~/src/hooks/useNegotiationsCount';
import { useAuth } from '~/src/hooks/useAuth';
import { defaultMenuItems } from './menu-items';
import type { NavigationProps } from './types';

export const MobileNav: React.FC<NavigationProps> = ({
  brandName = 'Prestige Motors',
  customMenuItems,
  showNegotiations = true,
  logo,
}) => {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const negotiationsCounts = useNegotiationsCount();
  const negotiationsCount = negotiationsCounts.active;

  const menuItems = (customMenuItems || defaultMenuItems).filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  const isActive = (path: string): boolean => pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex md:hidden justify-between items-center w-full max-w-full px-5 py-4">
      <Link to="/" className="text-lg font-extralight tracking-widest uppercase">
        {brandName}
      </Link>

      <div className="flex items-center gap-5">
        {isAuthenticated && (
          <Link to="/dashboard">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user?.avatar || ''} alt={user?.nome || 'User'} />
              <AvatarFallback className="text-xs font-extralight">
                {user?.nome?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}

        {showNegotiations && (
          <Link to="/vehicles/negotiations" className="relative">
            <MessageSquare className="h-5 w-5 stroke-1" />
            {negotiationsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-extralight bg-foreground text-background rounded-full">
                {negotiationsCount}
              </Badge>
            )}
          </Link>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2 ">
              <Menu className="h-5 w-5 stroke-1" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[100%] max-w-full p-0">
            <div className="flex flex-col h-full">
              {isAuthenticated && (
                <div className="flex items-center gap-3 p-6 border-b border-border">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={user?.avatar || ''} alt={user?.nome || 'User'} />
                    <AvatarFallback className="text-xs font-extralight">
                      {user?.nome?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-normal">{user?.nome || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-auto">
                <div className="px-6 py-10 space-y-6">
                  {menuItems.map((item, index) =>
                    item.submenu ? (
                      <div key={index} className="space-y-8 ">
                        <p className="flex flex-row items-center text-xl font-normal uppercase tracking-wider text-muted-foreground">
                          {item.name} <ChevronDown size={14} className="pl-1" />
                        </p>
                        <div className="space-y-4 mt-0 pl-1  border-l-zinc-900 border-l-2 ">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              className={cn(
                                'block text-xl font-extralight tracking-wider uppercase text-foreground hover:text-muted-foreground transition-colors ml-2',
                                isActive(subItem.href) && 'font-normal'
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={index}
                        to={item.href}
                        className={cn(
                          'block text-xl  font-extralight tracking-wider uppercase text-foreground hover:text-muted-foreground transition-colors',
                          isActive(item.href) && 'font-normal'
                        )}
                      >
                        <p className="flex flex-row items-center"> {item.name} <ChevronRight className="text-zinc-400 pl-1" size={14}/></p>
                      </Link>
                    )
                  )}
                </div>
              </div>

              <div className="px-6 pt-6 pb-8 space-y-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block text-xl font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
                    >
                      Conta
                    </Link>
                    <Link
                      to="/vehicles/negotiations"
                      className="block text-xl font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
                    >
                      Negociações
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-xl font-extralight tracking-wider uppercase p-0 h-auto hover:bg-transparent hover:text-foreground/80"
                      onClick={handleLogout}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-xl font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/register"
                      className="block text-xl font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
                    >
                      Registrar
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
