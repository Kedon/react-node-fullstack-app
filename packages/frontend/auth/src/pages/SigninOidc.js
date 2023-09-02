import React, { useEffect } from 'react'
import useAuth from '../hoc/useAuth';
import { useHistory } from 'react-router-dom'


function SigninOidc() {
    const { user, signinRedirectCallback } = useAuth();
    const history = useHistory()

    useEffect(() => {
        async function signinAsync() {
            if (user) {
                console.log('user', user)
            } else {
                console.log('o user não existe')
                await signinRedirectCallback().then(res => {
                    console.log('res', res)
                })
                  
          
            }
        }
        signinAsync()
    }, [history])

    return (
        <div className="d-flex flex-column h-100 w-100 position-absolute justify-content-center align-items-center">
            <h4 className="mt-2 font-weight-bold primary">Carregando o Omnyve </h4>
        </div>
    )
}

export default SigninOidc
