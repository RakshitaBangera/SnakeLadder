import { useState } from 'react';
import axios from 'axios';

function App() {
  const [roomCode, setRoomCode] = useState('');

  const createGame = async () => {
    const res = await axios.post('http://localhost:5075/api/game/create');
    setRoomCode(res.data.roomCode || res.data.RoomCode);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Snake & Ladder</h1>

      <button onClick={createGame}>
        Create Game
      </button>

      {roomCode && (
        <h2>Room Code: {roomCode}</h2>
      )}
    </div>
  );
}

export default App;