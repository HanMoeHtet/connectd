import React, { useRef } from 'react';
import { IconButton } from '@material-ui/core';
import { VideoLibrary } from '@material-ui/icons';

interface VideoInputButtonProps {
  onChange: (media: File) => void;
}
const VideoInputButton: React.FC<VideoInputButtonProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const el = inputRef.current;
    if (el) el.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files || [])[0];
    onChange(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        accept=".mp4,.avi,.3gp"
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <IconButton aria-label="upload video" onClick={handleClick}>
        <VideoLibrary
          style={{
            color: '#52bd62',
          }}
        />
      </IconButton>
    </>
  );
};

export default VideoInputButton;