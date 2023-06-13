import {
  Authenticate,
  Home,
  MyFlight,
  CreateFlight,
  ManageSeller,
} from "../pages";

export const publicRoutes = [{ component: Authenticate, path: "/" }];

export const privateRoutes = [
  { component: Home, path: "/home" },
  { component: MyFlight, path: "/my-flight" },
  { component: CreateFlight, path: "/create-flight" },
  { component: ManageSeller, path: "/manage-seller" },
];
