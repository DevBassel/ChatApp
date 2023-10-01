export default function checkIfImage(url, callback) {
  const img = new Image();
  img.src = url;

  img.onload = () => {
    callback(true);
  };

  img.onerror = () => {
    callback(false);
  };
}
