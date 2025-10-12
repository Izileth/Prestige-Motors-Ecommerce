
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/src/components/ui/avatar';
import { Button } from '~/src/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/src/components/ui/navigation-menu';
import { useAuth } from '~/src/hooks/useAuth';
import { ChevronRight } from 'lucide-react';

export const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex gap-6">
        <Link
          to="/login"
          className="text-xs font-extralight uppercase tracking-wider hover:text-foreground/70 transition-colors"
        >
          Sign in
        </Link>
        <Link
          to="/register"
          className="text-xs font-extralight uppercase tracking-wider hover:text-foreground/70 transition-colors"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="px-8">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent p-0">
            <div className="flex items-center gap-2 px-0">
              <Avatar className="h-7 w-7 border border-border">
                <AvatarImage src={user?.avatar || ''} alt={user?.nome || 'User'} />
                <AvatarFallback className="text-xs font-extralight">
                  {user?.nome ? user.nome.charAt(0) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-extralight uppercase tracking-wider">Conta</span>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-4 border-t border-border">
              <li className="mb-2 pb-2 border-b border-border ">
                <p className="text-xs font-normal">{user?.nome || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </li>
              <li className="w-full px-0">
                <NavigationMenuLink className="flex p-0" asChild>
                  <Link
                    to="/dashboard"
                    className="flex flex-row items-center justify-between py-2 px-0 text-xs font-extralight tracking-wider "
                  >
                    <span>Deashboard</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </NavigationMenuLink>
              </li>
              <li className="w-full px-0">
                <NavigationMenuLink className="flex" asChild>
                  <Link
                    to="/vehicles/user"
                    className="flex flex-row  items-center justify-between py-2 px-0 text-xs font-extralight tracking-wider"
                  >
                    <span>Veículos</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs font-extralight tracking-wider p-0 h-auto py-2 hover:bg-transparent hover:text-foreground/80"
                  onClick={handleLogout}
                >
                  <span>Sair</span>
                </Button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
