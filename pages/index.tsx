import { createPimlicoClient } from "permissionless/clients/pimlico";

// A generator function in user code triggers SWC's ES2015 generator transform
// on the entire chunk, including node_modules. The `permissionless` package
// contains `10n ** 18n` (BigInt exponentiation), and the generator transform
// panics because ** is right-associative and unhandled.
//
// Panic: swc_ecma_compat_es2015/src/generator.rs:507
// "not yet implemented: right-associative binary expression"
function* counter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = counter();

export default function Home() {
  return (
    <div>
      <p>permissionless: {typeof createPimlicoClient}</p>
      <p>counter: {gen.next().value as number}</p>
    </div>
  );
}
