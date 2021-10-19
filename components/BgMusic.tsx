import { Button } from "@geist-ui/react";
import { Music, Pause } from "@geist-ui/react-icons";
import { useEffect, useState } from "react";

export default function BgMusic() {

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
            <audio id="bg-music" controls hidden src="https://firebasestorage.googleapis.com/v0/b/metalink-c9d12.appspot.com/o/animebgm.mp3?alt=media&token=50b24068-8f91-400c-b79f-621789e89982" />
            <Button
                iconRight={isPlaying ? <Pause /> : <Music />}
                auto
                onClick={() => {
                    const audioPlayer: any = document.getElementById("bg-music")
                    if(audioPlayer.paused) {
                        audioPlayer.volume = 0.7
                        audioPlayer.play()
                        setIsPlaying(true)
                    } else {
                        audioPlayer.pause()
                        setIsPlaying(false)
                    }
                }}
                scale={1}
                px={0.55}
                type="secondary"
                shadow
                style={{
                    position: "fixed",
                    bottom: "25px",
                    right: "25px",
                    borderRadius: "50%"
                }}
            />
        </>
    )
}