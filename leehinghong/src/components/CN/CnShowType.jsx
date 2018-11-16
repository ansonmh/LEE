import React, { Component } from 'react';
import {
    Card, CardImg,
    CardTitle, Button,
    Row, Col
} from 'reactstrap';
import { db } from '../../firebase';
import CnShowItem from './CnShowItem';

class CnShowType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CnList: [],
            Show:'Null'
        };
        this.getAll();
        this.handleTypeChange = this.handleTypeChange.bind(this)
    }

    getAll() {
        db.collection('TraditionalChinses').onSnapshot(coll => {
            const CnList = coll.docs.map(doc => doc.data().name)
            this.setState({ CnList })
          })
    }

    handleTypeChange(value){
        console.log(value.topic);
        this.setState({Show: value.topic})
    }

    render() {
        if(this.state.Show !== 'Null'){
            return (
                <div>
                    <h1><CnShowItem Show={this.state.Show} /></h1>
                </div>
            )
        }else{
        return (
            <div>
                <h1 className="display-3">產品類別:</h1>
                <Row>
                    {this.state.CnList.map((topic) =>
                        <Col md={4} key={topic}>
                            <Card body>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardTitle>{topic}</CardTitle>
                                <Button onClick={() => this.handleTypeChange({topic})} >更多資訊</Button>
                            </Card>
                        </Col>)}
                </Row>
            </div>
        )
    }
        
    }
}

export default CnShowType;
