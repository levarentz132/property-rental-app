import { faker } from "@faker-js/faker";
import { uniq } from "ramda";
import type { MutableRefObject, ReactNode } from "react";
import React, { createContext, useMemo, useRef, useState } from "react";
import type { AsyncStorageClient } from "src/data/contracts/infra";
import type { Message, MessageAtom, UserData } from "src/domain/models";

const makeAtoms = (): MessageAtom[] => {
  const random = faker.number.int({ min: 1, max: 10 });
  const atoms: MessageAtom[] = [];
  for (let i = 0; i < random; i += 1) {
    atoms.push({
      from: faker.datatype.boolean() ? "incoming" : "outgoing",
      message: faker.lorem.sentence(),
      date: faker.date.recent(),
    });
  }
  return atoms;
};

const makeFakeMessages = (): Message[] => {
  const random = faker.number.int({ min: 1, max: 10 });
  const messages: Message[] = [];
  for (let i = 0; i < random; i += 1) {
    messages.push({
      id: (i + 1).toString(),
      isOnline: faker.datatype.boolean(),
      from: faker.person.firstName(),
      image: faker.image.avatar(),
      atoms: makeAtoms(),
    });
  }
  return messages;
};

interface AppContextType {
  user: UserData | undefined;
  messages: {
    list: Message[];
  };
  addUser: (user: UserData) => Promise<void>;
  removeUser: () => Promise<void>;
  addToBookmarks: (id: string) => Promise<void>;
  removeFromBookmarks: (id: string) => Promise<void>;
  system: {
    bottomTabs: {
      activeBottomTabs: MutableRefObject<(() => void) | undefined>;
      inactiveBottomTabs: MutableRefObject<(() => void) | undefined>;
      handleAddRefToActivate: (fn: () => void) => void;
      handleAddRefToInactive: (fn: () => void) => void;
    };
  };
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
  const [user, setUser] = useState<UserData>();
  const [messages] = useState<Message[]>(makeFakeMessages());
  const activeBottomTabs = useRef<() => void>();
  const inactiveBottomTabs = useRef<() => void>();

  const handleAddRefToActivate = (fn: () => void) => {
    activeBottomTabs.current = fn;
  };

  const handleAddRefToInactive = (fn: () => void) => {
    inactiveBottomTabs.current = fn;
  };

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
      messages: {
        list: messages,
      },
      system: {
        bottomTabs: {
          activeBottomTabs,
          inactiveBottomTabs,
          handleAddRefToActivate,
          handleAddRefToInactive,
        },
      },
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
