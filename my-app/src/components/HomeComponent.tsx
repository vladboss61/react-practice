import { Button } from "react-bootstrap";
import { timer } from '../index';

const HomeComponent = () => {
    console.log("timer.secondsPassed");
    console.log(timer.secondsPassed);
    const handleHomeMobx = () => {
        timer.reset();
    }
    return (<>
        <Button className='my-btn' onClick={() => handleHomeMobx()}> Mobx Home btn </Button>
        <div>Home</div>
    </>)
}

export default HomeComponent;