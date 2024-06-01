import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MyButton from "../UI/my-buttons/MyButton";
import Message from "./Message";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { authFirebase, db } from "../../firebase/config";
import { contextData } from "../../context/logic";

function Chat() {
  const { roomTitle } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useContext(contextData);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    !isAuth && navigate("/login");
  });

  const messagesRef = collection(db, "messages");
  useEffect(() => {
    setChatMessages([]);

    const queryMes = query(
      messagesRef,
      where("room", "==", roomTitle),
      orderBy("addedTime")
    );
    const unsuscribe = onSnapshot(queryMes, (snap) => {
      let messages: { id: string }[] = [];
      snap.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setChatMessages(messages);
    });

    return () => unsuscribe();
  }, [roomTitle]);

  const addChatInfo = async () => {
    addDoc(messagesRef, {
      text: input,
      addedTime: serverTimestamp(),
      user: authFirebase.currentUser?.email,
      room: roomTitle,
    });
  };

  return (
    <div className="w-full h-full">
      <div className="fixed top-0 w-full h-[60px] flex bg-[#222222] justify-start items-center">
        <h1 className="ps-[65px] md:ps-4 text-white text-xl">{roomTitle}</h1>
      </div>
      <div className="w-full flex flex-col gap-2 max-h-[800px] mt-[70px] overflow-y-scroll">
        {chatMessages.length ? (
          chatMessages.map((item: any) => <Message key={item.id} item={item} />)
        ) : (
          <p className="py-2 text-center text-white">Loading...</p>
        )}
      </div>
      <div className="fixed bottom-0 w-full h-[80px] flex bg-[#222222] justify-start items-center">
        <div className="flex gap-3">
          <input
            className="ms-2 w-[200px] md:w-[300px] lg:w-[550px] xl:w-[800px] h-[50px] text-white rounded-lg ps-3 bg-[#2b2b2b]"
            type="text"
            placeholder="Write here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span
            onClick={() => {
              addChatInfo();
              setInput("");
            }}
            className="flex"
          >
            <MyButton className="px-[20px] md:px-[30px] bg-[#2c4494]">
              Send
            </MyButton>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chat;
