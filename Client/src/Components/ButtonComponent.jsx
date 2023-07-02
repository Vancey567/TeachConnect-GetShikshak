function Button(props) {
  return (
    <button
      className={`cursor-pointer p-3 border-1 flex w-full items-center justify-center text-white font-semibold ${props.bgcolor} rounded-md`}
      type="props.type"
    >
      <span className="mx-4">{props.icon}</span>
      {props.text}
    </button>
  );
}

export default Button;
