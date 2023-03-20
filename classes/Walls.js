import Body from "./Body";

export default class Walls extends Body{
    options = {
        animate: false,
        name: this.name,
        type: "ascasc"
    }
      
  constructor(props){
    super(props) 
    super.options = this.options;
  }
   

   
   
}