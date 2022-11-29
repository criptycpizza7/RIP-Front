import MainPage from "./Pages/mainPage";
import {MAIN_PAGE_ROUTE, GAME_ROUTE, CART_ROUTE} from "./utils/routes";
import gamePage from "./Pages/page";
import cart from "./Pages/cart";

export const publicRoutes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage
    },
    {
        path: GAME_ROUTE + '/:id',
        Component: gamePage
    }
]

export const authRouts = [
    {
        path: CART_ROUTE,
        Component: cart
    }
]