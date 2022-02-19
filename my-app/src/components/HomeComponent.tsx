import { Button } from "react-bootstrap";
import { difficultTimer } from '../index';

const HomeComponent = () => {
    console.log("timer.secondsPassed");
    console.log(difficultTimer.secondsPassed);
    const handleHomeMobx = () => {
        difficultTimer.reset();
    }
    return (<>
        <Button className='my-btn' onClick={() => handleHomeMobx()}> Mobx Home btn </Button>
        <div>Home</div>
    </>)
}

export default HomeComponent;