export interface MessageAtom {
  from: "incoming" | "outgoing";
  message: string;
  date: Date;
}

export interface Message {
  id: string;
  from: string;
  image: string;
  isOnline?: boolean;
  atoms: MessageAtom[];
}
