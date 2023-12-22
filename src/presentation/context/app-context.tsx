import { uniq } from "ramda";
import type { ReactNode } from "react";
import React, { createContext, useMemo } from "react";
import type { AsyncStorageClient } from "src/data/contracts/infra";
import type { UserData } from "src/domain/models";

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

  React.useEffect(() => {
    const getUser = async () => {
      const userData = await asyncStorageClient.get<UserData>("user");
      setUser(userData);
    };
    getUser();
  }, []);

  const addToBookmarks = async (id: string) => {
    const userData = await asyncStorageClient.get<UserData>("user");
    if (userData) {
      const newUserData = {
        ...userData,
        bookmarks: uniq(
          userData?.bookmarks ? [...userData.bookmarks, id] : [id],
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

  const addUser = async (newUser: UserData) => {
    await asyncStorageClient.set("user", newUser);
    setUser(newUser);
  };

  const removeUser = async () => {
    await asyncStorageClient.remove("user");
    setUser(undefined);
  };

  const contextValue: AppContextType = useMemo(
    () => ({
      user,
      addUser,
      removeUser,
      addToBookmarks,
      removeFromBookmarks,
    }),
    [user],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
