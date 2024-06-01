type MyButtonProps = {
  children?: React.ReactNode;
  className?: string;
  type?: string;
};

function MyButton({ children, className, type }: MyButtonProps) {
  return (
    <button
      type={type ? "submit" : "button"}
      className={
        "px-3 py-1 hover:bg-[#3758c5] rounded-[8px] cursor-pointer duration-150 " +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

export default MyButton;
