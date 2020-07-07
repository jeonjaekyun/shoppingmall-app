import React from 'react';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {

    return (
        <div style={{
            width:"100%", height:'70vh', display:'flex', justifyContent:'center', 
            alignItems:'center',flexDirection:'column'}}>

            Hello Ours Shopping Mall!!<br/><br/>
        </div>
    )
}

export default withRouter(LandingPage);
