import { AuthenticationRoutes } from "./authenticationRoutes";
import { MainRoutes } from "./mainRoutes";

const navLinks = [
    ...MainRoutes,
    ...AuthenticationRoutes,
];
export default navLinks;