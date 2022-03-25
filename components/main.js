import axios from 'axios';
import React, { Component } from 'react';
import Homedata from '../components/Home';
import Calculation from '../components/Calculation'
import Faq from '../components/Faq'

class main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comenity: [],
            isdata: 0
        };
    }

    componentDidMount() {
        axios.get('https://html.staging.prismitsystems.com/comenity-mastercard/control/content.php?file=Data').then((response) => {
            this.setState({
                comenity: response.data,
                isdata: 1
            })
        });

        //  let mainwvo = document.createElement('script')
        // mainwvo.setAttribute('src', 'https://dev.visualwebsiteoptimizer.com/')
        // document.head.appendChild(mainwvo);
        // let wvo = document.createElement('script')
        // wvo.setAttribute('src', 'assets/js/vwo.js')
        // document.head.appendChild(wvo);
    }


    render() {
        //console.log(this.state.comenity);
        return (
            <div>
                {
                    this.state.isdata !== 0 ?
                        <React.Fragment>
                            <Homedata header={this.state.comenity.header} cookie_data={this.state.comenity.cookie_data} maindata={this.state.comenity.main_section} divdata={this.state.comenity.main_section} logolink={this.state.comenity.header.logo_link} mainbenefits={this.state.comenity.main_benefits}></Homedata>
                            <Calculation calculation={this.state.comenity.calculation} fields={this.state.comenity.calculation_fields} />
                            <Faq faq={this.state.comenity.faq} benefits={this.state.comenity.benefits} terms={this.state.comenity.terms} footer={this.state.comenity.footer} />
                        </React.Fragment>
                        : null
                }
            </div>
        );
    }
}

export default main;