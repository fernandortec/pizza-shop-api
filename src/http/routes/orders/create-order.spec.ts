import { authenticateManager } from "@/helpers/test/authenticate-manager";
import { app as httpApp } from "@/http/app";
import { treaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";

describe("Create order (e2e)", () => {
	const app = treaty(httpApp);

	it("should be able to create an order", async () => {
		const { token, restaurantId } = await authenticateManager("withRestaurant");

		const orderResponse = await app["create-order"].post(
			{
				status: "pending",
				totalInCents: 1900,
				restaurantId: String(restaurantId),
			},
			{ headers: { Authorization: token } },
		);

		expect(orderResponse.status).toBe(200);
		expect(orderResponse.data).toEqual(
			expect.objectContaining({ id: expect.any(String) }),
		);
	});
});
