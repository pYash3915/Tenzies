export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#3e5879" : "#d8c4b6",
    color: props.isHeld ? "#d8c4b6" : "#3e5879",
  };

  return (
    <button onClick={props.hold} style={styles}>
      {props.value}
    </button>
  );
}
