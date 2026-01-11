"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorMessage = ({ error, reset }: Props) => {
  return (
    <>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </>
  );
};

export default ErrorMessage;
