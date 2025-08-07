import React, { useState, useMemo, memo, useCallback } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '~/src/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/src/components/ui/popover';
import { Button } from '~/src/components/ui/button';
import { Badge } from '~/src/components/ui/badge';
import { Check, ChevronsUpDown, User, Search, Loader2, Car, Mail, Phone, Shield, Crown, AlertCircle } from 'lucide-react';
import { cn } from '~/src/lib/cn';
import useUsersStore from '~/src/store/slices/users';

import type { User as UserType } from '~/src/types/users';

interface UserSelectorProps {
    selectedUser: string;
    onSelectUser: (userId: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    showAvatar?: boolean;
    showEmail?: boolean;
    showRole?: boolean;
    showStats?: boolean;
    maxHeight?: string;
    size?: 'sm' | 'md' | 'lg';
}

const UserSelector: React.FC<UserSelectorProps> = memo(({
    selectedUser,
    onSelectUser,
    placeholder = "Selecione um usuário...",
    disabled = false,
    className,
    showAvatar = true,
    showEmail = true,
    showRole = true,
    showStats = true,
    maxHeight = '320px',
    size = 'md'
}) => {
    const [open, setOpen] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const {
        users,
        isLoading,
        error,
        fetchUsers,
    } = useUsersStore();

    // Utility functions
    const getRoleLabel = useCallback((role: string) => {
        const roleMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline', icon: any }> = {
            'ADMIN': { label: 'Admin', variant: 'destructive', icon: Shield },
            'MODERATOR': { label: 'Moderador', variant: 'default', icon: Crown },
            'USER': { label: 'Usuário', variant: 'secondary', icon: User },
            'SELLER': { label: 'Vendedor', variant: 'outline', icon: Car },
        };
        return roleMap[role] || { label: role, variant: 'outline' as const, icon: User };
    }, []);

    const formatStats = useCallback((count: number, type: string) => {
        if (count === 0) return `Nenhum ${type}`;
        if (count === 1) return `1 ${type}`;
        return `${count} ${type}s`;
    }, []);

    // Size variants
    const sizeClasses = {
        sm: {
            button: "h-8 px-2 text-sm",
            avatar: "w-4 h-4",
            popover: "w-[360px]",
            item: "p-2",
            itemAvatar: "w-6 h-6",
        },
        md: {
            button: "h-10 px-3",
            avatar: "w-5 h-5",
            popover: "w-[420px]",
            item: "p-3",
            itemAvatar: "w-8 h-8",
        },
        lg: {
            button: "h-12 px-4",
            avatar: "w-6 h-6",
            popover: "w-[480px]",
            item: "p-4",
            itemAvatar: "w-10 h-10",
        }
    };

    const currentSize = sizeClasses[size];

    // Handle popover state
    const handleOpenChange = useCallback((isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen && users.length === 0 && !isLoading && !error) {
            fetchUsers();
        }
        if (!isOpen) {
            setLocalSearchTerm('');
        }
    }, [users.length, isLoading, error, fetchUsers]);

    // Filter users
    const filteredUsers = useMemo(() => {
        if (!Array.isArray(users)) return [];
        
        if (!localSearchTerm.trim()) return users;
        
        const term = localSearchTerm.toLowerCase().trim();
        return users.filter(user =>
            user.nome?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.telefone?.includes(term)
        );
    }, [users, localSearchTerm]);

    // Group users by role for better organization
    const groupedUsers = useMemo(() => {
        const groups: Record<string, UserType[]> = {};
        filteredUsers.forEach(user => {
            const role = user.role || 'USER';
            if (!groups[role]) groups[role] = [];
            groups[role].push(user);
        });
        
        // Sort groups by priority
        const sortOrder = ['ADMIN', 'MODERATOR', 'SELLER', 'USER'];
        return sortOrder
            .filter(role => groups[role]?.length > 0)
            .map(role => ({
                role,
                users: groups[role].sort((a, b) => a.nome.localeCompare(b.nome)),
                ...getRoleLabel(role)
            }));
    }, [filteredUsers, getRoleLabel]);

    // Selected user data
    const selectedUserData = useMemo(() => {
        if (!selectedUser || !Array.isArray(users)) return null;
        return users.find(user => user.id === selectedUser) || null;
    }, [selectedUser, users]);

