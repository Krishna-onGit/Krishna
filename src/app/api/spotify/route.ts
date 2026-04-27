import { NextResponse } from 'next/server';
import { getPlaylist } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await getPlaylist();
    
    // If the playlist is private or token expired, we might get an error
    if (response.status === 204 || response.status > 400) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Spotify API Error Detail:', errorData);
      
      return NextResponse.json({ 
        isPlaying: false, 
        title: "Curated Moods", 
        artist: "Spotify", 
        albumImageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop" 
      });
    }

    const playlist = await response.json();
    const tracks = playlist.tracks?.items;
    
    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ 
        isPlaying: false, 
        title: "Ambient Collection", 
        artist: "Spotify",
        albumImageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop"
      });
    }

    // Pick a random track from your real playlist
    const randomIndex = Math.floor(Math.random() * Math.min(tracks.length, 20));
    const item = tracks[randomIndex].track;

    return NextResponse.json({
      isPlaying: false,
      title: item.name,
      artist: item.artists.map((_artist: any) => _artist.name).join(', '),
      albumImageUrl: item.album.images[0]?.url,
      songUrl: item.external_urls.spotify,
    });
  } catch (error) {
    console.error('Spotify API Route Error:', error);
    return NextResponse.json({ 
      isPlaying: false, 
      title: "Atmospheric Mix", 
      artist: "Spotify",
      albumImageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop"
    });
  }
}
