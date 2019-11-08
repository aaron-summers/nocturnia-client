import React from "react";

import { Card } from "react-bootstrap";
import adapter from "../api/auth/adapter";
import Loading from "./Loading";

export default class ActionBar extends React.PureComponent {
//   state = {
//     self: null
//   };

//   async componentDidMount() {
//     await adapter.getSelf(localStorage.x_tn).then(data =>
//       this.setState({
//         self: {
//           id: data._id,
//           avatar: data.avatar,
//           display: data.displayName,
//           username: data.username
//         }
//       })
//     );
//   }

  render() {
    return (
    //   <div className="panel">
          <section>
          <Card className="action-bar">
            {/* <Card.Body> */}
                <section className="text-post">
                    Story
                </section>
                <section className="story-post">
                    Social
                </section>
                <section className="image-post">
                    Journal
                </section>
                {/* <section className="extra-post">
                    null
                </section> */}
            {/* </Card.Body> */}
          </Card>
          </section>
    //   </div>
    );
  }
}
