import {Link, useNavigate, useLocation} from 'react-router-dom';
import SideBar from './SideBar.jsx';
import Header from './Header.jsx';
import '../styles/profile.css';
import { useEffect, useState } from 'react';



export default function Profile() {

    return (
<>
    <div class="container">
        <SideBar/>
            <div className="profileMain">
                <div className="profileDashboard">
                    <Header title="Profile"/>
                </div>
                <div className='editInfo'>
                    <div className="profileImage">
                        <img class="rounded-circle shadow-4-strong" alt="avatar2" src='https://i.imgur.com/2uz4wi3.png' height='300' width='300' />
                    </div>
                    <div className="inputBars">
                        <input type="name" name="name" id="name" placeholder="name"/>
                        <input type="email" name="email" id="email" placeholder="email"/>
                        <input type="phone" name="phone" id="phone" placeholder="phone"/>
                        <input type="address" name="address" id="address" placeholder="address"/>

                    </div>
                </div>
            </div>
        </div>
</>

    )
};