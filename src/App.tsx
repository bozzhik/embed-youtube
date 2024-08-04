import {useState, ChangeEvent, FormEvent} from 'react'

import {cn} from './lib/utils'
import {Input} from '#/UI/Input'
import {Button} from '#/UI/Button'

import {X} from 'lucide-react'

const websiteBox = 'max-w-2xl xl:max-w-xl mx-auto sm:mx-4'

function App() {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [embedUrls, setEmbedUrls] = useState<string[]>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let videoId: string | null = null
    const url = videoUrl.trim()

    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0]
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]
    }

    if (videoId) {
      const newEmbedUrl = `https://www.youtube.com/embed/${videoId}`
      setEmbedUrls((prevEmbedUrls) => [newEmbedUrl, ...prevEmbedUrls])
      setVideoUrl('')
    } else {
      alert(`Invalid YouTube URL: ${videoUrl}`)
    }
  }

  const handleClearQueue = () => {
    setEmbedUrls([])
  }

  const handleDeleteVideo = (index: number) => {
    setEmbedUrls((prevEmbedUrls) => prevEmbedUrls.filter((_, i) => i !== index))
  }

  return (
    <main className={cn('mt-10 sm:mt-5 space-y-6', websiteBox)}>
      <form className="space-y-3" onSubmit={handleFormSubmit}>
        <Input value={videoUrl} onChange={handleInputChange} placeholder="Вставьте ссылку с YouTube" />

        <Button className="w-full" type="submit">
          Добавить видео
        </Button>
        {embedUrls.length > 0 && (
          <Button variant={'outline'} className="w-full mt-4" onClick={handleClearQueue}>
            Очистить очередь
          </Button>
        )}
      </form>

      {embedUrls.length > 0 && (
        <section className="space-y-4 mt-4">
          {embedUrls.map((embedUrl, index) => (
            <div key={index} className="relative group">
              <iframe className="w-full h-full aspect-video rounded-md overflow-hidden" width="560" height="315" src={embedUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`YouTube Video ${index + 1}`}></iframe>
              <div className="absolute flex flex-col justify-center top-0 right-0 h-full w-1">
                <button className="pl-5 opacity-0 group-hover:opacity-100 duration-200" onClick={() => handleDeleteVideo(index)}>
                  <X className="s-14 hover:stroke-neutral-400 duration-300 cursor" strokeWidth={0.7} />
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
