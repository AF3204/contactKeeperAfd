import React, {useState} from 'react'

const Login = () => {
    const[user, setUser] = useState({
        email:'',
        password:''
    })

    // Desconstructing
    const {name, email, password, password2} = user

    // Spread operator for user -> remeber the e.target
    const onChange = e =>setUser({
        ...user,
        [e.target.name]: [e.target.value]
    })

    const onSubmit = e =>{
        e.preventDefault();
        console.log('Register Submit')
    }
    // We are using JSX html.
    return (
        <div className='form-container'>
          <h1>
            Account <span className='text-primary'>Login</span>
          </h1>
          {/* htmlFor is used in JSX */}
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                id='email'
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                required
                minLength='6'
              />
            </div>
            <input
              type='submit'
              value='Login'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>
      );
}

export default Login