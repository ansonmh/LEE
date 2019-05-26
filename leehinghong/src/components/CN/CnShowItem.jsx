import React, { Component } from 'react';
import { db } from '../../firebase';

class CnShowItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            Show:'Null'
        };
        this.getAll();
    }

    getAll() {
        db.collection('TraditionalChinses').doc(this.props.Show).onSnapshot(coll => {
            const CnList = coll.docs.map(doc => doc.data().name)
            this.setState({ CnList })
          })
    }

    render() {
        return(
            <div>
                <h1>{this.props.Show}</h1>
            </div>
        )
        
    }
}

export default CnShowItem;
