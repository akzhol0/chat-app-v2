type MessageProps = {
  item: any;
};

function Message({ item }: MessageProps) {
  const calendar = [
    {
      day: 1,
      text: "January",
    },
    {
      day: 2,
      text: "February",
    },
    {
      day: 3,
      text: "March",
    },
    {
      day: 4,
      text: "April",
    },
    {
      day: 5,
      text: "May",
    },
    {
      day: 6,
      text: "June",
    },
    {
      day: 7,
      text: "July",
    },
    {
      day: 8,
      text: "August",
    },
    {
      day: 9,
      text: "September",
    },
    {
      day: 10,
      text: "October",
    },
    {
      day: 11,
      text: "November",
    },
    {
      day: 12,
      text: "December",
    },
  ];
  let month = "";
  let time: any;

  if (item.addedTime !== null) {
    time = new Date(item.addedTime.seconds * 1000);
    calendar.map((item) => {
      if (Number(time.getMonth() + 1) === item.day) {
        month = item.text;
      }
    });
  }

  return (
    <span className="flex">
      <span className="flex flex-col mx-3 py-1 px-4 rounded-lg bg-[#fff]">
        <span className="flex gap-1 text-sm">
          <p className="text-sm font-semibold">{item.user}:</p> |
          <p>
            {String(time?.getFullYear())} {String(time?.getDate())} {month}{" "}
            {time?.getHours()}:{time?.getMinutes()}
          </p>
        </span>
        <p className="text-md md:text-xl">{item.text}</p>
      </span>
    </span>
  );
}

export default Message;
