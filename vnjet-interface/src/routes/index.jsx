import {
  Authenticate,
  Home,
  MyFlight,
  CreateFlight,
  ManageUsers,
  ManageAirport,
  DetailFlight,
  Report,
} from "../pages";

export const publicRoutes = [{ component: Authenticate, path: "/" }];

export const privateRoutes = [
  { component: Home, path: "/home" },
  { component: MyFlight, path: "/my-flight" },
  { component: CreateFlight, path: "/create-flight" },
  { component: ManageUsers, path: "/manage-users" },
  { component: ManageAirport, path: "/manage-airport" },
  { component: DetailFlight, path: "/detail-flight" },
  { component: Report, path: "/report" },
];
