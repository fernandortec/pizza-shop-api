import { describe, expect, it } from "bun:test";
import { authenticateManager } from "@/helpers/test/authenticate-manager";
import { type App, app as httpApp } from "@/http/app";
import { treaty } from "@elysiajs/eden";

describe("Cancel order (e2e)", () => {
	const app = treaty(httpApp);

	it("should be able to cancel an order", async () => {
		const { token, restaurantId } = await authenticateManager("withRestaurant");

		const order = await app["create-order"].post(
			{
				status: "processing",
				totalInCents: 1900,
				restaurantId: String(restaurantId),
			},
			{ headers: { Authorization: token } },
		);

		const response = await app["cancel-order"]({
			orderId: order.data!.id,
		}).patch({}, { headers: { Authorization: token } });

		expect(response.status).toBe(200);
		expect(response.data).toEqual(
			expect.objectContaining({
				status: "canceled",
			}),
		);
	});
});