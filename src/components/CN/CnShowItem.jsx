import React, { Component } from 'react';
import { db } from '../../firebase';
import {
    Card, CardImg,
    CardTitle, Button,
    Row, Col
} from 'reactstrap';
import { Form, Dialog, Notification } from 'element-react';
import 'element-theme-default';
import Magnifier from "react-magnifier";
import { get } from 'https';

class CnShowItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            Show: 'Null',
            PhotoUrl: [],
            isShowModal: false,
            showDetailsDialog: false,
            SelectedImg:""
        };
        this.getAll();
    }

 componentDidMount(){
    db.collection('TraditionalChinses').doc(this.props.Selected).collection(this.props.Selected).onSnapshot(coll => {
        const itemList = coll.docs.map(doc => doc.data().ID)
        const PhotoUrl = coll.docs.map(doc => doc.data().photo)
        this.setState({ itemList })
        this.setState({ PhotoUrl })
        console.log(itemList);
        console.log(PhotoUrl);
    })
 }
// componentDidMount(){
//     this.getAll();
// }


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


    render() {
        // console.log(this.props);//
        return (
            <div>
                <h1>{this.props.SelectedName}</h1>

                <Row>
                    {this.state.itemList.map((topic, index) =>
                        <Col md={4} key={topic}>
                            <Card body>
                                <CardImg top width="100%" src={this.state.PhotoUrl[index]} alt="No Image Found" />
                                <CardTitle>{topic}</CardTitle>
                                <Button onClick={() => this.setState({ showDetailsDialog: true, SelectedImg:this.state.PhotoUrl[index] })} >
                                Details
                                </Button>
                            </Card>
                        </Col>)
                    }
                </Row>


                    <Dialog
                        title="Product Details"
                        visible={this.state.showDetailsDialog}
                        onCancel={() => this.setState({ showDetailsDialog: false })}
                        size="large"
                        customClass="dialog"
                    >
                        <Dialog.Body>
                            <Form labelPosition="top">
                                <Form.Item>
                                {/* <CardImg top width="100%" src={this.state.SelectedImg} alt="No Image Found" /> */}
                                <Magnifier  src={this.state.SelectedImg}/>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => this.setState({ showDetailsDialog: false })}>
                                Cancel
                        </Button>
                        </Dialog.Footer>
                    </Dialog>
                
            </div>
        )

    }
}

export default CnShowItem;
