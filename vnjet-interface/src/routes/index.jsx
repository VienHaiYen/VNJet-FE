import {
  Authenticate,
  Home,
  MyFlight,
  CreateFlight,
  ManageUsers,
  ManageFlights,
  DetailFlight,
} from "../pages";

export const publicRoutes = [{ component: Authenticate, path: "/" }];

export const privateRoutes = [
  { component: Home, path: "/home" },
  { component: MyFlight, path: "/my-flight" },
  { component: CreateFlight, path: "/create-flight" },
  { component: ManageUsers, path: "/manage-users" },
  { component: ManageFlights, path: "/manage-flights" },
  { component: DetailFlight, path: "/detail-flight" },
];
