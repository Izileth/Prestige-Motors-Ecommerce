import { Link, useLocation } from 'react-router';
import { cn } from '~/src/lib/cn';
import { Button } from '~/src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/src/components/ui/sheet';
import { Badge } from '~/src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/src/components/ui/avatar';
import { 
  Menu, 
  ChevronRight, 
  MessageSquare, 
  ChevronDown, 
  Search,
  LayoutDashboard,
  Car,
  User,
  Lock,
  UserX,
  LogOut
} from 'lucide-react';
import { useNegotiationsCount } from '~/src/hooks/useNegotiationsCount';
import { useAuth } from '~/src/hooks/useAuth';
import { defaultMenuItems } from './menu-items';
import type { NavigationProps } from './types';
import { useState } from 'react';

import { CategorySidebar } from './CategorySidebar';

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
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const menuItems = (customMenuItems || defaultMenuItems).filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  const isActive = (path: string): boolean => pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      setIsSheetOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  // Menu items do usuário
  const userMenuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Veículos',
      href: '/vehicles/user',
      icon: Car,
    },
    {
      title: 'Negociações',
      href: '/vehicles/negotiations',
      icon: MessageSquare,
      badge: negotiationsCount,
    },
  ];

  const accountMenuItems = [
    {
      title: 'Editar Perfil',
      href: '/dashboard/edit-profile',
      icon: User,
    },
    {
      title: 'Alterar Senha',
      href: '/dashboard/change-password',
      icon: Lock,
    },
    {
      title: 'Excluir Conta',
      href: '/dashboard/delete-account',
      icon: UserX,
    },
  ];

  return (
    <div className="flex md:hidden justify-between items-center w-full max-w-full px-5 py-4">
      <Link to="/vehicles/search" onClick={handleLinkClick}>
        <Search className="h-5 w-5 stroke-1" />
      </Link>

      <Link to="/" className="text-md font-extralight tracking-widest uppercase" onClick={handleLinkClick}>
        {brandName}
      </Link>

      <div className="flex items-center gap-5">
        {isAuthenticated && (
          <Link to="/dashboard" onClick={handleLinkClick}>
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user?.avatar || ''} alt={user?.nome || 'User'} />
              <AvatarFallback className="text-xs font-extralight">
                {user?.nome?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}

        {showNegotiations && (
          <Link to="/vehicles/negotiations" className="relative" onClick={handleLinkClick}>
            <MessageSquare className="h-5 w-5 stroke-1" />
            {negotiationsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-extralight bg-foreground text-background rounded-full">
                {negotiationsCount}
              </Badge>
            )}
          </Link>
        )}

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2">
              <Menu className="h-5 w-5 stroke-1" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[100%] max-w-full p-0 flex flex-col">
            {/* Header com informações do usuário */}
            {isAuthenticated && (
              <div className="flex items-center gap-3 p-6 border-b border-border">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={user?.avatar || ''} alt={user?.nome || 'User'} />
                  <AvatarFallback className="text-xs font-extralight">
                    {user?.nome?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-normal truncate">{user?.nome || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
            )}

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-auto">
              {/* Menu principal do site */}
              <div className="p-6 space-y-1 border-b border-border">
                <div className="mb-4">
                  <p className="text-xs font-normal uppercase tracking-wider text-muted-foreground px-3">
                    Menu
                  </p>
                </div>
                {menuItems.map((item, index) =>
                  item.submenu ? (
                    <div key={index}>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-extralight tracking-wider uppercase hover:bg-accent rounded-md transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            openSubmenu === item.name && 'rotate-180'
                          )}
                        />
                      </button>
                      {openSubmenu === item.name && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-3">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              onClick={handleLinkClick}
                              className={cn(
                                'block px-3 py-2 text-sm font-extralight tracking-wider uppercase hover:bg-accent rounded-md transition-colors',
                                isActive(subItem.href) && 'font-normal bg-accent'
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        'flex items-center justify-between px-3 py-2.5 text-sm font-extralight tracking-wider uppercase hover:bg-accent rounded-md transition-colors',
                        isActive(item.href) && 'font-normal bg-accent'
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  )
                )}
              </div>

              <div className="p-6 space-y-1 border-b border-border">
                <div className="mb-4">
                  <p className="text-xs font-normal uppercase tracking-wider text-muted-foreground px-3">
                    Categorias
                  </p>
                </div>
                <CategorySidebar onLinkClick={handleLinkClick} />
              </div>

              {/* Menu do usuário (apenas se autenticado) */}
              {isAuthenticated && (
                <>
                  <div className="p-6 space-y-1 border-b border-border">
                    <div className="mb-4">
                      <p className="text-xs font-normal uppercase tracking-wider text-muted-foreground px-3">
                        Minha Área
                      </p>
                    </div>
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 text-sm font-extralight tracking-wider uppercase hover:bg-accent rounded-md transition-colors',
                          isActive(item.href) && 'font-normal bg-accent'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <Badge className="h-5 px-2 text-[10px] font-extralight">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Submenu Conta */}
                  <div className="p-6 space-y-1 border-b border-border">
                    <button
                      onClick={() => toggleSubmenu('conta')}
                      className="flex items-center justify-between w-full mb-2 px-3"
                    >
                      <p className="text-xs font-normal uppercase tracking-wider text-muted-foreground">
                        Conta
                      </p>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform',
                          openSubmenu === 'conta' && 'rotate-180'
                        )}
                      />
                    </button>
                    {openSubmenu === 'conta' && (
                      <div className="space-y-1">
                        {accountMenuItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 text-sm font-extralight tracking-wider uppercase hover:bg-accent rounded-md transition-colors',
                              isActive(item.href) && 'font-normal bg-accent'
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer com ações */}
            <div className="p-6 border-t border-border">
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm font-extralight tracking-wider uppercase h-auto py-2.5 px-3 hover:bg-accent"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center w-full px-3 py-2.5 text-sm font-extralight tracking-wider uppercase hover:bg-accent rounded-md transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center w-full px-3 py-2.5 text-sm font-normal tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 rounded-md transition-colors"
                  >
                    Registrar
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};