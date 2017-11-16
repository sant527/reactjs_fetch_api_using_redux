import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import Pagination from 'react-js-pagination'

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.handlePageChange=this.handlePageChange.bind(this)
  }


    componentDidMount() {
        console.log("Inside componentDidMount")
        this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json');
    }

/*    componentDidUpdate(prevProps) {
        this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json');
    }*/

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json&page='+pageNumber);
    }    

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
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.props.page_size}
          totalItemsCount={this.props.count}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
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
                    <th> {(index+1)+((this.state.activePage-1)*(this.props.page_size))}</th>
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
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.props.page_size}
          totalItemsCount={this.props.count}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
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
        items: state.data.results,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        count: state.data.count,
        page_size: state.data.page_size
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));
