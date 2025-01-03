import{useEffect,useState} from 'react'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    const[workouts, setWorkouts] = useState(null)

    useEffect(()=>{
        //create function inside which is async won't work if useAffect is async
        const fetchWorkouts = async () => {
            //maybe 3000 backend and frontent different servers 
            // causes cross origin request and will be blocked for security reasons
            //http://localhost:4000/
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                setWorkouts(json)
            }
        }   

        fetchWorkouts() 
    },[])

    return(
        <div className="home">
            <div className ="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key ={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home