export default function Button({ type, text, btnClass, func }) {

  return (
    <button
      type={ type }
      className={ `button ${ btnClass }` }
      onClick={func}
    >
      { text }
    </button>
  );
}