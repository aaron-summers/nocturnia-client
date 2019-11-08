import React from 'react';
import { Card } from 'react-bootstrap';

export default class Spotlight extends React.Component {
    render() {
      return (
        <section>
          <Card className="spotlight-tags">
            <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                Spotlight
            </Card.Body>
          </Card>
        </section>
      );
    };
}