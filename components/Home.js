import React, { Component } from 'react';
import $ from "jquery";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import TagManager from 'react-gtm-module'

class Home extends Component {

    constructor(){
        super();
        this.state = {
            applynowlink:'',
            isopen:false,
            isapplyvisible:0,
            iswbloaded:0
        }
        this.navbuttoncheck = this.navbuttoncheck.bind(this)
        this.isopen = this.isopen.bind(this)
        
    }

    componentDidMount(){


        const tagManagerArgs = {
            gtmId: 'GTM-KM3K36C'
        }
        TagManager.initialize(tagManagerArgs)

        // let mainwvo = document.createElement('script')
        // mainwvo.setAttribute('src', 'https://dev.visualwebsiteoptimizer.com/')
        // document.head.appendChild(mainwvo);
        // let wvo = document.createElement('script')
        // wvo.setAttribute('src', 'assets/js/vwo.js')
        // document.head.appendChild(wvo);

        let bootstrap = document.createElement('script')
        bootstrap.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js');
        document.body.appendChild(bootstrap);

        let paramsdata = (new URL(document.location)).searchParams;
            const urlSearchParams = new URLSearchParams(window.location.search);
            let params = Object.fromEntries(urlSearchParams.entries());
            let paramsname = Object.keys(params);

            let applynowlink = 'https://acquire1.comenity.net/?clientName=comenitycard';

            paramsname.length !== 0 ?
                paramsname.map((name,index)=>
                    applynowlink = applynowlink + "&"+ name + "=" + paramsdata.get(name)
                )
            :
            applynowlink = applynowlink + "&channel=L&subChannel=Q"

            let combi = 0 ;
            var cookieArr = document.cookie.split(";");
            for(var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");
                // if(this.props.cookiedata.name === cookiePair[0].trim()) {
                //     combi = parseInt(decodeURIComponent(cookiePair[1]));
                // }
            }
            
            if(combi === 1){
                applynowlink = applynowlink + "&referrerid=c"
            }else if(combi === 2){
                applynowlink = applynowlink + "&referrerid=v1"
            }else if(combi === 3){
                applynowlink = applynowlink + "&referrerid=v2"
            }else{}

            this.setState({ iswbloaded:1 , applynowlink :applynowlink })

        window.addEventListener('scroll', this.handleScroll, true);

    }

    handleScroll = () => {

        let sticky = $('.fixdiv');
        if($(window).width() > 768){
            let scroll = $(window).scrollTop();
            
            if(sticky.hasClass('fixedmobile')) sticky.removeClass('fixedmobile');
            if (scroll >= 520) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        }
        else{
            sticky = $('.fixdiv'); sticky.removeClass('fixed').addClass('fixedmobile');
        }

        let lastScrollY = window.scrollY;
        if(lastScrollY >= 445){
            this.state.isapplyvisible !== 1 ?
            this.setState({ isapplyvisible: 1 })
            : this.setState({})
        }
        else{
            this.state.isapplyvisible !== 0 ? 
            this.setState({ isapplyvisible: 0 })
            : this.setState({})
        }
      }

    // HEADER
    expandable(submenu){
        return submenu.length !== 0 ? 'expanded' : ''
    }

    navbuttoncheck(){
        this.state.isopen === false ? this.setState({ isopen : true }) : this.setState({ isopen: false })
    }

    isopen(){
        return this.state.isopen === false ? '' : 'open';
    }

    // HOME
    prevurl(){
        // console.log(document.referrer);
        //return document.referrer.includes('comenity') ? 1 : 0;
        return 1;
    }

    appynowlink(other,main){
        return document.referrer.includes('comenity') ? main : other;
    }


    // FIXDIV
    fixmobile(){
        // if($(window).width() < 768){
        //     return 'fixedmobile';
        // }
        return '';
    }


    addclass(title){
        let data = title.toLowerCase();
        data = data.replace(/\s+/g, "_");
        return data;
    }


