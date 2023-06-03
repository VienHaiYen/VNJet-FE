function Button({ submit }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => submit()}
      >
        Submit
      </button>
    </>
  );
}

export default Button;
