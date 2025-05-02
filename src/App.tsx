import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MoriMap } from "./components/LeafletMap";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MoriMap />
      </QueryClientProvider>
    </>
  );
}

export default App;
