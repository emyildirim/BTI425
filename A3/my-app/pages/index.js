/*********************************************************************************
*  BTI425 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Erkam Yildirim Student ID: 160235206 Date: 15/02/2024
*
*
********************************************************************************/ 


import Head from "next/head";
import MainNav from "@/components/MainNav";
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Pagination, Accordion } from 'react-bootstrap';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';



export default function Home() {

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  //Request Data
  const { data, error } = useSWR(`https://sore-cyan-moth-sock.cyclic.app/api/movies/${page}/10`);

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function previous() {
    if (page > 1) {
      setPage(page - 1);
      setPageData(data);
    }
  };

  function next() {
    setPage(page + 1);
    setPageData(data);
  };

  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        
        <MainNav />
        <PageHeader text="Film Collection : Sorted by Date" />
        <Accordion>
          {pageData.map(movie => (
            <Accordion.Item key={movie._id} eventKey={movie._id}>
              <Accordion.Header>
                <strong>{movie.title}</strong> - {movie.year} - {movie.directors.join(', ')}
              </Accordion.Header>
              <Accordion.Body>
                <MovieDetails movie={movie} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <Pagination>
          <Pagination.Prev onClick={previous} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={next} />
        </Pagination>
        
      </main>
    </>
  );
}