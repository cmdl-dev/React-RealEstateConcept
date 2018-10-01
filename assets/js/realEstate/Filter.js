import React,{Component} from 'react'

export default class Filter extends Component{
    constructor(){
        super()
        this.state = {
            name: 'Cesar'
        }
        this.city = this.city.bind(this);
        this.isEmpty = this.isEmpty.bind(this)
        this.homeTypes = this.homeTypes.bind(this);
        this.bedrooms = this.bedrooms.bind(this);
    }
    //see component life cycle for more 
    // will run before runder
    componentWillMount(){
        this.props.populateForms()

    }
    isEmpty( obj ){
        for ( var prop in obj ) { 
            return false; 
        } 
        return true; 
    }
    city(){
        if(!this.isEmpty(this.props.globalState.populateFormsData)){
            var cities = this.props.globalState.populateFormsData.cities
            return cities.map((item) => {
                return(
                    <option key={item} value={item}>{item}</option>
                )
            })
        }


    }
    homeTypes(){
        if(!this.isEmpty(this.props.globalState.populateFormsData)){
            var homeTypes = this.props.globalState.populateFormsData.homeTypes
            return homeTypes.map((item) => {
                return(
                    <option key={item} value={item}>{item}</option>
                )
            })
        }


    }
    bedrooms(){
        if(!this.isEmpty(this.props.globalState.populateFormsData)){
            var bedrooms = this.props.globalState.populateFormsData.bedrooms
            return bedrooms.map((item) => {
                return(
                    <option key={item} value={item}>{item}+ Bedrooms</option>
                )
            })
        }
    }
    render(){
        return (
            <section id="filter">
                <div className="insideFilter">
                    {/* Filters */}
                    <h4>Filter</h4>
                    <label htmlFor="city" >City</label>
                    <select name="city"className="filters city" onChange={this.props.change}>
                        <option value="All">All</option>
                        {this.city()}
                    </select>
                    <label htmlFor="homeType">Home Type</label>
                    <select name="homeType"className="filters homeType"onChange={this.props.change}>
                        <option value="All">All Homes</option>
                        {this.homeTypes()}
                    </select>
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <select name="bedrooms"className="filters bedrooms"onChange={this.props.change}>
                        {this.bedrooms()}
                    </select>
                    {/* Prices*/}

                    <div className="filters price">
                        <span className="title"> Price </span>
                        <input type="text" value={this.props.globalState.min_price} name="min_price" className="min-price"onChange={this.props.change}/>
                        <input type="text" value={this.props.globalState.max_price} name="max_price"className="max-price"onChange={this.props.change}/>
                    </div>
                    <div className="filters floor-space">
                        <span className="title"> Floor Space </span>
                        <input type="text" value={this.props.globalState.min_floor_space} name="min_floor_space"className="min-floor-space"onChange={this.props.change}/>
                        <input type="text" value={this.props.globalState.max_floor_space} name="max_floor_space"className="max-floor-space"onChange={this.props.change}/>
                    </div>
                    {/* Extras */}
                    <div className="filters extras">
                        <span className="title">Extras</span>
                        <label htmlFor="extras"> 
                            <span> Elevator </span> 
                            <input name="elevator" value="elevator" type="checkbox"onChange={this.props.change}/>
                        </label>
                        <label htmlFor="extras"> 
                            <span> Swimming Pool </span> 
                            <input name="swimming_pool" value="swimming_pool" type="checkbox"onChange={this.props.change}/>
                        </label>
                        <label htmlFor="extras"> 
                            <span> Finished Basement </span> 
                            <input name="finished_basement" value= "finished_basement" type="checkbox"onChange={this.props.change}/>
                        </label>
                        <label htmlFor="extras"> 
                            <span>Gym</span> 
                            <input name="gym" value= "gym" type="checkbox"onChange={this.props.change}/>
                        </label>
                    </div>
                </div>
                

            </section>

            )
    }
}