import { useEffect, useState } from "react";

// types
import { SelectedPage } from "@/shared/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

export const Chat = ({setSelectedPage }: Props) => {
  useEffect(() => {
    setSelectedPage(SelectedPage.Chat)
  }, []);

  return (
    <section id="chat" className="py-3 px-3 md:h-full md:pb-0">
        chat
    </section>
  );
}

export default Chat;