    render() {
         //console.log(this.props);
         //console.log(this.props.header.logo);
        return (
            <React.Fragment>
            
            <header className="site-header" role="banner">
                <div id="navigation" className="nav">
                    <div className="container">
                    <div className="nav__wrapper">
                    <a href={this.props.header.logo_link} className="nav__logo" title="Comenity">
                        <img className="nav__logo-image" src={this.props.header.logo} alt={this.props.header.logo_alt} />
                    </a>
        
                    <button onClick={this.navbuttoncheck} className={"nav__button "+this.isopen()} type="button" aria-label="tap to open main navigation" aria-expanded="false" aria-controls="mainNavigation">
                        <span className="nav__button-bar" aria-hidden="true"></span>
                        <span className="nav__button-bar" aria-hidden="true"></span>
                        <span className="nav__button-bar" aria-hidden="true"></span>
                    </button>

                    <nav id="mainNavigation" className={"nav__nav "+this.isopen()} aria-label="Comenity navigation" role="navigation">
                        <ul className="main-nav">
                        {
                            this.props.header.menu.map((item,index)=>
                                <li key={index} className={"main-nav__item main-nav__item--link " + this.expandable(item.submenu)} data-nav-menu-item>
                                    <a href={item.link} className={"main-nav__link "+this.addclass(item.title)}> {item.title} <span aria-hidden="true"></span></a>
                                    {
                                    item.submenu.length !== 0 ?
                                        <ul className="main-nav">
                                        {
                                            item.submenu.map((subitem,i)=>
                                            <li key={i} className="main-nav__item main-nav__item--link" data-nav-menu-item>
                                                <a href={subitem.link} className={"main-nav__link "+this.addclass(subitem.title)}> {subitem.title} </a>
                                            </li>
                                            )
                                        }
                                        </ul>
                                    :null
                                    }
                                </li>
                            )
                        }
                            </ul>
                            <button type="button" className="main-nav__item--button" aria-expanded="false" aria-controls="accountdetails" data-account-search-open="" onClick={ ()=> window.location.href = this.props.header.account_btn_link }>Your Account</button>
                    </nav>
                    </div>
                    </div>
                </div>
            </header>


            
            <main role="main">
                    
                    <section className="hero-banner py-2">
                        <div className="container">
                            
                            <div className="row">
                            
                                <div className="col-md-7">
                                {
                                    //this.prevurl() === 1 ? <p className="back"><a href={document.referrer} title="Back" dangerouslySetInnerHTML={{__html:"< Back"}} /> </p> : ""
                                }
                                
                                    <h1 className="card-name" dangerouslySetInnerHTML={{__html:this.props.maindata.subtitle}} />
                                    <h2 className="title" dangerouslySetInnerHTML={{__html:this.props.maindata.title}} />
                                    <p className="discription" dangerouslySetInnerHTML={{__html:this.props.maindata.description}} />
                                   
                                    <p> <a className="btn btn-primary" href={this.state.applynowlink} title="Click apply now button here to start your Comenity Mastercard application"> Apply Now </a>  </p>
                                    
                                    <p className="alreadylogin"> {this.props.maindata.apply_now_subtitle} <a className="loginlink" href={this.props.maindata.login_link} title="Log In"> {this.props.maindata.login_text} </a> </p>

                                    <p className="link"> <button className="hero_ratesterms buttonlink" data-toggle="modal" data-target="#terms" title="Rates, Fees & Terms +"> {this.props.maindata.details_text} </button> </p>
                                    
                                </div>
                                <div className="col-md-5 text-center">
                                    <div className="image">
                                    {
                                       <img src={this.props.maindata.card_image} rel="preload" alt={this.props.maindata.cardimg_alt} width="445" height="415" />
                                    }
                                        
                                    </div>
                                    <div className="text">
                                    {
                                        this.props.maindata.card_subtitle_image !== "" ?
                                        <p className="text-right m-0"> <LazyLoadImage  effect="blur" src={this.props.maindata.card_subtitle_image} alt="" width="17" height="21" />  </p>
                                        :null
                                    }
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </section>  
                   
            </main>



            <section className={"fixdiv "+this.fixmobile()}>
                <React.Fragment>
                <div className="fix-logo"> <a href={this.props.logolink} title="Comenity"> <LazyLoadImage  effect="blur" src={this.props.divdata.logo} alt="Comenity" /> </a> </div>
                    <div className="fixright-div">
                    <p> <a className="btn btn-primary" href={this.state.applynowlink} title="Apply for comenity credit card"> Apply Now </a></p>
                        <p className="link"> <button className="buttonlink" data-toggle="modal" data-target="#terms" title="Rates, Fees & Terms +">  {this.props.divdata.details_text} </button> </p>    
                    </div>
                <div className="clearfix"></div>
                </React.Fragment> 
            </section>
             

            <section className="benefits py-5">
            
                <div className="container">
                <h2 className="benefits_title" dangerouslySetInnerHTML={{ __html:this.props.mainbenefits.benefit_title }} />
                    <div className="row">
                    {
                        this.props.mainbenefits.benefit_list.map((list,index)=>
                            <div key={index} className="col-md-4">
                                {
                                    list.img !== '' ?
                                    <p className="imagedetails"><LazyLoadImage  effect="blur" src={list.img} alt={list.alt} width="59" height="73" /></p>
                                    : null
                                }
                                {
                                    list.text !== '' && list.value !== '' ?
                                    <h2 className="value"> {list.value}  <span className="value-text"> {list.text} </span> </h2>
                                    : 
                                    <h2 className="value"> <span className="value-text"> {list.text} </span> </h2>
                                }
                                
                                <p className="details" dangerouslySetInnerHTML={{__html:list.description}} />
                            </div>
                        )
                    }
                    </div>
    
                    <div className="bonus-highlighted">
                        <div className="bonus text-center mb-md-5">
                            <h2 dangerouslySetInnerHTML={{__html:this.props.mainbenefits.bonus_title}} />
                        </div>
                        <div className="description">
                            <p className="m-0" dangerouslySetInnerHTML={{__html:this.props.mainbenefits.bonus_description}} />
                        </div>
                    </div>

                </div>
               
            </section>



            </React.Fragment>
        );
    }
}





export default Home;