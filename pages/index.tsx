import { createPimlicoClient } from "permissionless/clients/pimlico";

export default function Home() {
  return <div>permissionless: {typeof createPimlicoClient}</div>;
}
