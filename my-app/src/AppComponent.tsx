import { useEffect, useState } from 'react';
import './App.css';
import { User } from './models/User.model';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount } from './Redux/counterSlice';
import { Button } from 'react-bootstrap';
import UserComponent from './components/UserComponent';
import React from 'react';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import MeComponent from './components/MeComponent';
import ErrorComponent from './components/ErrorComponent';
import { debug } from 'console';
import { makeAutoObservable } from 'mobx';
import { observer } from "mobx-react"

import { timer } from './index';

const loadUser = async <T, >(url: string): Promise<T> => {
  const response: Response = await fetch(url);
  const user: any = await response.json();

  return user as T;
}

const AppComponent = observer(() => {
  const navigate = useNavigate();
  
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  console.log("Count", count);
  const [user1, setUser1] = useState<User | null>(null);
  const [user2, setUser2] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);


  const [flag, setFlag] = useState<boolean>(false);
  const [isAbout, setIsAbout] = useState<boolean>(false);
  
  useEffect(() =>  {
    // DidMount
     const initialize = async () => {
     const loadedUser1 = await loadUser<User>("https://reqres.in/api/users/2");
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

  const handleMobx = () => {
    timer.increase();
  }

  const handlerNavigate = () => {
    localStorage.setItem("key_basket", JSON.stringify([1, 2, 3]));
    const str_basket = localStorage.getItem("key_basket");
    if (str_basket != null) {
      const array = JSON.parse(str_basket) as number[];
      debugger;
    }
    console.log();
    if (isAbout) {
      navigate('/');
      setIsAbout(false);
      return;
    }
    navigate('about');
    setIsAbout(true);
  }
  
  const resultUserComponent = flag ? <UserComponent user={user1}></UserComponent> : <></>

  return (
      <>
        <div className="App">
          {resultUserComponent}
          {users.map(user => <UserComponent user={user}></UserComponent>)}
          <Button className='my-btn' onClick={() => handlerButton()}> Click </Button>
          <Button className='my-btn' onClick={() => handleFlag()}> Flag </Button>
          <Button className='my-btn' onClick={() => handlerNavigate()}> Navigate </Button>
          <Button className='my-btn' onClick={() => handleMobx()}> Mobx </Button>
        </div>

        {timer.secondsPassed}
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="*" element={<Navigate replace to={'/'} />} />
          <Route path="about" element={<AboutComponent />}>
            <Route path="me" element={<MeComponent />} />
          </Route>
        </Routes>
      </>
  );
});

export default AppComponent;
