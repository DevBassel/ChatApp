export default function Loading({ st }) {
  return (
    <div
      className={`${
        st || "fixed"
      } top-0 left-0 flex items-center h-full w-full bg-black bg-opacity-70 z-30 justify-center`}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
