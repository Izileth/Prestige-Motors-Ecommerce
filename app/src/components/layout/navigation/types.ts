// app/src/components/layout/navigation/types.ts
import React from 'react';

export interface MenuItem {
  name: string;
  href: string;
  submenu?: MenuItem[];
  requiresAuth?: boolean;
}

export interface NavigationProps {
  brandName?: string;
  customMenuItems?: MenuItem[];
  cartItemCount?: number;
  negotiationCount?: number;
  showNegotiations?: boolean;
  showCart?: boolean;
  logo?: React.ReactNode;
  className?: string;
}
