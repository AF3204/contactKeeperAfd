import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    // Using Context
    const contactContext = useContext(ContactContext);
    // 20210806 - Destructuring
    const {addContact, updateContact, clearCurrent, current} = contactContext
    
    /**
     * 20210806 - useEffect -> This hook will check if current has been changed
     * 20210806 - Add dependencies at the end, so that only when it happens
     *            that we do the edit etc
     */
    useEffect(()=>{
        if(current !== null){
            setContact(current)
        }else{
            // 20210806 - Nullify if current is empty
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            })
        }
    }, [contactContext, current])

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

    /**
     * 20210806 - Clear All functionality
     */
    const clearAll = () =>{
        clearCurrent()
    }


    // OnSubmit -> send to context
    const onSubmit = e =>{
        // No default submission
        e.preventDefault()
        // Using Context
        // addContact(contact)
        // 20210806 - Update if current is not null
        if(current !== null){
            updateContact(contact)
            clearCurrent()
        }else{
            addContact(contact)
        }
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
            {/* 20210806 - Changing from static title to Dynamic title */}
            {/* Add Contact */}
            {current ? 'Edit Contact' : 'Add Contact'}
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
            value='Personal'
            checked={type === 'personal' || type === 'Personal'}
            onChange={onChange}
        />{' '}
        Personal{' '}
        <input
            type='radio'
            name='type'
            value='Professional'
            checked={type === 'professional' || type === 'Professional'}
            onChange={onChange}
        />{' '}
        Professional
        <div>
            {/* 20210806 - Submit title changes as well */}
            <input
            type='submit'
            value={current ? 'Edit Contact' : 'Add Contact'}
            className='btn btn-primary btn-block'
            />
        </div>
            {current && <div>
                <button className='btn btn-light btn-block' onClick={clearAll}>Clear All</button>
            </div>}
        </form>
    )
}

export default ContactForm