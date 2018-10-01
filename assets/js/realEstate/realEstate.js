import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Filter from './Filter'
import Listings from './Listings'
import listingsData from './data/listingsData';

class App extends Component{
    constructor(){
        super()
        this.state = {
            listingsData,
            city: 'All',
            homeType: 'All',
            bedrooms: '0',
            min_price: 0,
            max_price: 1000000,
            min_floor_space: 0,
            max_floor_space: 50000,
            elevator: false,
            finished_basement: false,
            gym: false ,
            swimming_pool: false,
            filteredData: listingsData,
            populateFormsData: {},
            sortby: 'price-dsc',
            view: 'long',
            search: '',
        }
        this.change = this.change.bind(this)
        this.changeView = this.changeView.bind(this)
        this.filterData = this.filterData.bind(this)
        this.populateForms = this.populateForms.bind(this)
    }
    componentWillMount(){
        var listingsData = this.state.listingsData.sort((a,b) =>{
            return a.price - b.price
        })
        this.setState({
            listingsData

        })
    }

    change(event){
        var name = event.target.name
        var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
        this.setState({
            //we are adding a new state
            [name]: value
        },() => {
            console.log(this.state)
            this.filterData()
        })
    }
    changeView(viewName){
        this.setState({
            view: viewName

        })
    }

    filterData(){
        var newData = this.state.listingsData.filter((item) => {
            return item.price >= this.state.min_price && 
                    item.price <= this.state.max_price &&
                    item.floorSpace >= this.state.min_floor_space && 
                    item.floorSpace <= this.state.max_floor_space &&
                    item.rooms >= this.state.bedrooms
        })

        if(this.state.city != "All"){
            newData = newData.filter((item) => {
                return item.city == this.state.city
            })
        }

        if(this.state.homeType != "All"){
            newData = newData.filter((item) => {
                return item.homeType == this.state.homeType
            })
        }

        if(this.state.sortby == "price-dsc"){
            newData = newData.sort((a,b)=>{
                return a.price - b.price

            })
        }

        if(this.state.sortby == "price-asc"){
            newData = newData.sort((a,b)=>{
                return b.price - a.price

            })
        }
        
        if(this.state.elevator){
            newData = newData.filter((item) => {
                if(item.extras.includes('elevator')){
                    return item
                }
            })
        }
        if(this.state.swimming_pool){
            newData = newData.filter((item) => {
                if(item.extras.includes('swimming pool')){
                    return item
                }
            })
        }
        if(this.state.finished_basement){
            newData = newData.filter((item) => {
                if(item.extras.includes('finished basement')){
                    return item
                }
            })
        }
        if(this.state.gym){
            newData = newData.filter((item) => {
                if(item.extras.includes('gym')){
                    return item
                }
            })
        }

        if(this.state.search != ''){
            newData = newData.filter((item) => {
                var city = item.city.toLowerCase()
                var searchText = this.state.search.toLowerCase()
                var n = city.match(searchText)

                if(n != null){
                    return true
                }

            })
        }

        this.setState({
            filteredData: newData
        })

    }

    populateForms(){
        //City
        var cities = this.state.listingsData.map((item)=>{
            return item.city
        })
        //remove duplicates
        cities = new Set(cities)
        cities = [...cities]
        cities = cities.sort()

        //Hometype
        var homeTypes = this.state.listingsData.map((item)=>{
            return item.homeType
        })
        homeTypes = new Set(homeTypes)
        homeTypes = [...homeTypes]
        homeTypes = homeTypes.sort()

        //bedrooms
        var bedrooms = this.state.listingsData.map((item)=>{
            return item.rooms
        })
        bedrooms = new Set(bedrooms)
        bedrooms = [...bedrooms]
        bedrooms = bedrooms.sort()
        this.setState({
            populateFormsData:{
                homeTypes,
                cities,
                bedrooms
            }
        },()=> console.log(this.state))
    }

    render(){
        console.log(this.state.listingsData);
        return (
            <div> 
                <Header />
                <section id="content-area">
                    <Filter change={this.change} populateForms={this.populateForms} globalState={this.state}/>
                    <Listings change={this.change} changeView={this.changeView} globalState={this.state} listingsData={this.state.filteredData}/>
                </section>
            </div>
           )
    }
}

const app = document.getElementById('app')

ReactDOM.render(<App />, app)