    // Button content
    const buttonContent = useMemo(() => {
        if (isLoading) {
            return (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                    <span>Carregando...</span>
                </div>
            );
        }

        if (selectedUserData) {
            const roleInfo = getRoleLabel(selectedUserData.role || 'USER');
            return (
                <div className="flex items-center gap-3 min-w-0 flex-1 py-1">
                    {showAvatar && (
                        <div className="relative shrink-0">
                            {selectedUserData.avatar ? (
                                <img
                                    src={selectedUserData.avatar}
                                    alt={selectedUserData.nome}
                                    className={cn(
                                        "rounded-full object-cover ring-2 ring-background shadow-sm",
                                        currentSize.avatar
                                    )}
                                    loading="lazy"
                                />
                            ) : (
                                <div className={cn(
                                    "rounded-full bg-zinc-950 text-zinc-50 flex items-center justify-center ring-4 ring-background shadow-sm",
                                    currentSize.avatar
                                )}>
                                    {selectedUserData.nome ? selectedUserData.nome.charAt(0) : "U"}
                                </div>
                            )}
                            
                            {/* Status indicator */}
                            {selectedUserData.isOnline && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-background shadow-sm"></div>
                            )}
                        </div>
                    )}
                    
                    <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                            <span className="truncate font-semibold text-sm text-foreground">
                                {selectedUserData.nome}
                            </span>
                            {showRole && (
                                <Badge 
                                    variant={roleInfo.variant} 
                                    className={cn(
                                        "text-[9px] px-1.5 py-0.5 h-auto shrink-0 font-medium",
                                        "shadow-sm border-0",
                                        roleInfo.variant === 'destructive' && "bg-red-500/10 text-red-700 dark:text-red-400",
                                        roleInfo.variant === 'default' && "bg-blue-500/10 text-blue-700 dark:text-blue-400",
                                        roleInfo.variant === 'secondary' && "bg-muted/80 text-muted-foreground",
                                        roleInfo.variant === 'outline' && "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
                                    )}
                                >
                                    <roleInfo.icon size={8} className="mr-0.5" />
                                    {roleInfo.label}
                                </Badge>
                            )}
                        </div>
                        
                        {showEmail && selectedUserData.email && size !== 'sm' && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Mail size={10} className="shrink-0 opacity-60" />
                                <span className="truncate font-medium">
                                    {selectedUserData.email}
                                </span>
                            </div>
                        )}
                        
                        {/* Informações adicionais baseadas no tamanho */}
                        {size === 'lg' && selectedUserData.telefone && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Phone size={10} className="shrink-0 opacity-60" />
                                <span className="font-medium">{selectedUserData.telefone}</span>
                            </div>
                        )}
                        
                        {size === 'lg' && showStats && selectedUserData._count?.vehicles !== undefined && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Car size={10} className="shrink-0 opacity-60" />
                                <span className="font-medium">
                                    {formatStats(selectedUserData._count.vehicles, 'veículo')}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Indicador visual de que há mais informações */}
                    <div className="shrink-0 flex flex-col items-center justify-center text-muted-foreground/40">
                        <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
                        <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
                        <div className="w-1 h-1 rounded-full bg-current"></div>
                    </div>
                </div>
            );
        }
        
        return <span className="text-muted-foreground">{placeholder}</span>;
    }, [isLoading, selectedUserData, placeholder, showAvatar, showRole, showEmail, getRoleLabel, currentSize, size]);

    // Handlers
    const handleSelectUser = useCallback((userId: string) => {
        onSelectUser(userId);
        setOpen(false);
        setLocalSearchTerm('');
    }, [onSelectUser]);

    const handleSearchChange = useCallback((value: string) => {
        setLocalSearchTerm(value);
    }, []);

    // Render user item
    const renderUserItem = useCallback((user: UserType) => {
        const roleInfo = getRoleLabel(user.role || 'USER');
        
        return (
            <CommandItem
                key={user.id}
                value={user.id}
                onSelect={() => handleSelectUser(user.id)}
                className={cn("flex items-center gap-3 cursor-pointer hover:bg-accent/50", currentSize.item)}
            >
                <Check
                    className={cn(
                        "h-4 w-4 shrink-0",
                        selectedUser === user.id ? "opacity-100" : "opacity-0"
                    )}
                />
                
                {/* Avatar */}
                <div className="relative shrink-0">
                    {showAvatar && user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.nome}
                            className={cn("rounded-full object-cover", currentSize.itemAvatar)}
                            loading="lazy"
                        />
                    ) : (
                        <div className={cn(
                            "rounded-full bg-zinc-950 text-zinc-50 flex items-center justify-center",
                            currentSize.itemAvatar
                        )}>
                                {user?.nome ? user.nome.charAt(0) : "U"}
                        </div>
                    )}
                    
                    {/* Online status indicator (if available) */}
                    {user.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                </div>
                
                {/* User info */}
                <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{user.nome}</p>
                        {showRole && (
                            <Badge variant={roleInfo.variant} className="text-[10px] px-1.5 py-0 h-auto">
                                <roleInfo.icon size={8} className="mr-1" />
                                {roleInfo.label}
                            </Badge>
                        )}
                    </div>
                    
                    {showEmail && user.email && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail size={10} />
                            <span className="truncate">{user.email}</span>
                        </div>
                    )}
                    
                    {user.telefone && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone size={10} />
                            <span>{user.telefone}</span>
                        </div>
                    )}
                </div>
                
                {/* Stats */}
                {showStats && (
                    <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                        {user._count?.vehicles !== undefined && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Car size={10} />
                                <span>{user._count.vehicles}</span>
                            </div>
                        )}
                        {user.lastLoginAt && (
                            <span className="text-[10px] text-muted-foreground">
                                {new Date(user.lastLoginAt).toLocaleDateString('pt-BR')}
                            </span>
                        )}
                    </div>
                )}
            </CommandItem>
        );
    }, [selectedUser, handleSelectUser, showAvatar, showRole, showEmail, showStats, getRoleLabel, currentSize]);

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between text-left group",
                        currentSize.button,
                        !selectedUserData && "text-muted-foreground",
                        selectedUserData && "bg-accent/30 border-accent hover:bg-accent/50",
                        "transition-all duration-200",
                        className
                    )}
                    disabled={disabled}
                >
                    {buttonContent}
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className={cn(currentSize.popover, "p-0")} align="start">
                <Command shouldFilter={false}>
                    {/* Search header */}
                    <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandInput
                            placeholder="Buscar por nome, email ou telefone..."
                            value={localSearchTerm}
                            onValueChange={handleSearchChange}
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
                        />
                        {localSearchTerm && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLocalSearchTerm('')}
                                className="h-auto p-1 text-muted-foreground hover:text-foreground"
                            >
                                ×
                            </Button>
                        )}
                    </div>

                    <CommandList 
                        style={{ maxHeight }}
                        className={cn(
                            // Scrollbar customizada
                            "[&::-webkit-scrollbar]:w-1.5",
                            "[&::-webkit-scrollbar-track]:bg-transparent",
                            "[&::-webkit-scrollbar-thumb]:bg-border/60",
                            "[&::-webkit-scrollbar-thumb]:rounded-full",
                            "[&::-webkit-scrollbar-thumb]:transition-all",
                            "[&::-webkit-scrollbar-thumb]:duration-200",
                            
                            // Hover effects
                            "hover:[&::-webkit-scrollbar-thumb]:bg-border",
                            "hover:[&::-webkit-scrollbar]:w-2",
                            
                            // Firefox support
                            "scrollbar-thin",
                            "scrollbar-track-transparent", 
                            "scrollbar-thumb-border/60",
                            
                            // Smooth scrolling
                            "scroll-smooth"
                        )}
                    >
                        {/* Error state */}
                        {error && (
                            <div className="p-4 m-2 text-sm text-destructive border border-destructive/20 bg-destructive/5 rounded-md">
                                <div className="flex items-center gap-2 font-medium mb-1">
                                    <AlertCircle size={14} />
                                    Erro ao carregar usuários
                                </div>
                                <p className="text-xs">{error}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fetchUsers()}
                                    className="mt-2 h-8"
                                >
                                    Tentar novamente
                                </Button>
                            </div>
                        )}

                        {/* Loading state */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-8">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Carregando usuários...</p>
                                        <p className="text-xs text-muted-foreground">Aguarde um momento</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty states */}
                        {!isLoading && !error && filteredUsers.length === 0 && !localSearchTerm && (
                            <CommandEmpty>
                                <div className="py-8 text-center">
                                    <User className="mx-auto h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                                    <p className="text-sm font-medium">Nenhum usuário encontrado</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Tente recarregar ou contate o suporte
                                    </p>
                                </div>
                            </CommandEmpty>
                        )}

                        {!isLoading && !error && filteredUsers.length === 0 && localSearchTerm && (
                            <CommandEmpty>
                                <div className="py-8 text-center">
                                    <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                                    <p className="text-sm font-medium">Nenhum resultado encontrado</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Tente buscar por um termo diferente
                                    </p>
                                </div>
                            </CommandEmpty>
                        )}

                        {/* User groups */}
                        {!isLoading && !error && groupedUsers.length > 0 && (
                            <>
                                {/* Results summary */}
                                <div className="px-3 py-2 text-xs text-muted-foreground bg-muted/30 border-b">
                                    <span className="font-medium">
                                        {filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''} 
                                        {localSearchTerm && ` encontrado${filteredUsers.length !== 1 ? 's' : ''}`}
                                    </span>
                                    {localSearchTerm && (
                                        <span className="ml-1">para "{localSearchTerm}"</span>
                                    )}
                                </div>

                                {groupedUsers.map(group => (
                                    <CommandGroup key={group.role}>
                                        <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted/20 flex items-center gap-2">
                                            <group.icon size={12} />
                                            {group.label} ({group.users.length})
                                        </div>
                                        <div className={cn(
                                            "max-h-[200px] overflow-y-auto",
                                            // Scrollbar para cada grupo
                                            "[&::-webkit-scrollbar]:w-1",
                                            "[&::-webkit-scrollbar-track]:bg-transparent",
                                            "[&::-webkit-scrollbar-thumb]:bg-border/50",
                                            "[&::-webkit-scrollbar-thumb]:rounded-full",
                                            "[&::-webkit-scrollbar-thumb:hover]:bg-border/80",
                                            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/50"
                                        )}>
                                            {group.users.map(renderUserItem)}
                                        </div>
                                    </CommandGroup>
                                ))}
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

UserSelector.displayName = 'UserSelector';

export default UserSelector;