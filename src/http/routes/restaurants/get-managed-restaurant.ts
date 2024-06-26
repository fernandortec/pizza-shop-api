import { auth } from "@/http/plugins/auth";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { makeGetManagedRestaurantUseCase } from "@/use-cases/_factories/make-get-managed-restaurant-use-case";
import { Elysia } from "elysia";

export const getManagedRestaurant = new Elysia()
	.use(auth)
	.error({ NOT_FOUND: ResourceNotFoundError })
	.get(
		"/get-restaurant",
		async ({ getCurrentUser }) => {
			const { restaurantId } = await getCurrentUser();

			const getManagedRestaurantUseCase = makeGetManagedRestaurantUseCase();

			const managedRestaurant =
				getManagedRestaurantUseCase.execute(restaurantId);

			return managedRestaurant;
		},
		{
			error: ({ set, code }) => {
				switch (code) {
					case "NOT_FOUND":
						set.status = 409;
						return { message: "Manager doesn't exists!" };
				}
			},
		},
	);
