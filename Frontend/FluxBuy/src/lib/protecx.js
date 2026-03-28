import { ProtecXClient } from "protecx-js/client";

export const protecx = new ProtecXClient({
    baseUrl: "https://protecx.onrender.com/api/v1/",
    projectId: "3b99de15-a67e-4d5e-bf81-d8967f35efc8",
    apiKey: "sx_live_d520d370c2fe006d13d7c745ee1cc78d",
    persistTokens: true
});