import React from 'react';
import './Audio_player.css'
import './Luke_secret_lab.css';

class AudioPlayer extends React.Component {
  render() {
    const { audioFile } = this.props;
    return (
      <div>
        {/* <h2>Audio Player</h2> */}
        <audio controls autoPlay loop>
          <source src={audioFile} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default AudioPlayer;