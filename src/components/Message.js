import { Card, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Message = ({message}) => {
    return (
       
        <Card>
            <CardContent>
                <Link to={`/messages/${message.id}`} style={{textDecoration: 'none'}}>
                    <Typography variant='h5'>{message.text}</Typography>
                </Link>
                <Link to={`/messages/user/${message.username}`}>
                    <Typography variant='p'>{message.username}</Typography>
                </Link>
                <Typography variant='p'>{message.posted}</Typography>
            </CardContent>    
        </Card>
        
    )

}

export default Message