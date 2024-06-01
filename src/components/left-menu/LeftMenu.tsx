import { useContext, useEffect, useState } from "react";
import MyButton from "../UI/my-buttons/MyButton";
import { Link } from "react-router-dom";
import { authFirebase, db } from "../../firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { contextData } from "../../context/logic";
import Cookie from "universal-cookie";
import MyBurgerBtn from "../UI/my-buttons/MyBurgerBtn";
const cookie = new Cookie();

function LeftMenu() {
  const { setIsAuth } = useContext(contextData);
  const [inp, setInp] = useState<string>("");
  const [rooms, setRooms] = useState<string[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [burger, setBurger] = useState<boolean>(true);

  async function getRooms() {
    const foo: string[] = [];
    const roomsRef = collection(db, "messages");
    const queryMes = query(roomsRef, orderBy("addedTime"));
    const querySnapshot = await getDocs(queryMes);
    querySnapshot.forEach((doc) => {
      foo.push(doc.data().room);
    });
    const uniqueArr = [...new Set(foo)];
    setRooms((prev) => [...prev, ...uniqueArr]);
    setFetched(true);
  }

  const addRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInp("");

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
            ? "w-[350px] h-screen overflow-y-scroll mt-[60px] md:mt-[0] left-0 fixed md:static duration-300"
            : "w-[350px] h-screen overflow-y-scroll mt-[60px] md:mt-[0] left-[-350px] fixed md:static duration-300"
        }
      >
        <div className="w-full h-full flex flex-col bg-[#131313]">
          <div className="w-full h-[80px] flex flex-col items-between bg-[#1b1b1b] text-white">
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
            <form
              onSubmit={addRoom}
              className="flex justify-center items-center gap-1"
            >
              <input
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                type="text"
                placeholder="Create talk-room"
                className="h-[30px] ps-2 placeholder-[#a5a5a5] rounded-lg text-white bg-[#4d4d4d]"
              />
              <span>
                <MyButton type="submit">Create</MyButton>
              </span>
            </form>
          </div>
          <div className="w-full h-full flex flex-col">
            {rooms.length ? (
              rooms.map((item) => (
                <div
                  key={item}
                  className="h-[60px] ps-4 flex justify-start items-center text-white"
                >
                  <span onClick={() => setBurger(false)}>
                    <Link to={`/room/${item}`}>
                      Room name: <strong>{item}</strong> <br />
                      <small>Click to join</small>
                    </Link>
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-white my-2">Loading...</p>
            )}
          </div>
        </div>
      </div>
      <MyBurgerBtn burger={burger} setBurger={setBurger} />
    </>
  );
}

export default LeftMenu;
