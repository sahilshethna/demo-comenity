import React, { Component } from 'react';
import $ from "jquery";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

class Faq extends Component {

    constructor(){
        super();
        this.state = {
        }
        this.showall = this.showall.bind(this)
        this.closeall = this.closeall.bind(this)
        
    }

    addclass(title){
      let data = title.toLowerCase();
      data = data.replace("&amp;","").replace(/\s+/g, "_");
      return data;
    }

    setbtnClass(index){
        if(index === 1 ){
            return 'btn btn-link';
        }
        return 'btn btn-link collapsed';
    }

    showall = (e) => {
        e.preventDefault();
        $('.card-header').find('.btn-link').removeClass('collapsed'); 
	    $('.collapse').addClass('show');
    }

    closeall = (e) => {
        e.preventDefault();
        
        $('.card-header').find('.btn-link').addClass('collapsed'); 
        $('.collapse').removeClass('show');
          var target = $('.faqsection');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
    }

    showbox(index){
        if(index === 1){
            return 'collapse show';
        }
        return 'collapse';
    }

    // Benefits
    marginadd(index){
      return index <= 2 ? 'mb-5' : ''
    }

    render() {
      // console.log(this.props.terms.description);
      // let tearms = this.props.terms.description
        return (
          <React.Fragment>
            <section className="faq faqsection py-5">
            <div className="container">
              <div className="row">
                {
                this.props.faq.length !== 0 ?
                <div className="col-md-12">
                  <h2 className="title fontweightnormal m-0"> {this.props.faq.title} </h2>
                  <div className="expand">
                    <ul className="my-4">
                      <li><button onClick={(e) => this.showall(e)} title="Button to expand all" className="showAccordianCards collapseexpand" > Expand All <span><LazyLoadImage src="assets/images/expand.svg" alt="Expand All" width="10" height="10" effect="blur" /></span></button></li>
                      <li><button onClick={(e) => this.closeall(e)}  title="Button to collapse all" className="hideAccordianCards collapseexpand"> Collapse All <span><LazyLoadImage src="assets/images/collapse.svg" alt="Collapse All" width="10" height="10" effect="blur" /></span></button></li>
                    </ul>
                  </div>

                  <div className="faqs">
                    <div className="accordion" id="accordionExample">
                      {
                        this.props.faq.questions.map((data,index)=>
                        <div key={index} className="card">
                            <div className="card-header" id={"heading"+(index+1)}>
                                <h3 className="mb-0">
                                <button className={this.setbtnClass(index+1)} type="button" data-toggle="collapse" data-target={"#collapse"+(index+1)}
                                    aria-expanded="false" aria-controls={"collapse"+(index+1)}>
                                    {data.title}
                                </button>
                                </h3>
                            </div>
                            <div id={"collapse"+(index+1)} className={this.showbox(index+1)} aria-labelledby={"heading"+(index+1)}
                                data-parent="#accordionExample">
                                <div className="card-body" dangerouslySetInnerHTML={{__html:data.description}} />
                            </div>
                        </div>   
                        )
                      }
                    </div>
                  </div>
      
                  <div className="expand">
                    <ul className="my-4">
                      <li><button onClick={(e) => this.showall(e)} title="Button to expand all" className="showAccordianCards collapseexpand" > Expand All <span><LazyLoadImage src="assets/images/expand.svg" alt="Expand All" width="10" height="10" effect="blur" /></span></button></li>
                      <li><button onClick={(e) => this.closeall(e)}  title="Button to collapse all" className="hideAccordianCards collapseexpand"> Collapse All <span><LazyLoadImage src="assets/images/collapse.svg" alt="Collapse All" width="10" height="10" effect="blur" /></span></button></li>
                    </ul>
                  </div>
                </div>
                :null
              }
              
                </div>
            </div>
      
          </section>

          <section className="cash-backBenefits pb-5">
            {
            this.props.benefits.length !== 0 ?
                <div className="container">
                    <h2 className="title fontweightnormal" dangerouslySetInnerHTML={{__html:this.props.benefits.title}} />
                    <div className="row mt-5">
                    {
                    this.props.benefits.list.map((data,index)=>
                        <div key={index} className={"col-md-6 benefits "+this.marginadd(index+1)}>
                            <div className="image"><LazyLoadImage src={data.logo} alt={data.title} effect="blur" width="80" height="63" /> </div>
                            <div className="content">
                                <h3 dangerouslySetInnerHTML={{__html:data.title}} />
                                <p dangerouslySetInnerHTML={{__html:data.description}} />
                            </div>
                        </div>
                    )
                    }
                    </div>
                </div>
            :null
            }
            </section>

            <React.Fragment>
            <section className="tearms py-5">
               <div className="container">
                        <h3 className="titlehed mb-5" dangerouslySetInnerHTML={{__html: this.props.terms.title }} />
                        <div dangerouslySetInnerHTML={{__html: this.props.terms.description }} ></div>
                    </div>
            </section>
            

            <div className="modal fade " id="terms" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title" id="exampleModalLongTitle"> Rates, Fees & Terms</p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"> <span aria-hidden="true"> <img src="assets/images/popup-close.svg" alt="" effect="blur" /> </span> </span>
                                </button>
                            </div>
                            <div className="modal-body" id="style-1" dangerouslySetInnerHTML={{__html:this.props.terms.model_data}} />
                        </div>
                </div>
            </div>
        </React.Fragment>



        <footer className="footer" aria-label="Comenity footer">
            <div className="container">
                <div className="footer__wrapper">
              <nav className="footer__navigation" role="navigation">
                <ul>
                {
                  this.props.footer.footermenu.map((item,i)=>
                  <li key={i}>
                      <a href={item.link} className={ this.addclass(item.title)} title="" dangerouslySetInnerHTML={{__html:item.title}} />
                  </li>
                  )
                }
                </ul>
            </nav>
            <small className="footer__copy"  dangerouslySetInnerHTML={{__html:this.props.footer.copyrighttext}} />
            </div>
        </div>
        </footer>
          </React.Fragment>

          
        );
    }
}

export default Faq;