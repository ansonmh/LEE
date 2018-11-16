import React, { Component } from 'react';
import {
    Card, CardImg,
    CardTitle, Button,
    Row, Col
} from 'reactstrap';
import { db } from '../../firebase';

class CnShowType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            EnList: []
        };
        this.getAll();
    }

    getAll() {
        db.collection('English').onSnapshot(coll => {
            const EnList = coll.docs.map(doc => doc.data().name)
            this.setState({ EnList })
        })

    }

    render() {
        return (
            <div>
                <h1 className="display-3">Product category:</h1>
                <Row>
                    {this.state.EnList.map((topic, index) =>
                        <Col md={4}>
                            <Card body>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardTitle>{topic}</CardTitle>
                                <Button>More information</Button>
                            </Card>
                        </Col>)}
                </Row>
            </div>
        );
    }
}

export default CnShowType;
