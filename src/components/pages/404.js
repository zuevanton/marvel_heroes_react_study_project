import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{'textAlign': 'center'}}>Page doesn't exist.</p>
      <Link style={{'display': 'block', 'textAlign': 'center'}} to='/'>MainPage</Link>
    </div>
  )
}

export default Page404