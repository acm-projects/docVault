type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    variant: string;
    full?: boolean;
    children?: React.ReactNode;
  }
  
  const CustomBtn = ({ type, title, variant, full, children }: ButtonProps) => {
    return (
      <button
      className={`transition-all hover:font-bold hover:stroke-2 flexCenter rounded-2xl border ${variant} ${full && 'w-full'}`}
        type={type}
      >
        {children && (
          <span className="flex justify-left">
            {children}
          </span>
        )}
        <label className="mx-auto whitespace-nowrap cursor-pointer text-center">
          {title}
        </label>
      </button>
    )
  }
  
  export default CustomBtn;