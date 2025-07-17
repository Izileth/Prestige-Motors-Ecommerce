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
import { Check, ChevronsUpDown, User, Search, Loader2 } from 'lucide-react';
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
    maxHeight?: string;
}

const UserSelector: React.FC<UserSelectorProps> = memo(({
  selectedUser,
  onSelectUser,
  placeholder = "Selecione um usuário...",
  disabled = false,
  className,
  showAvatar = true,
  showEmail = true,
  showRole = false,
  maxHeight = '300px'
}) => {
  const [open, setOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // Usar o store diretamente sem o hook customizado para evitar loops
  const {
    users,
    isLoading,
    error,
    fetchUsers,
  } = useUsersStore();

  // Buscar usuários apenas quando o popover abre e não há usuários
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && users.length === 0 && !isLoading) {
      fetchUsers();
    }
    if (!isOpen) {
      setLocalSearchTerm(''); // Limpar busca ao fechar
    }
  }, [users.length, isLoading, fetchUsers]);

  // Filtrar usuários localmente
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    
    if (!localSearchTerm.trim()) return users;
    
    const term = localSearchTerm.toLowerCase().trim();
    return users.filter(user =>
      user.nome?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  }, [users, localSearchTerm]);

  // Encontrar usuário selecionado
  const selectedUserData = useMemo(() => {
    if (!selectedUser || !Array.isArray(users)) return null;
    return users.find(user => user.id === selectedUser) || null;
  }, [selectedUser, users]);

  // Conteúdo do botão
  const buttonContent = useMemo(() => {
    if (selectedUserData) {
      return (
        <div className="flex items-center gap-2 min-w-0">
          {showAvatar && selectedUserData.avatar && (
            <img
              src={selectedUserData.avatar}
              alt={selectedUserData.nome}
              className="w-5 h-5 rounded-full shrink-0"
              loading="lazy"
            />
          )}
          <span className="truncate font-medium">{selectedUserData.nome}</span>
          {showRole && selectedUserData.role && (
            <Badge variant="secondary" className="text-xs shrink-0">
              {selectedUserData.role === 'USER' ? 'Usuário' : selectedUserData.role}
            </Badge>
          )}
        </div>
      );
    }
    
    return (
      <span className="text-muted-foreground">
        {placeholder}
      </span>
    );
  }, [selectedUserData, placeholder, showAvatar, showRole]);

  // Callback para seleção de usuário
  const handleSelectUser = useCallback((userId: string) => {
    onSelectUser(userId);
    setOpen(false);
    setLocalSearchTerm('');
  }, [onSelectUser]);

  // Callback para mudança na busca local
  const handleSearchChange = useCallback((value: string) => {
    setLocalSearchTerm(value);
  }, []);

  // Renderizar item de usuário
  const renderUserItem = useCallback((user: UserType) => (
    <CommandItem
      key={user.id}
      value={user.id}
      onSelect={() => handleSelectUser(user.id)}
      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent"
    >
      <Check
        className={cn(
          "h-4 w-4 shrink-0",
          selectedUser === user.id ? "opacity-100" : "opacity-0"
        )}
      />
      
      {showAvatar && user.avatar && (
        <img
          src={user.avatar}
          alt={user.nome}
          className="w-8 h-8 rounded-full shrink-0"
          loading="lazy"
        />
      )}
      
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{user.nome}</p>
        {showEmail && (
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        )}
        {user.telefone && (
          <p className="text-xs text-muted-foreground truncate">{user.telefone}</p>
        )}
      </div>
      
      <div className="flex flex-col items-end gap-1 shrink-0">
        {showRole && user.role && (
          <Badge variant="outline" className="text-xs">
            {user.role === 'USER' ? 'Usuário' : user.role}
          </Badge>
        )}
        {user._count?.vehicles !== undefined && (
          <span className="text-xs text-muted-foreground">
            {user._count.vehicles} veículo{user._count.vehicles !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </CommandItem>
  ), [selectedUser, handleSelectUser, showAvatar, showEmail, showRole]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-10 px-3 py-2",
            !selectedUserData && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                <span>Carregando usuários...</span>
              </>
            ) : (
              buttonContent
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[450px] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Buscar por nome ou email..."
              value={localSearchTerm}
              onValueChange={handleSearchChange}
              className="flex-1"
            />
          </div>

          <CommandList style={{ maxHeight }}>
            {error && (
              <div className="p-4 text-sm text-destructive border-l-2 border-destructive bg-destructive/10">
                <p className="font-medium">Erro ao carregar usuários</p>
                <p>{error}</p>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <p className="text-sm text-muted-foreground">Carregando usuários...</p>
                </div>
              </div>
            )}

            {!isLoading && !error && filteredUsers.length === 0 && !localSearchTerm && (
              <CommandEmpty>
                <div className="py-8 text-center">
                  <User className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">Nenhum usuário encontrado</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tente recarregar a página ou contate o suporte
                  </p>
                </div>
              </CommandEmpty>
            )}

            {!isLoading && !error && filteredUsers.length === 0 && localSearchTerm && (
              <CommandEmpty>
                <div className="py-8 text-center">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">Nenhum usuário encontrado</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tente buscar por um nome ou email diferente
                  </p>
                </div>
              </CommandEmpty>
            )}

            {!isLoading && !error && filteredUsers.length > 0 && (
              <CommandGroup>
                <div className="px-3 py-2 text-xs text-muted-foreground bg-muted/50">
                  <span className="font-medium">
                    {filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''} 
                    {localSearchTerm && ` encontrado${filteredUsers.length !== 1 ? 's' : ''}`}
                  </span>
                  {localSearchTerm && (
                    <span className="ml-1">para "{localSearchTerm}"</span>
                  )}
                </div>
                <div className="max-h-[250px] overflow-y-auto">
                  {filteredUsers.map(renderUserItem)}
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

UserSelector.displayName = 'UserSelector';

export default UserSelector;