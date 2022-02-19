import { User } from '../models/User.model';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { difficultTimer } from '../index';

type UserProps = {
  user: User| null 
};

const UserComponent: React.FC<UserProps> = (props: PropsWithChildren<UserProps>) => {


    useEffect(() =>  {
      // DidMount
      console.log("User component is ready");
      return () => {
        console.log("User component is destroyed");
      }
    }, [])

    const result: JSX.Element = props.user !== null 
      ? (<div>User: {props.user.data.first_name} </div>)
      : (<div>No Content</div>)

    return (
        <div className="user-info">
          -Additional- {props.children} -Additional- 
          {result}
          {difficultTimer.secondsPassed}
        </div>
    );
  }

export default UserComponent