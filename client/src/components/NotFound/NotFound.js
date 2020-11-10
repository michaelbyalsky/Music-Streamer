import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'
import AuthApi from '../../helpers/context'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function NotFound() {
	const { loggedInValue } = React.useContext(AuthApi)
	const  [loggedIn, setLoggedIn] = loggedInValue 
	const history = useHistory()
	const handleClick = () => {
		let loggedIn = Cookies.get('token')
		if (loggedIn) {
			setLoggedIn(true)
			history.push('/')
		} else {
			setLoggedIn(false)
			history.push('/login')
		}
	}
    return (
        <section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		<button onClick={handleClick} href="" class="link_404">Go to Home</button>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
    )
}