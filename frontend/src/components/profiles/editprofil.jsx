import { useState } from 'react';


const EditProfileForm = () => {
    const navigate = useNavigate();
    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            UserName,
            Email,
            Password,
            firstName,
            lastName
        };
        fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/app/dashboard', { replace: true });
        });
    };


    return (
        <form>
            UserName:
            <input type="text" value={UserName} onChange={(event) => setUserName(event.target.value)} />
            Email:
            <input type="text" value={Email} onChange={(event) => setEmail(event.target.value)} />
            Password:
            <input type="text" value={Password} onChange={(event) => setPassword(event.target.value)} />
            First Name:
            <input type="text" value={firstName} onChange={(event) => setfirstName(event.target.value)} />
            Last Name:
            <input type="text" value={lastName} onChange={(event) => setlastName(event.target.value)} />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default EditProfileForm;


