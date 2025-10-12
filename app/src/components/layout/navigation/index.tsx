
import { useState, useEffect } from 'react';
import { cn } from '~/src/lib/cn';
import type { NavigationProps } from './types';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

const Navigation: React.FC<NavigationProps> = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm',
        props.className
      )}
    >
      {isMobile ? <MobileNav {...props} /> : <DesktopNav {...props} />}
    </nav>
  );
};

export default Navigation;
