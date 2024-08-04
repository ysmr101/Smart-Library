import React, {useState} from 'react';
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';

const Login: React.FC = () => {
    const { login } = useAuth();
    const { signup } = useAuth();
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [usernameSignup, setUsernameSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [reenterPasswordSignup, setReenterPasswordSignup] = useState('');
  
    
    const navigate = useNavigate();


    const handleSubmitLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login(usernameLogin, passwordLogin);
            console.log('Login successful');
            navigate('/');
        } catch (error) {
            alert('Invalid login credentials')
            console.error('Error logging in', error);
        }
    };
    const handleSubmitSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        if (passwordSignup !== reenterPasswordSignup) {
            alert('Passwords do not match.');
            return;
        }
        try {
            await signup(usernameSignup, passwordSignup);
            console.log('Login successful');
            navigate('/');
        } catch (error) {
            alert('Signup failed')
            console.error('Error logging in', error);        }
    };

    return (
        <div className={styles.login_and_signup}>
            <form className={styles.login} onSubmit={handleSubmitLogin}>
                <p className={styles.text}>
                    Log in
                </p>
                <div className={styles.section_container}>
                        <div className={styles.section}>
                            <p className={styles.section_text}>
                                Email
                            </p>
                            <div className={styles.section_form}>
                                <input 
                                    className={styles.section_form} 
                                    type='text' 
                                    placeholder='example@pwc.com'
                                    onChange={(e) => setUsernameLogin(e.target.value)}
                                />                
                            </div>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.section_text}>
                                Password
                            </p>
                            <div className={styles.section_form}>
                                <input 
                                    className={styles.section_form} 
                                    type='password' 
                                    placeholder='Enter Password...'
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                />                
                            </div>                
                        </div>
                </div>
                <button className={styles.button}>
                    Log in
                </button>
            </form>
            <form className={styles.signup} onSubmit={handleSubmitSignup}>
                <p className={styles.text}>
                    Sign up
                </p>
                <div className={styles.section_container}>
                    <div className={styles.section}>
                        <p className={styles.section_text}>
                            Email
                        </p>
                        <div className={styles.section_form}>
                            <input 
                                className={styles.section_form} 
                                type='text' 
                                placeholder='example@pwc.com'
                                onChange={(e) => setUsernameSignup(e.target.value)}
                            />                
                        </div>
                    </div>
                    <div className={styles.section}>
                        <p className={styles.section_text}>
                            Password
                        </p>
                        <div className={styles.section_form}>
                            <input 
                                className={styles.section_form} 
                                type='password' 
                                placeholder='Enter Password...'
                                onChange={(e) => setPasswordSignup(e.target.value)}
                            />                
                        </div>   
                        <div className={styles.section_form}>
                            <input 
                                className={styles.section_form} 
                                type='password' 
                                placeholder='Re-Enter Password...'
                                onChange={(e) => setReenterPasswordSignup(e.target.value)}
                            />                
                        </div>              
                    </div>
                </div>
                <p className={styles.signup_notes}>
                Ensure password has:{'\n'}
                    {'    '}- 8 characters or more{'\n'}
                    {'    '}- At least one number{'\n'}
                    {'    '}- No symbols
                </p>
                <button className={styles.button}>
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Login