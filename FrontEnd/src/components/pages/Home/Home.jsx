import Card from '../../UI/Card'
import classes from './Home.module.css'
import Spinner from '../../UI/Spinner'
const Home = props => {
  return (
    <Card className={classes.home}>
      <Spinner />
    </Card>
  )
}

export default Home
