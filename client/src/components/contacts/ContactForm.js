import React, {useState, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    // Using Context
    const contactContext = useContext(ContactContext);
    
    // Setting the state to detect changes as well as the default state
    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    })

    // Destructuring
    const{ name, email, phone, type} = contact

    // OnChange. e-> event parameter; name:target-> based on the input box
    // setContact here cause it changed state. Remember that
    const onChange = e =>setContact({
        ...contact,
        [e.target.name]: e.target.value
    })
    
    // OnSubmit -> send to context
    const onSubmit = e =>{
        // No default submission
        e.preventDefault()
        // Using Context
        contactContext.addContact(contact)
        // Once send, we reset
        setContact({
            name:'',
            email:'',
            phone:'',
            type:'personal'
        })
    }

    return (
        <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
            Add Contact
        </h2>
        <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
        />
        <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
        />
        <input
            type='text'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={onChange}
        />
        <h5>Contact Type</h5>
        <input
            type='radio'
            name='type'
            value='personal'
            checked={type === 'personal'}
            onChange={onChange}
        />{' '}
        Personal{' '}
        <input
            type='radio'
            name='type'
            value='professional'
            checked={type === 'professional'}
            onChange={onChange}
        />{' '}
        Professional
        <div>
            <input
            type='submit'
            value={'Add Contact'}
            className='btn btn-primary btn-block'
            />
        </div>
        
        </form>
    )
}

export default ContactForm