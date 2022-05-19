import { useEffect } from 'react'
import { Route, Link, useParams, useRouteMatch } from 'react-router-dom'

import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'

import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'

const QuoteDetail = () => {
  const match = useRouteMatch()
  const params = useParams()

  const { quoteId } = params;

  const { sendRequest, status, data: loadedQoute, error } = useHttp(
    getSingleQuote,
    true
  )

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedQoute.text) {
    return <p className="centered">No quote found!</p>
  }




  return (
    <>
      <h1>Quote Detail Page</h1>
      <HighlightedQuote
        text={loadedQoute.text}
        author={loadedQoute.author}
      />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>Load comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>

  )
}

export default QuoteDetail;
