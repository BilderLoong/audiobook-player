// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { parseSync } from 'subtitle'
import { useState } from 'react'


const inter = Inter({ subsets: [] })


function eventStoper(e: React.UIEvent) {
  e.stopPropagation()
  e.preventDefault()
}

export default function Home() {
  const [text, setText] = useState('')

  const handleInputOnChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.table(files);
  }

  const handleDropFile = async (e: React.DragEvent<HTMLElement>) => {
    eventStoper(e)

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
      <section onDrop={handleDropFile} onDragOver={eventStoper} onDragEnter={eventStoper} className={styles.drop_box}>
        <input onChange={handleInputOnChage} type="file" id="input" multiple />
      </section>
      <section>
        {text}
      </section>
    </>
  )
}
