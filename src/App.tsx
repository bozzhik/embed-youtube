import {Input} from '#/UI/Input'
import {cn} from './lib/utils'

const websiteBox = 'max-w-2xl xl:max-w-xl mx-auto sm:mx-4'

function App() {
  return (
    <main className={cn('mt-10 sm:mt-5', websiteBox)}>
      <form className="space-y-3">
        <Input placeholder="Вставьте ссылку с YouTube" />
      </form>
    </main>
  )
}

export default App
