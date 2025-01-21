import Details from '@/components/Dashboard/Home/Details';
import React from 'react'



const page = ({params} : { params: { id: string } }) => {

    console.log('params', params?.id);


  return (
    <div>pagina edit {params?.id}
    
    <Details selectId={params?.id} />
    </div>
  )
}

export default page