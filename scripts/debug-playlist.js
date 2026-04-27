const fs = require('fs');
const path = require('path');

// Manually read .env.local
const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

async function getTracks() {
  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = env.SPOTIFY_REFRESH_TOKEN;
  const playlist_id = env.SPOTIFY_PLAYLIST_ID;

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  });

  const { access_token } = await tokenResponse.json();

  const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await playlistResponse.json();
  
  if (data.items) {
    const tracks = data.items.map(i => ({
      title: i.track.name,
      artist: i.track.artists[0].name,
      albumImageUrl: i.track.album.images[0].url
    }));
    console.log('TRACKS_START');
    console.log(JSON.stringify(tracks, null, 2));
    console.log('TRACKS_END');
  } else {
    console.log('Error:', data);
  }
}

getTracks();
