import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, itemsFetchDataSortBy, itemcolumnfilter } from '../actions/items';
import Pagination from 'react-js-pagination'
import LoadingBar from 'react-redux-loading-bar'
import Time from 'react-time'


export class Header extends React.Component {
  render() {
    return (
      <header>
        <LoadingBar style={{ backgroundColor: '#337ab7', height: '2px' }} updateTime={100} maxProgress={90} progressIncrease={1} />
      </header>
    )
  }
}

class ItemList extends Component {
  constructor(props) {
    super(props);
/*    this.state = {
      activePage: 1
    };*/
    this.handlePageChange=this.handlePageChange.bind(this)
    this.handleColumnSort=this.handleColumnSort.bind(this)
    this.handleColumnSortCss=this.handleColumnSortCss.bind(this)
    this.onChangeHandler=this.onChangeHandler.bind(this)

    this.state = {isToggleOn: true};

  }

  handleColumnSort(column){
    var ascordesc;
    if (this.props.sort_order === null){
      ascordesc = ""
    }
    else{
      ascordesc = this.props.sort_order === "-" ? "" : "-";
    }
    const url = `http://127.0.0.1:8000/api/ingredients?ordering=${ascordesc}${column}`
    console.log("column",column)
    console.log("ascordesc",ascordesc)
    console.log("url",url)
    this.props.fetchDatasortby(column,ascordesc,url)
  }

  handleColumnSortCss(column){
/*    console.log("column----------",column)*/
    var css;
    if (this.props.sort_column === null){
      css = "fa-sort"
    }
    else{
      if(this.props.sort_column === column){
        css = this.props.sort_order === "-" ? "fa-sort-asc" : "fa-sort-desc";
      }
      else{
        css = "fa-sort"
      }
    }
    return css
  }




  componentDidMount() {
      console.log("Inside componentDidMount")
      this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json');
  }

/*    componentDidUpdate(prevProps) {
        this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json');
    }*/

    handlePageChange(pageNumber) {
/*        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});*/
        this.props.fetchData('http://127.0.0.1:8000/api/ingredients/?format=json&page='+pageNumber);
    }


    onChangeHandler(column,e){
      console.log(e.target.value);
      this.props.itemcolumnfilter(column,e.target.value)

      /*var newArray = this.state.users.filter((d)=>{
        return d.indexOf(e.target.value) !== -1 
      });
      console.log(newArray)
      this.setState({
        users:newArray
      })*/
    }



    render() {
        if (this.props.hasErrored && typeof this.props.items === 'undefined') {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading && typeof this.props.items === 'undefined' ) {
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
          activePage={this.props.page_number}
          itemsCountPerPage={this.props.page_size}
          totalItemsCount={this.props.count}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
          <Header />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th onClick={() => this.handleColumnSort("id")}><b>Id</b> <i className={`fa fa-fw ${this.handleColumnSortCss("id")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("name")}><b>Name</b> <i className={`fa fa-fw ${this.handleColumnSortCss("name")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("munit")}><b>Munit</b> <i className={`fa fa-fw ${this.handleColumnSortCss("munit")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("rate")}><b>Rate</b> <i className={`fa fa-fw ${this.handleColumnSortCss("rate")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("typeofingredient")}><b>Ingr. Type</b> <i className={`fa fa-fw ${this.handleColumnSortCss("typeofingredient")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("density_kg_per_lt")}><b>Kg/Lt</b> <i className={`fa fa-fw ${this.handleColumnSortCss("density_kg_per_lt")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("density_pcs_per_kg")}><b>Pcs/Kg</b> <i className={`fa fa-fw ${this.handleColumnSortCss("density_pcs_per_kg")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("density_pcs_per_lt")}><b>Pcs/Lt</b> <i className={`fa fa-fw ${this.handleColumnSortCss("density_pcs_per_lt")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("updated")}><b>Udpated</b> <i className={`fa fa-fw ${this.handleColumnSortCss("updated")}`}></i></th>
                  <th onClick={() => this.handleColumnSort("timestamp")}><b>Created</b> <i className={`fa fa-fw ${this.handleColumnSortCss("timestamp")}`}></i></th>
                </tr>
                <tr>
                  <th></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("id",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("name",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("munit",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("rate",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("typeofingredient",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("density_kg_per_lt",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("density_pcs_per_kg",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("density_pcs_per_lt",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("updated",e)}/></th>
                  <th><input value={this.state.input} type="text" onChange={(e) => this.onChangeHandler("timestamp",e)}/></th>
                </tr>
              </thead>
              <tbody>
              {this.props.items.map((item,index) => (
                <tr key={index} >
                    <th> {(index+1)+((this.props.page_number-1)*(this.props.page_size))}</th>
                    <td> {item.id}</td>
                    <td> {item.name}</td>
                    <td> {item.munit}</td>
                    <td> {item.rate}</td>
                    <td> {item.typeofingredient}</td>
                    <td> {item.density_kg_per_lt}</td>
                    <td> {item.density_pcs_per_kg}</td>
                    <td> {item.density_pcs_per_lt}</td>
                    <td><Time value={item.updated} titleFormat="YYYY/MM/DD HH:mm" relative /></td>
                    <td><Time value={item.timestamp} titleFormat="YYYY/MM/DD HH:mm" relative /></td>
                </tr>
                ))}
              </tbody>
            </table>
        <Pagination
          activePage={this.props.page_number}
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

const getItems = (ingredients,filtertext) => {
  console.log("filtertext",filtertext)
  if(filtertext.length > 0){
    var filteredData = ingredients
    for( var idx = 0; idx < filtertext.length; ++idx ){
      filteredData = filteredData.filter(item => {
        if(item[filtertext[idx].column] !== null){
           if(item[filtertext[idx].column].toString().indexOf(filtertext[idx].text) !== -1 )
             return item;
        }
      })
    }
    return filteredData
  }
  else{
    return ingredients
  }
}

const mapStateToProps = (state) => {
    return {
        items: getItems(state.ingredients.data.results,state.ingredients.filter.filtertext),
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        count: state.ingredients.data.count,
        page_size: state.ingredients.data.page_size,
        page_number: state.ingredients.data.page_number,
        sort_column: state.ingredients.sortBy.column,
        sort_order: state.ingredients.sortBy.ascordesc,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)), 
        fetchDatasortby: (column,ascordesc,url) => dispatch(itemsFetchDataSortBy(column,ascordesc,url)),
        itemcolumnfilter: (column,text) => dispatch(itemcolumnfilter(column,text))

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));
