import { authenticateManager } from "@/helpers/test/authenticate-manager";
import { app as httpApp } from "@/http/app";
import { treaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";

describe("Dispatch order (e2e)", () => {
	const app = treaty(httpApp);

	it("should be able to dispatch an order", async () => {
		const { token, restaurantId } = await authenticateManager("withRestaurant");

		const order = await app["create-order"].post(
			{
				status: "processing",
				totalInCents: 1900,
				restaurantId: String(restaurantId),
			},
			{ headers: { Authorization: token } },
		);

		const response = await app["dispatch-order"]({
			orderId: order.data!.id,
		}).patch({}, { headers: { Authorization: token } });

		expect(response.status).toBe(200);
		expect(response.data).toEqual(
			expect.objectContaining({
				status: "delivering",
			}),
		);
	});
});
