import React, { useState, useMemo, memo } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '~/src/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/src/components/ui/popover';
import { Button } from '~/src/components/ui/button';
import { Check, ChevronsUpDown, User } from 'lucide-react';
import { cn } from '~/src/lib/cn';
import useUserStore from '~/src/hooks/useUser';
import type { User as UserType } from '~/src/types/user';

interface UserSelectorProps {
    role?: 'buyer' | 'seller';
    selectedUser: string;
    onSelectUser: (userId: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = memo(({ 
    role = 'buyer', 
    selectedUser, 
    onSelectUser 
    }) => {
    const [open, setOpen] = useState(false);
    const { currentUser } = useUserStore();

    // Memoize users array to prevent unnecessary recalculations
    const users = useMemo(() => 
        currentUser ? [currentUser] : []
    , [currentUser]);

    // Memoize selected user name
    const selectedUserName = useMemo(() => {
        if (!selectedUser) return null;
        return users.find((user) => user.id === selectedUser)?.nome;
    }, [selectedUser, users]);

    // Memoize button content to avoid unnecessary re-renders
    const buttonContent = useMemo(() => {
        if (selectedUserName) return selectedUserName;
        if (currentUser) return currentUser.nome;
        return `Selecione um ${role === 'buyer' ? 'comprador' : 'vendedor'}...`;
    }, [selectedUserName, currentUser, role]);

    // Memoize the command items to prevent unnecessary re-renders
    const commandItems = useMemo(() => (
        users.map((user) => (
        <CommandItem
            key={user.id}
            value={user.id}
            onSelect={() => {
            onSelectUser(user.id);
            setOpen(false);
            }}
        >
            <Check
            className={cn(
                "mr-2 h-4 w-4",
                selectedUser === user.id ? "opacity-100" : "opacity-0"
            )}
            />
            <div className="flex items-center gap-2">
            {user.avatar && (
                <img 
                src={user.avatar} 
                alt={user.nome} 
                className="w-8 h-8 rounded-full"
                loading="lazy" // Otimização para carregamento de imagem
                />
            )}
            <div>
                <p>{user.nome}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            </div>
        </CommandItem>
        ))
    ), [users, selectedUser, onSelectUser]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={!currentUser}
            >
            {buttonContent}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[400px] p-0">
            <Command>
            <CommandList>
                {users.length === 0 ? (
                <CommandEmpty>Nenhum usuário disponível</CommandEmpty>
                ) : (
                <CommandGroup>
                    {commandItems}
                </CommandGroup>
                )}
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
    );
});

UserSelector.displayName = 'UserSelector'; // Para facilitar debugging

export default UserSelector;