//useState is no longer needed due to context hooks
import{useEffect} from 'react'
import{useWorkoutsContext} from '../hooks/useWorkoutsContext'
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
  

const Home = () => {
    // not needed anymore const[workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(()=>{
        //create function inside which is async won't work if useAffect is async
        const fetchWorkouts = async () => {
            //maybe 3000 backend and frontent different servers 
            // causes cross origin request and will be blocked for security reasons
            //http://localhost:4000/
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                //setWorkouts(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }   

        fetchWorkouts() 
    },[dispatch])

    return(
        <div className="home">
            <div className ="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key ={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home