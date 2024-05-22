/**
 * @jest-environment node
 */
import { GET } from "./route";

describe("/api/schedule", () => {
  test("should return data", async () => {
    const requestObj = {
      json: async () => ({}),
    } as any;

    const response = await GET(requestObj);

    expect(response.status).toBe(200);
  });
});
