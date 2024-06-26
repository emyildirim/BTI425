import { useRouter } from 'next/router';
import useSWR from 'swr';
import MovieDetails from '@/components/MovieDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';


export default function Movie() {
    const router = useRouter();
    const { title } = router.query;

    const { data, error } = useSWR(
        title ? `https://sore-cyan-moth-sock.cyclic.app/api/movies/1/10/${title}` : null
    );

    if (data === null || data === undefined) {
        return null;
    } else if (data.length === 0) {
        return <Error statusCode={404} />;
    } else {
        return (
            <>
                {data.map(movie => (
                    <div key={movie._id}>
                        <PageHeader text={movie.title} />
                        <MovieDetails movie={movie} />
                    </div>
                ))}
            </>
        );
    } 
}


