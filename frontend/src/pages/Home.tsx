import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react';

const Home = () => {

  const {fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, featuredSongs, trendingSongs } =  useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  console.log({isLoading, madeForYouSongs, featuredSongs, trendingSongs})

  return (
    <div className='rounded-md overflow-hidden'>
      <Topbar />
    </div>
  )
}

export default Home 