import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
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
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="outline-dark">ID: {objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
