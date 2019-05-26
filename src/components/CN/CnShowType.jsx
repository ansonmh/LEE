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
            Show: 'Null',
            SelectedName: "",
            PhotoUrl: [],
            ItemNameList: [],
            NaNavBarSeleect: this.props.NavBarSeleect
        };
        this.getAll();
        this.handleTypeChange = this.handleTypeChange.bind(this)
        console.log(this.props.NavBarSeleect)
    }

    getAll() {
        db.collection('TraditionalChinses').onSnapshot(coll => {
            const CnList = coll.docs.map(doc => doc.data().name)
            this.setState({ CnList })

        })
        db.collection('TraditionalChinses').onSnapshot(coll => {
            const PhotoUrl = coll.docs.map(doc => doc.data().photo)
            this.setState({ PhotoUrl })
            console.log(PhotoUrl)
        })
        db.collection('TraditionalChinses').onSnapshot(coll => {
            const ItemNameList = coll.docs.map(doc => doc.data().CnName)
            this.setState({ ItemNameList })
            console.log(ItemNameList)
        })

    }

    handleTypeChange(value) {
        console.log(value.topic);
        console.log(value.index);
        this.setState({ Show: value.topic })
        this.setState({ SelectedName: this.state.ItemNameList[value.index] })
    }

    // getSrcUrL() {
    //     // Create a reference to the file we want to download
    //     var photoRef = storageRef.child('photo');
    //     var nlRef = photoRef.child('Nylon Lace');
    //     var lRef = nlRef.child('list');
    //     console.log(lRef.child());
    //     var starsRef = lRef.child('W-LAC0001-0002.HEIC');


    //     var indexRef = storageRef.child('index');
    //     var stars2Ref = indexRef.child('images.jpeg');

    //     var path = starsRef.fullpath;
    //     console.log(starsRef);
    //     console.log(path);
    //     // Get the download URL
    //     stars2Ref.getDownloadURL().then(function (url) {
    //         //  var refURL = storage.refFromURL(url);
    //         var stringUrl = url;
    //         console.log("W :" + url);
    //         return stringUrl;
    //         // Insert url into an <img> tag to "download"
    //     }).catch(function (error) {
    //         // A full list of error codes is available at
    //         // https://firebase.google.com/docs/storage/web/handle-errors
    //         switch (error.code) {
    //             case 'storage/object-not-found':
    //                 console.log("File doesn't exist")
    //                 break;
    //             case 'storage/unauthorized':
    //                 console.log("User doesn't have permission to access the object")
    //                 break;
    //             case 'storage/canceled':
    //                 console.log("canceled ERROR")
    //                 break;
    //             case 'storage/unknown':
    //                 console.log("unknown ERROR");
    //                 break;
    //             default:
    //                 console.log("GG");
    //                 break;
    //         }
    //     });
    // }//end

    render() {

        if (this.props.NavBarSeleect !== null) {
            return (
                <div>
                    <h1><CnShowItem Selected={this.props.NavBarSeleect} SelectedName={this.props.NavBarSeleect} /></h1>
                </div>)
        }
        else if (this.state.Show !== 'Null') {
            return (
                <div>
                    <h1><CnShowItem Selected={this.state.Show} SelectedName={this.state.SelectedName} /></h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="display-3">產品類別:</h1>
                    <Row>
                        {this.state.CnList.map((topic, index) =>
                            <Col md={4} key={topic}>
                                <Card body>
                                    <CardImg top width="100%" src={this.state.PhotoUrl[index]} alt="No Image Found" />
                                    <CardTitle>{this.state.ItemNameList[index]}</CardTitle>
                                    <Button onClick={() => this.handleTypeChange({ topic, index })} >更多資訊</Button>
                                </Card>
                            </Col>)}
                    </Row>
                </div>
            )
        }

    }
}

export default CnShowType;
