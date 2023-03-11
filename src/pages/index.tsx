// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { parseSync } from 'subtitle'
import { useEffect, useState } from 'react'
import videojs from 'video.js';

const inter = Inter({ subsets: [] })


function stopEvent(e: React.UIEvent) {
  e.stopPropagation()
  e.preventDefault()
}

// export async function getStaticProps() {
//   return {
//     props: {}
//   }
// }

export default function Home() {
  const [text, setText] = useState('')

  useEffect(() => {
    const player = videojs.getPlayer('my-player')
    console.log(player);
  })

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.table(files);
  }

  const handleDropFile = async (e: React.DragEvent<HTMLElement>) => {
    stopEvent(e)

    const file = e.dataTransfer.files[0]
    // It seems that the stream version parser doesn't Web API.
    // So choose the sync parser.
    const node = parseSync(await file.text())
    node.map(e => {
      if (e.type === 'header') {
        return e.data
      }

      return e.data.text
    })

  }

  return (
    <>
      <section onDrop={handleDropFile} onDragOver={stopEvent} onDragEnter={stopEvent} className={styles.drop_box}>
        <input onChange={handleInputOnChange} type="file" id="input" multiple />
      </section>
      <section>
        {text}
      </section>
      <section>
        <video
          id="my-player"
          className="video-js"
          controls
          preload="auto"
          poster="//vjs.zencdn.net/v/oceans.png"
          data-setup='{}'>
          <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
          <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
          <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p>
        </video>
      </section>
    </>
  )
}
