// Just tested using context API for more comfortability
// using it in the future. It is a great experience!
import { createContext, useContext } from "react";

interface IActionParams {
  link: string;
  method: string;
  body: string;
}

const ActionContext = createContext<Function>(Function);

export default function ActionProvider({ children }: React.PropsWithChildren) {
  function handleAction({ link, method, body }: IActionParams) {
    fetch(link, {
      method: method,
      headers: { "Content-type": "application/json" },
      body: body,
    });
  }

  return (
    <ActionContext.Provider value={handleAction}>
      {children}
    </ActionContext.Provider>
  );
}

export function useAction() {
  return useContext(ActionContext);
}
