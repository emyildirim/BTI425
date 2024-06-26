import { useRouter } from "next/router";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { readToken, removeToken, isAuthenticated } from '@/lib/authenticate';
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {

    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [authorized, setAuthorized] = useState(false);
    let token = readToken();

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    function logout() {
        removeToken();
        router.push('/');
    }

    useEffect(() => {

        updateAtoms();
        // on initial load - run auth check
        authCheck(router.pathname);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }

    return <>{authorized && props.children}</>
}