import { getToken } from './authenticate';

async function request(url, method) {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}

//Add to favourites by userid
export async function addToFavourites(id) {
    return request(`/favourites/${id}`, 'PUT');
}

//Remove from favourites by favouriteid
export async function removeFromFavourites(id) {
    return request(`/favourites/${id}`, 'DELETE');
}

//Get user favourites
export async function getFavourites() {
    return request(`/favourites`, 'GET');
}

//Add to history by userid
export async function addToHistory(id) {
    return request(`/history/${id}`, 'PUT');
}

//Remove from history by historyid
export async function removeFromHistory(id) {
    return request(`/history/${id}`, 'DELETE');
}

//Get user history
export async function getHistory() {
    return request(`/history`, 'GET');
}