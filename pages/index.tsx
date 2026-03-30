import { createPimlicoClient } from "permissionless/clients/pimlico";

// Minimal reproduction: just importing permissionless is enough.
// The permissionless package has an async function + the ** operator
// in the same file (estimateErc20PaymasterCost.js):
//
//   export const estimateErc20PaymasterCost = async (client, args) => {
//     ...
//     const costInUsd = (maxCostInWei * exchangeRateNativeToUsd) / 10n ** 18n;
//     ...
//   }
//
// Turbopack's browserslist-based targeting downlevels async -> generator,
// then the generator transform panics on ** (right-associative, unhandled).

export default function Home() {
  return <div>permissionless: {typeof createPimlicoClient}</div>;
}
