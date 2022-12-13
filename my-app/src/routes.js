import MainPage from "./Pages/mainPage";
import {MAIN_PAGE_ROUTE, GAME_ROUTE, CART_ROUTE, REGISTRATION_ROUTE, AUTH_ROUTE, MANAGER_ROUTE} from "./utils/routes";
import gamePage from "./Pages/page";
import cart from "./Pages/cart";
import Auth from "./Pages/auth";
import ManagerPage from "./Pages/managerPage";
import Registration from "./Pages/registration";

export const publicRoutes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage
    },
    {
        path: GAME_ROUTE + '/:id',
        Component: gamePage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]

export const authRoutes = [
    {
        path: CART_ROUTE,
        Component: cart
    }
]

export const managerRoutes = [
    {
        path: MANAGER_ROUTE,
        Component: ManagerPage
    }
]