import React from 'react'
// import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { parseSync } from 'subtitle'

function stopEvent(e: React.UIEvent) {
    e.stopPropagation()
    e.preventDefault()
}


export default function FileUploader() {

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
        <section onDrop={handleDropFile} onDragOver={stopEvent} onDragEnter={stopEvent} className={styles.drop_box} >
            <input onChange={handleInputOnChange} type="file" id="input" multiple />
        </section>
    )
}
