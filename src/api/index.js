import axios from 'axios'



export const getCatgories = async(type,lat,lng) => {
    const secret = process.env.REACT_APP_YELP_API_KEY
    try{
        const {data} = await axios.get('/v3/businesses/search', {
            params: {
                'term': type,
                'latitude': lat,
                'longitude': lng
            },


            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`
            }
            
        })

        return data
                       
    }catch(error){
       console.log(error)
    }
    
}


