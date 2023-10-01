import OnlineStatus from "./OnlineStatus";

export default function Firend({ name, avatar, _id, onlines }) {

  const activeUsers = onlines.find((user) => user.userId === _id) || false;

  return (
    <>
      <OnlineStatus online={activeUsers} />
      <img
        className="w-full h-full object-cover hover:scale-125 hover:rotate-12 transition"
        // src={checkImg ? avatar : avatarXD}
        src={avatar}
        alt="Firend"
      />
      <h3 className="absolute bottom-0 w-full text-center font-bold bg-opacity-70   text-white bg-teal-700">
        {name}
      </h3>
    </>
  );
}
