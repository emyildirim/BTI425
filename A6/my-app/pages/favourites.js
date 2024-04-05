import { Card, Container, Row, Col } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

export default function Favourites({ objectID }) {
    
    const [favouritesList] = useAtom(favouritesAtom);

    if (!favouritesList) return null;

    return (
        <>
            {favouritesList.length === 0 ? 
                (
                    <Card>
                        <Card.Body>
                            <Card.Title>Nothing Here.</Card.Title>
                            <Card.Text>Try adding some new artwork to the list.</Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <Container>
                        <Row>
                            {favouritesList.map((objectID) => (
                                <Col key={objectID} lg={3}>
                                    <ArtworkCard objectID={objectID} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                )
            }
        </>
    );
};

