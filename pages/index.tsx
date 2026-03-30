async function compute() {
  return 10n ** 18n;
}

export default function Home() {
  return <div>{typeof compute}</div>;
}
