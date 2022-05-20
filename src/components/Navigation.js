const Navigation = ({loggedInUser, activateUser}) => {
    const logout = (e) => {
        e.preventDefault()
        activateUser("")
    }
    
    return (
        <nav>
            <a href="/">Home</a>
            <a href="/">About</a>
            { loggedInUser ?
                <>
                    {loggedInUser}
                    <a href="/" onClick={logout}>Logout</a>
                </>
               :
               <>
                    Guest
                    <a href="/">Login</a>
                    <a href="/">Sign Up</a>
               </>
                
            }
           
            

            
        </nav>
    )

}

export default Navigation