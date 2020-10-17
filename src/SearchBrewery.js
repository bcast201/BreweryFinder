import React from "react";
import axios from "axios";
import { Container, Form, FormGroup, Input, Card, CardTitle, CardBody, CardSubtitle, Button, CardText } from 'reactstrap';

export default class extends React.Component {
  state = {
    // type: null,
    inputVal: "",
    breweries: [],
    err: null
  };

  handleType = (e) => {
    this.setState({
      type: e.target.name
    });
  };

  handleChange = (e) => {
    this.setState({
      inputVal: e.target.value
    });
  };

  submitSearch = (e) => {
    const baseUrl = "https://api.openbrewerydb.org/breweries";
    const byCity = "?by_city=";
    // const byState = "?by_state";
    let customUrl = `${baseUrl}${byCity}${this.state.inputVal}`

    // switch (this.state.type) {
    //   case "byCity":
    //     customUrl = `${baseUrl}${byCity}${this.state.inputVal}`;
    //     break;
    //   default:
    //     customUrl = baseUrl;
    //     break;
    // }

    console.log("customUrl: ", customUrl);
    axios(customUrl)
      .then((res) => {
        this.setState({
          breweries: res.data
        });
      })
      .catch((err) => {
        this.setState({
          err
        });
      });
  };

  render() {
    const disableBtn =
      this.state.inputVal && this.state.inputVal.length > 0
        ? false
        : true;

   
    

    return (
      <div>
        <Container fluid className='mainContainer'>
          <div className='inputFieldContainer'>
            <div className='inputFieldText'>
                <h1 className='titleText'>Discover Breweries!</h1>
                <Form>
                  <FormGroup>
                    <Input className='w-50 smaller-input centerBox' type='text' name='byCity' id='byCity' placeholder='Search by City' onChange={this.handleChange}
                  value={this.state.inputVal} />
                  </FormGroup>
                </Form>
                <Button onClick={
                  this.submitSearch}
                 disabled={disableBtn}
                 >
                  Submit
                </Button>
                <break></break>
                <p className='helper'>Scroll down to see results!</p>
              </div>     
          </div>
        </Container>


        <Container className='resultsContainer'>
          {this.state.err && <h1>No Breweries Found</h1>}


          {/* Results */}
          {this.state.breweries && this.state.breweries.length > 0 && (    
            <ol>
              {this.state.breweries.map((brewery) => (
                <li style={{ listStyle: "none" }} key={brewery.id}>
                  <Card className='card-style'>
                    <CardBody>                     
                        <a className='link-style'
                          href={brewery.website_url}
                          content="brewery url"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <CardTitle>{brewery.name}</CardTitle>
                        </a>
                        <CardSubtitle className='subtitle-style'>{brewery.city},</CardSubtitle>
                        <CardSubtitle className='subtitle-style'>{brewery.state}</CardSubtitle>

                       
                        <CardText className='address-style'>{brewery.street}</CardText>
                        
                    </CardBody>
                  </Card>
                </li>
              ))}
            </ol>
          )}
          </Container>
      </div>
    );
  }
}


