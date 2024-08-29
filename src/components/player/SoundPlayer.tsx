import useSound from 'use-sound';
import {useEffect} from 'react';

type iSoundPlayer = {
  soundFile: string;
  version: number;
  iSoundOptions?: any;
}
const SoundPlayer = ({soundFile, iSoundOptions, version}: iSoundPlayer) => {
  const [play, {stop}] = useSound(soundFile, iSoundOptions);

  useEffect(() => {
    play();
    return () => {
      stop();
    }
  }, [version]);

  return null;
}

export default SoundPlayer;
