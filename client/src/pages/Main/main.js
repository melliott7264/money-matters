import React from 'react';
import Article from '../../components/Article';
import './main.css'

import { useQuery } from 'apollo/client';
import { GET_ARTICLES } from '../../utils/queries';


const Main = () =>  {
    const [saveArticle ] = useQuery(GET_ARTICLES);
   

    return (
        <main>
            <div className='flex-row justify-space-between'>
                <div className='col-12 mb-3'>
                    {saveArticle}

                </div>
            </div>
        </main>
    )
};

export default Main;