import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import Main from "./Main";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: process.env.REACT_APP_DYNAMIC_PROJECT_KEY,
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <Main />
  </DynamicContextProvider>
);

export default App;
