import React, { useEffect, useRef } from 'react';
import { IconButton } from '@material-ui/core';
import { Image } from '@material-ui/icons';

interface PhotoInputButtonProps {
  onChange: (media: File) => void;
  isOpen?: boolean;
}
const PhotoInputButton: React.FC<PhotoInputButtonProps> = ({
  onChange,
  isOpen = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const el = inputRef.current;
    if (el) el.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files || [])[0];
    onChange(file);
  };

  useEffect(() => {
    if (isOpen) {
      handleClick();
    }
  }, [isOpen]);

  return (
    <>
      <input
        ref={inputRef}
        accept=".png,.jpeg,.jpg,.webp,.gif"
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <IconButton aria-label="upload picture" onClick={handleClick}>
        <Image
          style={{
            color: '#1877f2',
          }}
        />
      </IconButton>
    </>
  );
};

export default PhotoInputButton;
