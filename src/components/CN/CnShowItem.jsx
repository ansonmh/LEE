import React, { Component } from 'react';
import { db } from '../../firebase';
import {
    Card, CardImg,
    CardTitle, Button,
    Row, Col
} from 'reactstrap';

import CnModal from './CnModal';

class CnShowItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            Show: 'Null',
            PhotoUrl: [],
            isShowModal: false,
        };
        this.getAll();
    }

    getAll() {
        db.collection('TraditionalChinses').doc(this.props.Selected).collection(this.props.Selected).onSnapshot(coll => {
            const itemList = coll.docs.map(doc => doc.data().ID)
            const PhotoUrl = coll.docs.map(doc => doc.data().photo)
            this.setState({ itemList })
            this.setState({ PhotoUrl })
            console.log(itemList);
            console.log(PhotoUrl);
        })
    }


    showModal = () => {
        this.setState({isShowModal:!this.state.isShowModal});
        console.log(this.state.isShowModal);
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                <h1>{this.props.Selected}</h1>

                <Row>
                    {this.state.itemList.map((topic, index) =>
                        <Col md={4} key={topic}>
                            <Card body>
                                <CardImg top width="100%" src={this.state.PhotoUrl[index]} alt="No Image Found" />
                                <CardTitle>{topic}</CardTitle>
                                <Button onClick={() => this.showModal()} ></Button>
                            </Card>
                        </Col>)
                    }
                </Row>
                <CnModal>
                </CnModal>
            </div>
        )

    }
}

export default CnShowItem;
