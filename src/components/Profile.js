import React from 'react';
import {withRouter} from 'react-router-dom';
import adapter from '../api/user/adapter';

class Profile extends React.Component {

    state = {
        user: {
            username: null,
            joined: null
        }
    }

    async componentDidMount() {
        console.log(this.props.match.params)
        const data = await adapter.fetchUser(this.props.match.params.username)
        if (!data.error) {
            const date = new Date(data.created)
            // console.log(data.created.toString())
            const month = date.toLocaleString("default", { month: "long" });
            const joined = `${month} ${date.getFullYear()}`;
            this.setState({user: {username: data.username, joined: joined} })
        } else {
            window.location.reload()
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.user.username}</h1>
                <h6>Joined <small>{
                    this.state.user.joined
                }</small></h6>
            </div>
        )
    }
}

export default withRouter(Profile)