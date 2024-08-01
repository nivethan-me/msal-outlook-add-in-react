import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./components/auth-config";

/* global document, Office, module, require, HTMLElement */

const msalInstance = new PublicClientApplication(msalConfig);

const title = "Contoso Task Pane Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <MsalProvider instance={msalInstance}>
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    </MsalProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(NextApp);
  });
}
