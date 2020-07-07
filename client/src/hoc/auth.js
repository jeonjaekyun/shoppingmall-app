import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent,option,adminRoute=null) {

    //option
    // true = 로그인 시에만 입장/ false = 비 로그인 시에만 입장/ null 로그인 유무와 상관없이 입장

    const dispatch = useDispatch();

    function AuthenticationCheck(props){
        useEffect(() => {
            dispatch(auth())
                .then(response => {
                    if(!response.payload.isAuth){
                        if(option){
                            props.history.push('/login')
                        }
                    }else{
                        if(adminRoute && !response.payload.isAdmin){
                            props.history.push('/');
                        }else{
                            if(!option){
                                props.history.push('/');
                            }
                        }
                    }
                })
        }, [props.history])

        return(
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}
