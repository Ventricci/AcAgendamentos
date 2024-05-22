/**
 * @jest-environment node
 */
import { POST } from "./route";

describe("/api/users", () => {
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
  test("should not signIn", async () => {
    const requestObj = {
      json: async () => ({
        name: "fasdfadfsadf@gmail.com",
        password: "teste",
      }),
    } as any;

    const response = await POST(requestObj);

    expect(response.status).toBe(200);
  });
});
