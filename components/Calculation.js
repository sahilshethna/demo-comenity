import React, { Component } from 'react';
import $ from "jquery";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

class Calculation extends Component {

    constructor(props){
        super(props);
        let result = 0;
        props.fields.map((item,i)=>
            result += (item.field_value*item.percentage)/100,
        )
        const rows = props.fields.reduce(function (rows, data, index) { 
            return (index % 2 === 0 ? rows.push([data]) 
            : rows[rows.length-1].push(data)) && rows;
        }, []);

        // console.log(rows);
        result = Math.ceil(result)*12

        this.state = {
            result:result,
            textfields:rows,
            totaldiscount:0,
            allmsg:0,
            errormsg:'',
            iserror:0,
            isdiabled:false,
            classdisabled:''
        }
        this.valuecheck = this.valuecheck.bind(this);
    }

    valuecheck = (e , mainindex , i) => {
        e.preventDefault();
        const re = /^[0-9.\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let textfields = [ ...this.state.textfields ];
            textfields[mainindex][i] = {...textfields[mainindex][i], field_value: e.target.value};
            this.setState({ textfields , errormsg:'' , isdiabled:false , iserror:0 , classdisabled:'' });
        }
        let textfields = [ ...this.state.textfields ];
        let flag = 0;
        textfields.map((fields,index)=>
            fields.map((field,i)=>
                field.field_value !== '' && field.field_value !== 0 && field.field_value !== '0' && /^0*$/.test(field.field_value) !== true ? flag = 1 : ''
            )
        )
        flag === 0 ? this.setState({ textfields , isdiabled :true , classdisabled: 'disabled' , iserror:1, result:0 }) : this.setState({ textfields });
    }

    calculate = (event) => {
        event.preventDefault();
        this.setState({ iserror:0, errormsg : '' })

        let totaldiscount = 0;
        this.state.textfields.map((item,i)=>
            item.map((value,index)=>
                totaldiscount += (value.field_value * value.percentage)/100
            )
        )

            this.setresult(totaldiscount);

            if($(window).width() <= 1005){
                var target = $('.result-wrap');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
    }

    
    setresult(totaldiscount){
        this.state.iserror === 0 ? this.setState({result: Math.ceil(totaldiscount*12) }) : this.setState({result: 0 });
    }

    setfloat(e,index,i){
        let textfields = [ ...this.state.textfields ];
        textfields[index][i] = {...textfields[index][i] , field_value: Math.round(e.target.value) };
        this.setState({ textfields  });
    }

    setfocus(index,i){
        let textfields = [ ...this.state.textfields ];
        textfields[index][i] = {...textfields[index][i] };
        this.setState({ textfields  });
    }

    removeval(mainindex,childindex){
        let textfields = [ ...this.state.textfields ];
        textfields[mainindex][childindex] = {...textfields[mainindex][childindex], field_value: 0  };
        let flag = 0;
        textfields.map((fields,index)=>
            fields.map((field,i)=>
                field.field_value !== '' && field.field_value !== 0  && field.field_value !== '0' ? flag = 1 : ''
            )
        )
        flag === 0 ? this.setState({ textfields , isdiabled :true , classdisabled:'disabled', iserror:1, result:0 }) : this.setState({ textfields });
    }

    render() {
        return (
            <section className="calculator py-5">
            {
                this.props.fields.length !== 0 ?
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="title fontweightnormal" dangerouslySetInnerHTML={{__html:this.props.calculation.title}} />
                            <p className="discription"  dangerouslySetInnerHTML={{__html:this.props.calculation.discription}} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <h3 className="mb-4"  dangerouslySetInnerHTML={{__html:this.props.calculation.calculation_text}} />
                            <div className="form">
                                <form onSubmit={this.calculate} >
                                    {
                                        this.state.textfields.map((fields,index)=>
                                        <div key={index} className="row">
                                            {
                                                fields.map((field,i)=>
                                                <div key={i} className="col-md-6 mb-3">
                                                    <label htmlFor ={field.field_text}> {field.field_text}</label>
                                                    <span className="currency-code">$</span>
                                                    <input type="text" onChange={(e)=> this.valuecheck(e,index,i) } className={field.class}  alt={field.field_text} id={field.field_text} value={field.field_value} placeholder="0" required="" />
                                                    <span className="form-close">
                                                        {
                                                            field.field_value !== '' && field.field_value !== 0 && field.field_value !== '0' ?
                                                            <img onClick={(e)=>this.removeval(index,i)} src="assets/images/clear_field.svg" alt="click to clear the value" width="16" height="15" />
                                                            : ''
                                                        }
                                                    </span>
                                                </div>
                                                )
                                            }
                                        </div>
                                        )
                                    }   
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <button className={"btn btn-primary mr-4 "+this.state.classdisabled} disabled={this.state.isdiabled}  alt={this.props.calculation.btn_text} > {this.props.calculation.btn_text} </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    <div className="col-md-6">
                        <div className="row result-wrap">
                        
                            <div className="col-md-6 mb-3">
                                {
                                    this.state.iserror !== 0 ?
                                    <React.Fragment>
                                        <p className="result plus">With <span> $0 </span> in expenses, </p>
                                        <div className="resultZero">
                                            <p className="result" dangerouslySetInnerHTML={{__html : this.props.calculation.errormsg}} />
                                        </div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <p className="result plus"> Earn up to </p><h2 className="result plus"> <span> ${this.state.result.toLocaleString()}</span> </h2> <p className="result plus">in statement credits annually. </p>
                                        <div className="resultsValid">
                                            <span className="plus-sign"> + </span>
                                            <p className="result plus" dangerouslySetInnerHTML={{__html : this.props.calculation.resultdata1}} />
                                        </div>
                                    </React.Fragment>
                                }  

                            </div>
                            <div className="col-md-6 mb-3"> <LazyLoadImage src={this.props.calculation.image} alt={this.props.calculation.img_alt} effect="blur" width="226" height="224" /> </div>
                        </div>
                    </div>
                    </div>
                </div>
                :null
            }
            </section>
        );
    }
}

export default Calculation;