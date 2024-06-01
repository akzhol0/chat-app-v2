type MyButtonProps = {
    children?: React.ReactNode;
    className?: string;
  };
  
  function MyButton({ children, className }: MyButtonProps) {
    return (
      <button
      type="submit"
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
  