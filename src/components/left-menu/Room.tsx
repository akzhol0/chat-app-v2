import { Link } from "react-router-dom";

type RoomProps = {
  item: any;
};

function Room({ item }: RoomProps) {
  return (
    <div className="h-[60px] flex items-center hover:bg-[#2e2e2e]">
      <span>
        <Link to={`/room/${item.id}`}>
          <strong className="ps-5 text-white cursor-pointer hover:underline">
            {item.id}
          </strong>
        </Link>
      </span>
    </div>
  );
}

export default Room;
