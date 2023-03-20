import Body from "./Body";

export default class Animated extends Body{
    constructor(props){
        super(props)
        this.props = props;
    }
    create(){
        console.log(this.props)
      }
}