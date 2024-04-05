import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { useState, useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCardDetail({ objectID }) {

    //from Assignment 5
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList.includes(objectID));
    }, [favouritesList, objectID]);
    
    async function favouritesClicked() {
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(false);
        }else{
            setFavouritesList(await addToFavourites(objectID))
            setShowAdded(true);
        }
    };

    //from Assignment 6
    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])



    //from Assignment 4
    const { data, error } = useSWR( objectID ?
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        : null
    );

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    const {
        primaryImage,
        title,
        objectDate,
        classification,
        medium,
        artistDisplayName,
        artistWikidata_URL,
        creditLine,
        dimensions,
    } = data;

    return (
        <Card>
            {primaryImage && (
                <Card.Img
                    src={primaryImage}
                    alt={title || 'N/A'}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}
                    <br />
                    <strong>Classification:</strong> {classification || 'N/A'}
                    <br />
                    <strong>Medium:</strong> {medium || 'N/A'}
                    <br />
                    <br />
                    {artistDisplayName && (
                        <>
                            <strong>Artist:</strong>{' '}
                            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                                wiki
                            </a>
                            <br />
                        </>
                    )}
                    <strong>Credit Line:</strong> {creditLine || 'N/A'}
                    <br />
                    <strong>Dimensions:</strong> {dimensions || 'N/A'}
                    <br />
                    <br />
                    <Button variant={showAdded ? "dark" : "outline-dark"} onClick={favouritesClicked}>
                        {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
