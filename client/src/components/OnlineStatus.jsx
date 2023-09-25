export default function OnlineStatus({ online }) {
  return (
    <div
      className={`absolute right-4 border -translate-x-1/2 h-3 w-3 z-10  ${
        online ? "bg-green-500" : "bg-red-700"
      } rounded-full`}
    ></div>
  );
}
