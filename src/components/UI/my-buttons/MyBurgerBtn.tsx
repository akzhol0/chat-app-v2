type MyBurgerBtnProps = {
  setBurger: (arg0: boolean) => void;
  burger: boolean;
};

function MyBurgerBtn({ setBurger, burger }: MyBurgerBtnProps) {
  return (
    <div
      onClick={() => setBurger(burger ? false : true)}
      className="w-[40px] h-[30px] flex flex-col justify-between md:hidden 
      fixed text-white cursor-pointer left-3 top-4 z-20"
    >
      {burger ? (
        <>
          <span className="w-full h-[15px] rotate-45 mt-[14px] bg-white duration-300"></span>
          <span className="w-full h-[15px] -rotate-45 mb-[14px] bg-white duration-300"></span>
        </>
      ) : (
        <>
          <span className="w-full h-[3px] bg-white duration-300"></span>
          <span className="w-full h-[3px] bg-white duration-300"></span>
          <span className="w-full h-[3px] bg-white duration-300"></span>
        </>
      )}
    </div>
  );
}

export default MyBurgerBtn;
