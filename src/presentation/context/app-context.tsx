import { uniq } from "ramda";
import React, { createContext, ReactNode } from "react";
import { AsyncStorageClient } from "src/data/contracts/infra";

interface UserData {
  realName: string;
  username: string;
  bookmarks: string[];
}

interface AppContextType {
  user: UserData | undefined;
  addUser: (user: UserData) => Promise<void>;
  removeUser: () => Promise<void>;
  addToBookmarks: (id: string) => Promise<void>;
  removeFromBookmarks: (id: string) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  asyncStorageClient: AsyncStorageClient;
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  asyncStorageClient,
}) => {
  const [user, setUser] = React.useState<UserData>();

  const addToBookmarks = async (id: string) => {
    const userData = await asyncStorageClient.get<UserData>("user");
    if (userData) {
      const newUserData = {
        ...userData,
        bookmarks: uniq(
          userData?.bookmarks ? [...userData?.bookmarks, id] : [id],
        ),
      };
      await asyncStorageClient.set("user", newUserData);
      setUser(newUserData);
    }
  };

  const removeFromBookmarks = async (id: string) => {
    const userData = await asyncStorageClient.get<UserData>("user");
    if (userData) {
      const newUserData = {
        ...userData,
        bookmarks: userData?.bookmarks?.filter((item) => item !== id),
      };
      await asyncStorageClient.set("user", newUserData);
      setUser(newUserData);
    }
  };

  const addUser = async (user: UserData) => {
    await asyncStorageClient.set("user", user);
    setUser(user);
  };

  const removeUser = async () => {
    await asyncStorageClient.remove("user");
    setUser(undefined);
  };

  const contextValue: AppContextType = {
    user,
    addUser,
    removeUser,
    addToBookmarks,
    removeFromBookmarks,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
