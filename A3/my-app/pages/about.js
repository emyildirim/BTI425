import { useEffect, useState } from 'react';
import Link from 'next/link';
//import { Card } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';

export default function About() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieData().then(data => {
            setMovie(data.props.movie);
        }).catch(error => console.error('Error: fetching movie data:', error));
    }, []);
    
    if(movie !== null){
        return (

            <>
                <div>
                    <PageHeader text="About the Developer: Erkam Yildirim" />
                    <Card className="bg-light" >
                        <Card.Body>
                            <p>
                                Consequat est excepteur dolore minim. Lorem sit magna ex velit excepteur ad qui
                                nostrud ipsum aliquip mollit sunt commodo aute. Non consequat cillum magna irure consectetur.

                                Ad elit adipisicing cillum laborum reprehenderit id mollit aliqua duis elit cupidatat mollit non.
                                Est cillum do eu ipsum dolore id minim. Cupidatat incididunt ipsum et sunt nostrud dolore occaecat ipsum et deserunt.
                                Do eu non nostrud aute qui id nostrud consectetur.
                                Ullamco consectetur elit minim occaecat aliqua nisi qui ut commodo qui enim dolor.
                            </p>
                            <p>
                                It is difficult to choose a favorite, but here is mine: {' '}
                                <Link href={`/movies/${movie?.title}`} passHref legacyBehavior>
                                    <a>{movie?.title}</a>
                                </Link>
                            </p>
                            <MovieDetails movie={movie} />
                        </Card.Body>
                    </Card>
                </div>
            </>
        ); 
    }   
}

export async function fetchMovieData(){
    try {
        const response = await fetch('https://sore-cyan-moth-sock.cyclic.app/api/movies/573a139bf29313caabcf3d23');
        if (!response.ok) {
            console.error("Error: Failed to fetch movie data");
        }
        const data = await response.json();
        return {
            props: {
                movie: data
            }
        };
    } catch (error) {
        console.error("Error: ", error);
    }
};
