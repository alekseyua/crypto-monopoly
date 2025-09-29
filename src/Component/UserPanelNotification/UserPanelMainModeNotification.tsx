import { useEffect, useState } from "react";
import UserPanelNotification from "./UserPanelNotification";
import { moveChangedStatusToEnd } from "../../helpers/helper";
import { useStoreon } from "storeon/react";
import { v4 as uuidv4 } from "uuid";
import { IMessage } from "../../store/message/message";

type ErrorPayload = {
  type: string;
  payload: string[]; // если payload — массив сообщений
};
type StateStore = {
  messages: IMessage[];
  error: null
};
type EventMessage = {};
export interface INotice {
  id: string;
  text: {
    title: string;
    description: string;
  };
  color: string[];
  status: string;
}

const UserPanelMainModeNotification = () => {
  const { messages, error } = useStoreon<StateStore, EventMessage>("messages", "error");
  const [notice, setNotice] = useState<INotice[]>([]);

  // useEffect(() => {
  //   if (error !== null && error !== undefined) {
  //     setNotice((state: INotice) => [
  //       ...state,
  //         {
  //           id: uuidv4(),
  //           text: {
  //             title: error.type,
  //             description: error.payload[0],
  //           },
  //           color: ["#FF7EBC", "#9E87F0"],
  //           status: "unread",
  //           // redirectTo: '/where?'
  //         },
  //     ]);
  //   }
  // }, [error]);

  useEffect(() => {
    if (messages !== null && messages !== undefined && messages.length) {
      console.log({ messages });
      setNotice((state) => [
        ...[
          {
            id: uuidv4(),
            text: {
              title: messages[0]?.title ?? "notice ",
              description: messages[0]?.desc ?? "text notification",
            },
            color: ["#FF7EBC", "#9E87F0"],
            status: "unread",
            redirectTo: "/where?",
          },
        ],
        ...state,
      ]);
    }
  }, [messages]);

  const handleActionNotification = (route: string, id: string) => {
    if (route === "close") {
      return setNotice((state: INotice[]) =>
        moveChangedStatusToEnd(
          state?.map((n:INotice) => (n.id === id ? { ...n, status: "read" } : n)),
          "read"
        )
      );
    }
    setNotice((state: INotice[]) =>
      moveChangedStatusToEnd(
        state?.map((n:INotice) => (n.id === id ? { ...n, status: "read" } : n)),
        "read"
      )
    );
    alert("должны перейти в ...");
  };
  return (
    <UserPanelNotification
      notice={notice}
      handleActionNotification={handleActionNotification}
    />
  );
};

export default UserPanelMainModeNotification;
