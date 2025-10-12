
import type { MenuItem } from './types';

export const defaultMenuItems: MenuItem[] = [
  { name: 'Início', href: '/' },
  { name: 'Exclusivos', href: '/destacts' },
  {
    name: 'Seções',
    href: '#',
    submenu: [
      { name: 'Quem Somos', href: '/about' },
      { name: 'Nossa Missão', href: '/history' },
    ],
  },
  { name: 'Catálogo', href: '/vehicles' },
  { name: 'Meus Veículos', href: '/vehicles/user', requiresAuth: true },
  { name: 'Vendas & Negócios', href: '/sale/dashboard', requiresAuth: true },
  { name: 'Conversas', href: '/vehicles/negotiations', requiresAuth: true },
];
