type ButtonIDProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    variant: string;
    full?: boolean;
    id: string;
  }
  
  const CustomBtnId = ({ type, title, icon, variant, full, id}: ButtonIDProps) => {
    return (
      <button
      id = {id}
      className={`transition-all hover:font-bold flexCenter rounded-2xl border ${variant} ${full && 'w-full'}`}
        type={type}
      >
        <label className="lg:px-5 whitespace-nowrap cursor-pointer">{title}</label>
      </button>
    )
  }
  
  export default CustomBtnId;