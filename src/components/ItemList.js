import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import Pagination from './Pagination'

class ItemList extends Component {
    componentDidMount() {
        console.log("Inside componentDidMount")
        this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json');
    }

/*    componentDidUpdate(prevProps) {
        this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json');
    }*/

    render() {
        console.log("Inside render")
        console.log("this.props.items" + this.props.items)
        console.log(this.props.items)
        //console.log(this.props.names.data)
        //console.log(this.props.names.data)
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        if (typeof this.props.items === 'undefined' ) {
            return <p>Loading…</p>;
        }

        return (

        <div className="container">
        <h2>List of Ingredients</h2>
        <p>Added list of ingredients</p> 
        <Pagination />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Munit</th>
                  <th>Rate</th>
                  <th>Type of Ingredient</th>
                  <th>Density Kg/Lt</th>
                  <th>Density Pcs/Kg</th>
                  <th>Density Pcs/Lt</th>
                </tr>
              </thead>
              <tbody>
              {this.props.items.map((item,index) => (
                <tr>
                    <th> {index}</th>
                    <td> {item.id}</td>
                    <td> {item.name}</td>
                    <td> {item.munit}</td>
                    <td> {item.rate}</td>
                    <td> {item.typeofingredient}</td>
                    <td> {item.density_kg_per_lt}</td>
                    <td> {item.density_pcs_per_kg}</td>
                    <td> {item.density_pcs_per_lt}</td>
                </tr>
                ))}
              </tbody>
            </table>
        <Pagination />
        </div>
        );
    }
}

/*ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};*/

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));
