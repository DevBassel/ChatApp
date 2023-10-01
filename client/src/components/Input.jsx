export default function Input(props) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor={props.label}
            className="block text-sm font-medium leading-6 capitalize text-gray-900"
          >
            {props.label}
          </label>
        </div>
        <div className={`mt-2 relative ${props.cls}`}>
          <input
            id={props.id || props.label}
            name={props.label || props.name}
            type={props.type}
            value={props.value}
            onChange={props.fun}
            maxLength={props.max}
            accept={props.accept}
            placeholder={props.placeholder || ""}
            className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 `}
          />
          {props.ex}
        </div>
      </div>
    </>
  );
}
