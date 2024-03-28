import React, {useState} from 'react';

interface User {
    name: string;
    email: string;
    age: number;
}

const UserForm: React.FC = () => {
    const [userData, setUserData] = useState<User>({
        name: '',
        email: '',
        age: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hier kannst du die Daten an die CRUD-Operationen oder die Datenbank übergeben
        console.log('Gesendete Benutzerdaten:', userData);
        // Beispiel: saveUserData(userData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    E-Mail:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Alter:
                    <input
                        type="number"
                        name="age"
                        value={userData.age}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button type="submit">Absenden</button>
        </form>
    );
};

export default UserForm;