import { useEffect, useState } from 'react';
import './App.css';
import { User } from './models/User.model';
import { useDispatch, useSelector } from 'react-redux';
import { increment, selectCount } from './Redux/counterSlice';
import { Button } from 'react-bootstrap';
import UserComponent from './components/UserComponent';
import React from 'react';

export const ValueContent = React.createContext("value context");

const loadUser = async (url: string): Promise<User> => {
  const response: Response = await fetch(url);
  const user: any = await response.json();

  return user as User;
}

const AppComponent: React.FC = () => {

  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  console.log("Count", count);
  const [user1, setUser1] = useState<User | null>(null);
  const [user2, setUser2] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() =>  {
    // DidMount
     const initialize = async () => {
     const loadedUser1 = await loadUser("https://reqres.in/api/users/2");
     setUser1(loadedUser1);
    }
    initialize();
    return () => {
      // DidUnmount
    }
  }, [])

  useEffect(() =>  {
    console.log("User1 changed");
  }, [user1])

  useEffect(() =>  {
    console.log("User2 changed");
  }, [user2])

  const handlerButton = () => {
    const user =  new User();
    user.data.first_name = 'vlad';
    setUser1(user);
    console.log("Clicked");
  }

  const handleFlag = () => {
    setFlag(currentFlag => !currentFlag)
  }
  const resultUserComponent = flag ? <UserComponent user={user1}></UserComponent> : <></>

  return (
    <ValueContent.Provider value='some string from parent'>
      <div className="App">
        {resultUserComponent}
        {users.map(user => <UserComponent user={user}></UserComponent>)}
        <Button className='my-btn' onClick={() => handlerButton()}> Click </Button>
        <Button className='my-btn' onClick={() => handleFlag()}> Flag </Button>
      </div>
    </ValueContent.Provider>
  );
}

export default AppComponent;
