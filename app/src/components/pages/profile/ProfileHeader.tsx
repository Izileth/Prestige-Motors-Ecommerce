import type React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "~/src/components/ui/avatar";
import type { User } from "~/src/types/user";

interface ProfileHeaderProps {
  currentUser: User | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ currentUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-800 shadow-sm">
          <AvatarImage src={currentUser?.avatar || ""} alt={currentUser?.nome} />
          <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black text-lg">
            {currentUser?.nome?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
            Olá, {currentUser?.nome?.split(" ")[0] || "Usuário"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Bem-vindo ao seu dashboard</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
