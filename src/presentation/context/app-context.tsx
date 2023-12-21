import React, { createContext, ReactNode } from "react";
import { AsyncStorageClient } from "src/data/contracts/infra";

interface AppContextType {
  bookmarks: string[];
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
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);

  const addToBookmarks = async (id: string) => {
    await asyncStorageClient.set("bookmarks", [...bookmarks, id]);
    setBookmarks((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFromBookmarks = async (id: string) => {
    await asyncStorageClient.set(
      "bookmarks",
      bookmarks.filter((item) => item !== id),
    );
    setBookmarks((prev) => {
      if (!prev.includes(id)) return prev;
      return prev.filter((item) => item !== id);
    });
  };

  const contextValue: AppContextType = {
    bookmarks,
    addToBookmarks,
    removeFromBookmarks,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
