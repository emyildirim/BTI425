import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    const { primaryImageSmall, title, objectDate, classification, medium } = data;
    const imageUrl = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

    return (
        <Card>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}<br />
                    <strong>Classification:</strong> {classification || 'N/A'}<br />
                    <strong>Medium:</strong> {medium || 'N/A'}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="outline-dark">ID: {objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

