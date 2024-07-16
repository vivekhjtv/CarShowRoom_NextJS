'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
// Define the User interface
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Define the context value type
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Create the UserContext with undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: React.ReactNode;
}

// Create the UserContextProvider component
export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    email: '',
    role: '',
  });
  const { data: session } = useSession();
  const nextAuthUser = session?.user;
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);
  useEffect(() => {
    if (nextAuthUser) {
      console.log(nextAuthUser);
      const user = {
        username: nextAuthUser.name,
        email: nextAuthUser.email,
        role: 'user', // Default role
      };
      setUser(user as User);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [nextAuthUser]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export default UserContext;
