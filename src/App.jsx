import React from 'react'
import TopBar from './components/TopBar'
import Table from './components/Table';
import Pagination from './components/Pagination';
import "./app.css";
import { useComments } from './store';
import LoadingSpinner from './components/LoaderSpinner';

export default function App() {
  const { loading } = useComments()


  return (

    <div className='container'>
      {
        loading ? <LoadingSpinner /> :
          (
            <>
              <TopBar />

              <Table />
              <Pagination />
            </>

          )
      }

    </div>
  )
}
