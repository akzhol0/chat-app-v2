import { useContext, useEffect, useState } from "react";
import MyButton from "../UI/my-buttons/MyButton";
import { Link } from "react-router-dom";
import { authFirebase, db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { contextData } from "../../context/logic";
import Cookie from "universal-cookie";
const cookie = new Cookie();

function LeftMenu() {
  const { setIsAuth } = useContext(contextData);
  const [inp, setInp] = useState<string>("");
  const [rooms, setRooms] = useState<string[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [burger, setBurger] = useState<boolean>(true);

  async function getRooms() {
    const foo: string[] = [];
    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach((doc) => {
      foo.push(doc.data().room);
    });
    const uniqueArr = [...new Set(foo)];
    setRooms((prev) => [...prev, ...uniqueArr]);
    setFetched(true);
  }

  const addRoom = async () => {
    if (inp.length === 0) return;
    setRooms((prev) => [...prev, inp]);
  };

  useEffect(() => {
    !fetched && getRooms();
  }, []);

  return (
    <>
      <div
        className={
          burger
            ? "min-w-[350px] h-screen overflow-y-scroll mt-[60px] md:mt-[0] left-0 fixed md:static duration-300"
            : "min-w-[350px] h-screen overflow-y-scroll mt-[60px] md:mt-[0] left-[-350px] fixed md:static duration-300"
        }
      >
        <div className="w-full h-full flex flex-col bg-[#131313]">
          <div className="h-[80px] flex flex-col items-center bg-[#1b1b1b] text-white">
            <div className="h-[40px] flex gap-2 justify-center items-center">
              <p className="text-[#cacaca]">User email:</p>
              <span>
                {authFirebase.currentUser?.email ? (
                  <p className="max-w-[120px] overflow-hidden">
                    {authFirebase.currentUser?.email}
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </span>
              <span
                onClick={() => {
                  cookie.remove("auth-token");
                  setIsAuth(false);
                }}
              >
                <MyButton className="py-1">Exit</MyButton>
              </span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <input
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                type="text"
                placeholder="Create talk-room"
                className="h-[30px] ps-2 placeholder-[#a5a5a5] rounded-lg text-white bg-[#4d4d4d]"
              />
              <span onClick={() => addRoom()}>
                <MyButton>Create</MyButton>
              </span>
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            {rooms.length ? (
              rooms.map((item) => (
                <div
                  key={item}
                  className="h-[60px] ps-4 flex justify-start items-center text-white"
                >
                  <Link to={`/room/${item}`}>
                    Room name: <strong>{item}</strong> <br />
                    <small>Click to join</small>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-white my-2">Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => setBurger(burger ? false : true)}
        className="w-[40px] h-[30px] flex flex-col justify-between md:hidden 
      fixed text-white cursor-pointer left-3 top-4 z-20"
      >
        <span className="w-full h-[3px] bg-white"></span>
        <span className="w-full h-[3px] bg-white"></span>
        <span className="w-full h-[3px] bg-white"></span>
      </div>
    </>
  );
}

export default LeftMenu;
