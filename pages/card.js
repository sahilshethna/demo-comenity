import Homedata from '../components/Home';
import Calculation from '../components/Calculation'
import Faq from '../components/Faq'

export default function card({users}) {
  // console.log(users.main_section);
  return (
    <>
    <Homedata header={users.header} cookie_data= {users.cookie_data} maindata= {users.main_section} divdata = {users.main_section} logolink={users.header.logo_link} mainbenefits = {users.main_benefits}></Homedata>
    <Calculation calculation = {users.calculation} fields = {users.calculation_fields} />
    <Faq faq = {users.faq} benefits = {users.benefits} terms = {users.terms} footer = {users.footer}  />
    </>
  )
}

export async function getData() {
    const response = await fetch('https://html.staging.prismitsystems.com/comenity-mastercard/control/content.php?file=Data');
    const jsonData = await response.json()
    return jsonData
}

export async function getServerSideProps() {
  //const response = await fetch('http://localhost/demo-comenity/control/content.php?file=Data');
  //const response = await fetch('https://html.staging.prismitsystems.com/comenity-mastercard/control/content.php?file=Data')
  const data = await getData()
  //console.log(data);
  return{
    props:{
      users:data
    }
  }
}