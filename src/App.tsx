import {useState, ChangeEvent, FormEvent} from 'react'

import {cn} from './lib/utils'
import {Input} from '#/UI/Input'
import {Button} from '#/UI/Button'

const websiteBox = 'max-w-2xl xl:max-w-xl mx-auto sm:mx-4'

function App() {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [embedUrl, setEmbedUrl] = useState<string>('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const videoId = videoUrl.split('v=')[1]?.split('&')[0]
    if (videoId) {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`)
    } else {
      alert('Invalid YouTube URL')
    }
  }

  return (
    <main className={cn('mt-10 sm:mt-5 space-y-6', websiteBox)}>
      <form className="space-y-3" onSubmit={handleFormSubmit}>
        <Input value={videoUrl} onChange={handleInputChange} placeholder="Вставьте ссылку с YouTube" />

        <Button className="w-full" type="submit">
          Добавить видео
        </Button>
      </form>
      {embedUrl && (
        <section className="space-y-4">
          <div className="rounded-md overflow-hidden">
            <iframe className="w-full h-full aspect-video" width="560" height="315" src={embedUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="YouTube Video"></iframe>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
