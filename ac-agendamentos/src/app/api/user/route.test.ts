/**
 * @jest-environment node
 */

import { enableFetchMocks } from "jest-fetch-mock";
import { POST } from "./route";

enableFetchMocks();

describe("User Route", () => {
  test("should signIn successfully", async () => {
    const requestObj = {
      json: async () => ({
        name: "alexsander.ventricci@gmail.com",
        password: "teste",
      }),
    } as any;

    const response = await POST(requestObj);

    expect(response.status).toBe(200);
  });
});
