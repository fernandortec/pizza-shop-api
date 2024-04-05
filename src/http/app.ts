import { auth } from "@/http/plugins/auth";
import { authenticateFromLink } from "@/http/routes/authenticate-from-link";
import { createRestaurantManager } from "@/http/routes/create-restaurant-manager";
import { getManagedRestaurant } from "@/http/routes/get-managed-restaurant";
import { getProfile } from "@/http/routes/get-profile";
import { sendAuthLink } from "@/http/routes/send-auth-link";
import { signOut } from "@/http/routes/sign-out";

import Elysia from "elysia";

export const app = new Elysia()
	.use(auth)
	.use(createRestaurantManager)
	.use(sendAuthLink)
	.use(authenticateFromLink)
	.use(signOut)
	.use(getProfile)
	.use(getManagedRestaurant);

export type App = typeof app;