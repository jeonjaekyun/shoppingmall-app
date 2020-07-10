import React from 'react';
import MainImage from './Sections/MainImage';
import Main from '../../commons/images/main1.jpg';
import Category from './Sections/CategoryPage';

function LandingPage(props) {

    return (
        <div style={{ width: '100%', margin: '0' }}>
             <div style={{width:'85%', margin:'1rem auto'}}>
                <MainImage image={Main}
                    title='K-MART' desc='식자재를 판매하는 온라인 쇼핑몰 입니다.'/>
                <br/>
                <hr/>
                <h2>채소</h2>
                <hr/>
                <Category categoryNumber={1}/>
                <br/>
                <hr/>
                <h2>과일</h2>
                <hr/>
                <Category categoryNumber={2}/>
            </div>
        </div>
    )
}

export default LandingPage;
