import { useEffect, useState } from 'react'
import {
  GitPullRequest,
  GitMerge,
  GitBranch
} from 'lucide-react'

const BASE_URI = 'https://webhook-repo-kg7q.onrender.com/webhook/events'

export default function App() {
  const [actionFilter, setActionFilter] = useState('')
  const [events, setEvents] = useState([])

  async function fetchEvents() {
    let url = BASE_URI
    if (actionFilter) url += `?action=${encodeURIComponent(actionFilter)}`

    try {
      const resp = await fetch(url)
      const json = await resp.json()
      if (json.success && Array.isArray(json.payload)) {
        setEvents(json.payload)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  useEffect(() => {
    fetchEvents()
    const id = setInterval(fetchEvents, 15000)
    return () => clearInterval(id)
  }, [actionFilter])

  const renderIcon = (action) => {
    if (action.includes('merged')) return <GitMerge className="text-green-400 w-6 h-6" />
    if (action.includes('pull_request')) return <GitPullRequest className="text-blue-400 w-6 h-6" />
    return <GitBranch className="text-purple-400 w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">GitHub Events</h1>

        <div className="flex flex-wrap gap-3 mb-6">
          {['', 'push', 'pull_request_opened', 'pull_request_merged'].map(a => (
            <button
              key={a}
              onClick={() => setActionFilter(a)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${actionFilter === a
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {a === '' ? 'All' : a.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {events.map(evt => (
            <li
              key={evt.request_id}
              className="bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4"
            >
              {renderIcon(evt.action)}
              <div>
                <p className="text-lg">
                  <span className="font-semibold">
                    {evt.author}
                  </span>
                  {' '}
                  {evt.action.includes('push') && (
                    <span className="text-purple-300">
                      pushed to
                      {' '}
                      <span className="text-purple-400">
                        {evt.to_branch}
                      </span>
                    </span>
                  )}
                  {evt.action.includes('pull_request_opened') && (
                    <span className="text-blue-300">
                      opened PR from
                      {' '}
                      <span className="text-blue-400">
                        {evt.from_branch}
                      </span>
                      {' '}
                      to
                      {' '}
                      <span className="text-blue-400">
                        {evt.to_branch}
                      </span>
                    </span>
                  )}
                  {evt.action.includes('pull_request_merged') && (
                    <span className="text-green-300">
                      merged
                      {' '}
                      <span className="text-green-400">
                        {evt.from_branch}
                      </span>
                      {' '}
                      into
                      {' '}
                      <span className="text-green-400">
                        {evt.to_branch}
                      </span>
                    </span>
                  )}
                </p>
                <div className="text-sm text-gray-400">
                  {evt.timestamp}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
