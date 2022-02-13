import { User } from '../models/User.model';
import { useContext, useEffect } from 'react';
import { ValueContent } from '../AppComponent';

type UserProps = {
  user: User| null 
};

const UserComponent: React.FC<UserProps> = (props: UserProps) => {

    const valueData = useContext(ValueContent);
    console.log("valueData");
    console.log(valueData);

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
          {result}
        </div>
    );
  }

export default UserComponent