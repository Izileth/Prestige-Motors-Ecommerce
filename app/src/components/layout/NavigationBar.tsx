import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router";

import { cn } from "~/src/lib/cn";
import { Button } from "~/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/src/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/src/components/ui/navigation-menu";
import { Badge } from "~/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/src/components/ui/avatar";
import { Menu, ChevronRight, MessageSquare, ChevronDown, ChevronsRight } from "lucide-react";


import { useNegotiationsCount } from "~/src/hooks/useNegotiationsCount";
import { useAuth } from "~/src/hooks/useAuth";

// Menu item interface
interface MenuItem {
  name: string;
  href: string;
  submenu?: MenuItem[];
}

interface NavigationProps {
  /**
   * Brand name to display in the navbar
   * @default "Prestige Motors"
   */
  brandName?: string;

  /**
   * Custom menu items for navigation
   * If not provided, default menu items will be used
   */
  customMenuItems?: MenuItem[];

  /**
   * Number of items in the shopping cart
   * @default 0
   */
  cartItemCount?: number;
  /**
   * Number of active negotiations
   * @default 0
   */
  negotiationCount?: number;

  /**
   * Whether to show the negotiations icon
   * @default true
   */
  showNegotiations?: boolean;

  /**
   * Whether to show the shopping cart icon
   * @default true
   */
  showCart?: boolean;

  /**
   * Custom logo component
   * If provided, will replace the text brand name
   */
  logo?: React.ReactNode;

  /**
   * Additional CSS classes for the navbar
   */
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  brandName = "Prestige Motors",
  customMenuItems,
  cartItemCount = 0,
  negotiationCount = 0,
  showNegotiations = true,
  showCart = true,
  logo,
  className,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { pathname } = useLocation();

  // Use the auth hook to access authentication state and functions
  const { user, isAuthenticated, logout } = useAuth();
  // Hook para buscar a contagem de negociações
      
  const negotiationsCounts = useNegotiationsCount();
  
  const negotiationsCount = negotiationsCounts.active; // Usando negociações ativas


  // Detect if mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Default menu items if not provided
  const defaultMenuItems: MenuItem[] = [
    { name: "Início", href: "/" },
    { name: "Exclusivos", href: "/destacts" },
    {
      name: "Seções",
      href: "#",
      submenu: [
        { name: "Quem Somos", href: "/about" },
        { name: "Nossa Missão", href: "/history" },
        
      ],
    },
    { name: "Catálogo", href: "/vehicles" },
    { name: "Divulgar Veículo", href: "/vehicles/create" },
    { name: "Meus Veículos", href: "/vehicles/user" },
    { name: "Vendas & Negócios", href: "/sale/dashboard" },
    { name: "Conversas", href: "/vehicles/negotiations" },
  ];

  // Use custom menu items if provided, otherwise use default
  const menuItems = customMenuItems || defaultMenuItems;

  // Check if a path is active
  const isActive = (path: string): boolean => pathname === path;

  // Desktop navigation component with minimalist design
  const DesktopNav = () => (
    <div className="hidden md:flex justify-between items-center w-full px-8 py-5">
      <Link
        to="/"
        className="text-xl font-extralight tracking-widest uppercase"
      >
        {logo || brandName}
      </Link>

      <NavigationMenu className="mx-6">
        <NavigationMenuList className="gap-8">
          {menuItems.map((item, index) =>
            item.submenu ? (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className={cn(
                    "font-extralight tracking-wider text-xs uppercase bg-transparent hover:bg-transparent",
                    isActive(item.href) && "font-normal"
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
                              "block py-2 text-xs font-extralight uppercase tracking-wider hover:bg-transparent",
                              isActive(subItem.href) && "font-normal"
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
                    "text-xs font-extralight uppercase tracking-wider hover:text-foreground/70 transition-colors",
                    isActive(item.href) && "font-normal"
                  )}
                >
                  {item.name}
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-8">
        {isAuthenticated ? (
          <NavigationMenu>
            <NavigationMenuList className="px-8">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent p-0">
                  <div className="flex items-center gap-2 px-0">
                    <Avatar className="h-7 w-7 border border-border">
                      <AvatarImage
                        src={user?.avatar || ""}
                        alt={user?.nome || "User"}
                      />
                      <AvatarFallback className="text-xs font-extralight">
                        {user?.nome ? user.nome.charAt(0) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-extralight uppercase tracking-wider">
                      Conta
                    </span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-4 border-t border-border">
                    <li className="mb-2 pb-2 border-b border-border ">
                      <p className="text-xs font-normal">
                        {user?.nome || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
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
        ) : (
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
        )}
        {showNegotiations && (
          <Link to="/vehicles/negotiations" className="relative group">
            <MessageSquare className="h-5 w-5 stroke-1" />
            {negotiationsCount > 0 && (
              <Badge 
              className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-extralight bg-foreground text-background rounded-full"
              >
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

  // Mobile navigation component with minimalist design
  const MobileNav = () => (
    <div className="flex md:hidden justify-between items-center w-full px-5 py-4">
      <Link
        to="/"
        className="text-lg font-extralight tracking-widest uppercase"
      >
        {logo || (brandName.length > 10 ? brandName.split(" ")[0] : brandName)}
      </Link>

      <div className="flex items-center gap-5">
        {isAuthenticated && (
          <Link to="/dashboard">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage
                src={user?.avatar || ""}
                alt={user?.nome || "User"}
              />
              <AvatarFallback className="text-xs font-extralight">
                {user?.nome?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}

        {showNegotiations && (
          <Link to="/vehicles/negotiations" className="relative">
            <MessageSquare className="h-5 w-5 stroke-1" />
            {negotiationsCount > 0 && (
              <Badge 
              className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-extralight bg-foreground text-background rounded-full"
              >
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
          <SheetContent side="right" className="w-[80%] max-w-[300px] p-0">
            <div className="flex flex-col h-full">
              {isAuthenticated && (
                <div className="flex items-center gap-3 p-6 border-b border-border">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.nome || "User"}
                    />
                    <AvatarFallback className="text-xs font-extralight">
                      {user?.nome?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-normal">
                      {user?.nome || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-auto">
                <div className="px-6 py-10 space-y-6">
                  {menuItems.map((item, index) =>
                    item.submenu ? (
                      <div key={index} className="space-y-8 ">
                        <p className="flex flex-row items-center text-xs font-normal uppercase tracking-wider text-muted-foreground">
                          {item.name}  <ChevronDown size={14} className="pl-1" />
                        </p>
                        <div className="space-y-4 mt-0 pl-1  border-l-zinc-900 border-l-2 ">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              className={cn(
                                "block text-xs font-extralight tracking-wider uppercase text-foreground hover:text-muted-foreground transition-colors ml-2",
                                isActive(subItem.href) && "font-normal"
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
                          "block text-sm  font-extralight tracking-wider uppercase text-foreground hover:text-muted-foreground transition-colors",
                          isActive(item.href) && "font-normal"
                        )}
                      >
                        <p className="flex flex-row items-center">  {item.name}  <ChevronRight className="text-zinc-400 pl-1" size={14}/></p>
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
                      className="block text-sm font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
                    >
                      Conta
                    </Link>
                    <Link
                      to="/vehicles/negotiations"
                      className="block text-sm font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
                    >
                      Negociações
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-extralight tracking-wider uppercase p-0 h-auto hover:bg-transparent hover:text-foreground/80"
                      onClick={handleLogout}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-sm font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/register"
                      className="block text-sm font-extralight tracking-wider uppercase hover:text-muted-foreground transition-colors"
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

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm",
        className
      )}
    >
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </nav>
  );
};

export default Navigation;
