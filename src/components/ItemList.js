import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, itemsFetchDataform,itemsHasErroredform, itemsIsLoadingform, itemsFetchDataSuccessform, itemsFetchDataSortBy, itemcolumnfilter, itemspagenumber, itemsperpage, itemcount } from '../actions/items';
import Pagination from 'react-js-pagination'
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar'
import Time from 'react-time'
import ReactPaginate from 'react-paginate';
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';
import {reset, initialize} from 'redux-form';

const submit0 = (values) => {
  // print the form values to the console
  console.log(values)
}

const provinces0 = ['hare','krishna','nitai'];

const createRenderer0 = render => ({ input, meta, label, ...rest}) => {
    const hare = input
    const nitai = meta
    const gaura = label
    const prema = {...rest}
    const hare2 = 10

    return (
      <div className={`form-group row ${meta.error && meta.touched ? 'alert alert-danger' : ''}`}>
        <label className='col-sm-2 col-form-label'>{label}</label>
        <div className="col-sm-5">
          {render(input,label,rest)}
        </div>


        {meta.error &&
          meta.touched &&
          <span className="col-sm-4">
            {meta.error}
          </span>}
      </div>
      )
      
}

const RenderInput0 = createRenderer0((input,label) => 
    <input placeholder={label} className="form-control" {...input} />
  )

const RenderSelect0 = createRenderer0((input,label,{children}) => 
  <select {...input} className="form-control">
    {children}
  </select>
  )



let IngredientForm0 = (props) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit(submit0) }>
      <Field name="firstName" label="First Name" component={RenderInput0} type="text" />
      <Field name="lastName" label="Last Name" component={RenderInput0} type="text" />
      <Field name="email" label="Email" component={RenderInput0} type="email" />
      <Field name="province" label="Province" component={RenderSelect0} >
        <option/>
        {provinces0.map(province =>
          <option key={province} value={province}>
            {province}
          </option>
          )}
      </Field>
      <button type="submit">Submit</button>
    </form>
  )
}

const validate0 = values => {
  const errors = {}
  if(!values.firstName) {
    errors.firstName = 'Required'
  }
  if(!values.lastName) {
    errors.lastName = 'Required'
  }
  if(!values.email) {
    errors.email = 'Required'
  }
  if(!values.province){
    errors.province = 'Required'
  }
  return errors
}

IngredientForm0 = reduxForm({
  // a unique name for the form
  form: 'ingredient0',
  //validate0
})(IngredientForm0)


//////////////////////////////////////////////////////////////////////////////////////////////////////

const submit = (values,dispatch,props) => {
/*  const url = 'http://127.0.0.1:8000/api/ingredients/singleform/';
  // The data we are going to send in our request
  let data = values
  // The parameters we are gonna pass to the fetch function
  let fetchData = { 
      method: 'POST', 
      body: JSON.stringify(data),
      headers: new Headers()
  }

  fetch(url, fetchData)
  .then(function() {

      dispatch(itemsFetchData('http://127.0.0.1:8000/api/ingredients/?ordering=-id&format=json'))
  })
  .catch(function (error) {console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",error);});*/
 
  // print the form values to the console
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",values)
  axios.post('http://127.0.0.1:8000/api/ingredients/singleform/', values)
  .then(res => {
    console.log("props",props)
    console.log("props.errors",props.errors)
    dispatch(itemsIsLoadingform(false));
    dispatch(itemsFetchDataSuccessform(res.data))
    dispatch(hideLoading())
    isEmpty(props.errors) ? dispatch(props.reset()) : ''
    dispatch(itemsFetchData('http://127.0.0.1:8000/api/ingredients/?ordering=-id&format=json'))
  })
  .catch(function (error) {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",error)
    dispatch(itemsHasErroredform(true))
    dispatch(hideLoading())
    throw(error);
    });

}

const provinces = ['hare','krishna','nitai'];

const createRenderer = render => ({ input, field, is_bound, errors, meta, ...rest}) => {
    const hare = input
    const nitai = meta
    const gaura = field
    if(typeof field === 'undefined'){
      field = {}
    }

    return (
      <div className={`form-group row ${meta.error && meta.touched ? 'alert alert-danger' : ''}`}>
        <label htmlFor={`id_${input.name}`} className="col-12 form-control-label">
          {field.label}
          {field.required && <span className="asteriskField">*</span>}
        </label>
        <div className="col-12">
          {render(input,field,is_bound, errors, rest)}
        </div>
        {meta.error &&
          meta.touched &&
          <span className="col-4">
            {meta.error}
          </span>}
      </div>
      )
      
}

const RenderInput = createRenderer((input,formfield,is_bound, errors) => {
  console.log("is_bound____________________________________________________",is_bound)
  
  if(is_bound === true){
   if(errors!==null){
    return ([
          <input id={`id_${input.name}`} placeholder={formfield.label} className="textinput form-control is-invalid" type={formfield.widget.input_type} {...input} />,
          errors.map( error =>
            <div class="invalid-feedback">
              {error}
            </div>
          )
      ])
    }
    else{
      return(
        <input id={`id_${input.name}`} placeholder={formfield.label} className="textinput form-control is-valid" type={formfield.widget.input_type} {...input} />
        )
    }
  }
  else {
        return(
          <input id={`id_${input.name}`} placeholder={formfield.label} className="textinput form-control" type={formfield.widget.input_type} {...input} />
        )
  }
})

const RenderInputDecimal = createRenderer((input,formfield,is_bound, errors) => {
  console.log("is_bound____________________________________________________",is_bound)
  
  if(is_bound === true){
   if(errors!==null){
    return ([
          <input id={`id_${input.name}`} placeholder={formfield.label} className="numberinput form-control is-invalid" type={formfield.widget.input_type} {...input}/>,
          errors.map( error =>
            <div class="invalid-feedback">
              {error}
            </div>
          )
      ])
    }
    else{
      return(
        <input id={`id_${input.name}`} placeholder={formfield.label} className="numberinput form-control is-valid" type={formfield.widget.input_type} {...input}/>
        )
    }
  }
  else {
        return(
          <input id={`id_${input.name}`} placeholder={formfield.label} className="numberinput form-control" type={formfield.widget.input_type} {...input}/>
        )
  }
})

/*const RenderInputDecimal = createRenderer((input,formfield,is_bound, errors) => {
  console.log("formfield.initial",formfield.initial)
  console.log("formfield.widget.input_type",formfield.widget.input_type)
  return (
      <input id={`id_${input.name}`} placeholder={formfield.label} className="numberinput form-control" type={formfield.widget.input_type} {...input}/>
      )
}
  )
*/

const RenderSelect = createRenderer((input,field,is_bound, errors,{children}) => {
  console.log("is_bound____________________________________________________",is_bound)
  
  if(is_bound === true){
   if(errors!==null){
    return ([
          <select {...input} id={`id_${input.name}`} className="form-control is-invalid">
            {children}
          </select>,
          errors.map( error =>
            <div class="invalid-feedback">
              {error}
            </div>
          )
      ])
    }
    else{
      return(
          <select {...input} id={`id_${input.name}`} className="form-control is-valid">
            {children}
          </select>
        )
    }
  }
  else {
        return(
        <select {...input} id={`id_${input.name}`} className="form-control">
          {children}
        </select>
        )
  }
})


/*const RenderSelect = createRenderer((input,field,is_bound, errors,{children}) => 
  <select {...input} id={`id_${input.name}`} className="form-control">
    {children}
  </select>
  )*/


let IngredientForm = props => {
  const { handleSubmit } = props
  const {form } = props
  return (
    <form method="post" onSubmit={ handleSubmit(submit) }>
    <div className="row">
      <div className="col-3">
        <Field name="name" component={RenderInput} field={form.fields.name} is_bound={form.is_bound} errors={typeof form.errors !== "undefined" ? typeof form.errors.name !== "undefined" ? form.errors.name : null : null}/>
      </div>
      <div className="col-3">
        <Field name="munit" component={RenderSelect} field={form.fields.munit}  is_bound={form.is_bound} errors={typeof form.errors !== "undefined" ? typeof form.errors.munit !== "undefined" ? form.errors.munit : null : null}>
        {form.fields.munit.choices.map(gauranga =>
          <option key={gauranga.name} value={gauranga.value}>
            {gauranga.display}
          </option>
          )}
        </Field>
      </div>
      <div className="col-3">
        <Field name="rate" component={RenderInputDecimal} field={form.fields.rate}  is_bound={form.is_bound} errors={typeof form.errors !== "undefined" ? typeof form.errors.rate !== "undefined" ? form.errors.rate : null : null}/>
      </div>
      <div className="col-3">
        <Field name="typeofingredient" component={RenderSelect} field={form.fields.typeofingredient}  is_bound={form.is_bound} errors={typeof form.errors !== "undefined" ? typeof form.errors.typeofingredient !== "undefined" ? form.errors.typeofingredient : null : null}>
          {form.fields.typeofingredient.choices.map(gauranga =>
            <option key={gauranga.name} value={gauranga.value}>
              {gauranga.display}
            </option>
          )}
        </Field>
      </div>
      <div className="col-3">
        <Field name="density_kg_per_lt" component={RenderInputDecimal} field={form.fields.density_kg_per_lt}  is_bound={form.is_bound} errors={typeof form.errors !== "undefined" ? typeof form.errors.density_kg_per_lt !== "undefined" ? form.errors.density_kg_per_lt : null : null}/>
      </div>
      <div className="col-3">
        <Field name="density_pcs_per_kg" component={RenderInputDecimal} field={form.fields.density_pcs_per_kg}  is_bound={form.is_bound} errors={typeof form.errors !== "undefined" ? typeof form.errors.density_pcs_per_kg !== "undefined" ? form.errors.density_pcs_per_kg : null : null}/>
      </div>
            <div className="col-3">
        <Field name="density_pcs_per_lt" component={RenderInputDecimal} field={form.fields.density_pcs_per_lt}  is_bound={form.is_bound} errors={typeof form.errors !== "undefined" ? typeof form.errors.density_pcs_per_lt !== "undefined" ? form.errors.density_pcs_per_lt : null : null}/>
      </div>
    </div>
      <button type="submit">Submit</button>
    </form>
  )
}

const validate = values => {
  const errors = {}
  if(!values.firstName) {
    errors.firstName = 'Required'
  }
  if(!values.lastName) {
    errors.lastName = 'Required'
  }
  if(!values.email) {
    errors.email = 'Required'
  }
  if(!values.province){
    errors.province = 'Required'
  }

  return errors
}


const getValues = (data) => {
  if(typeof data === "undefined"){
    return (data = {})
    }
  return (data)       
}

IngredientForm = reduxForm({
        form: 'ingredient',
        enableReinitialize : true,
        //validate,
      })(IngredientForm)

const mapStateToProps1 = (state) => {
    return {
        errors : state.ingredients.formcomb.form.errors,
        initialValues : getValues(state.ingredients.formcomb.form.data)
     }
}

const mapDispatchToProps1 = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
    };
};

 IngredientForm = connect( mapStateToProps1,mapDispatchToProps1 )(IngredientForm);

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



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
    this.handlePageChange=this.handlePageChange.bind(this)
    this.handlePageChange1=this.handlePageChange1.bind(this)
    this.handleColumnSort=this.handleColumnSort.bind(this)
    this.handleColumnSortCss=this.handleColumnSortCss.bind(this)
    this.onChangeHandler=this.onChangeHandler.bind(this)
    this.onEditClick=this.onEditClick.bind(this)
    this.perpage = 30
    this.props.perpage(this.perpage)
  }

  onEditClick(id){
    console.log(id)
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
      this.props.fetchDataform('http://localhost:8000/api/ingredients/singleform')
  }

    handlePageChange1(pageNumber) {
      this.props.pagenumber(pageNumber)
    }

    handlePageChange(data) {
      
      this.props.pagenumber(data.selected)
    }


    onChangeHandler(column,e){
      console.log(e.target.value);
      this.props.pagenumber(0)
      this.props.itemcolumnfilter(column,e.target.value)
    }


    render() {
        if (this.props.hasErrored && typeof this.props.items.filtereditems === 'undefined') {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading && typeof this.props.items.filtereditems === 'undefined' ) {
            return <p>Loading…</p>;
        }

        /*if (isEmpty(this.props.items.filtereditems)) {*/
/*            return <p>Loading…</p>;*/
/*        }*/

        if (isEmpty(this.props.form.fields)) {
            return <p>Loading…</p>;
        }

        if (isEmpty(this.props.form)) {
            return <p>Loading…</p>;
        }


        const createItem = (item, key) =>
            <option
              key={key}
              value={item.value}
            >
              {item.name}
            </option>;

        return (

        <div className="container">
        <h2>List of Ingredients</h2>
        <p>Added list of ingredients</p> 
{/*        <Pagination
          activePage={this.props.page_number}
          itemsCountPerPage={this.props.perpage2}
          totalItemsCount={this.props.items.totalcount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange1}
        />
*/}
        <ReactPaginate previousLabel={"previous"}
               nextLabel={"next"}
               breakLabel={<a class="page-link" href="">...</a>}
               breakClassName={"page-item"}
               pageCount={this.props.items.totalcount/this.props.perpage2}
               marginPagesDisplayed={3}
               pageRangeDisplayed={3}
               onPageChange={this.handlePageChange}
               containerClassName={"pagination"}
               subContainerClassName={"page"}
               pageClassName={"page-item"}
               pageLinkClassName={"page-link"}
               previousClassName={"page-item"}
               nextClassName={"page-item"}
               previousLinkClassName={"page-link"}
               nextLinkClassName={"page-link"}
               activeClassName={"active"} />
            <IngredientForm form={this.props.form}/>
            <Header />
            <table className="table table-sm" style={{"table-layout": "auto"}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Edit</th>
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
                  <th></th>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("id",e)}/></th>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("name",e)}/></th>
                  <select className="custom-select form-control" onChange={(e) => this.onChangeHandler("munit",e)} >
                    {this.props.munits.map(createItem)}
                  </select>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("rate",e)}/></th>
                  <select className="custom-select form-control" onChange={(e) => this.onChangeHandler("typeofingredient",e)} >
                    {this.props.typeofingredientlist.map(createItem)}
                  </select>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("density_kg_per_lt",e)}/></th>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("density_pcs_per_kg",e)}/></th>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("density_pcs_per_lt",e)}/></th>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("updated",e)}/></th>
                  <th><input  className='form-control' type="text" onChange={(e) => this.onChangeHandler("timestamp",e)}/></th>
                </tr>
              </thead>
              <tbody>
              {this.props.items.filtereditems.map((item,index) => (
                [<tr key={index} >
                    <td> {(index+1)+((this.props.page_number-1)*(this.props.page_size))}</td>
                    <td><button onClick={() => this.onEditClick(item.id)} type="button" className="btn btn-primary btn-sm">Edit</button></td>
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
                </tr>]
                ))}
              </tbody>
            </table>
        <ReactPaginate previousLabel={"previous"}
               nextLabel={"next"}
               breakLabel={<a href="">...</a>}
               breakClassName={"break-me"}
               pageCount={this.props.items.totalcount/this.props.perpage2}
               marginPagesDisplayed={1}
               pageRangeDisplayed={2}
               onPageChange={this.handlePageChange}
               containerClassName={"pagination"}
               subContainerClassName={"pages pagination"}
               activeClassName={"active"} />
       {/* <Pagination
          activePage={this.props.page_number}
          itemsCountPerPage={this.props.page_size}
          totalItemsCount={this.props.count}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />*/}
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

const getItems = (ingredients,filtertext,pagenumber,per_page) => {
  console.log("filtertext",filtertext)
  console.log("pagenumber",pagenumber)
  var filteredData = ingredients
  if(filtertext.length > 0){
    for( var idx = 0; idx < filtertext.length; ++idx ){
      filteredData = filteredData.filter(item => {
        if(item[filtertext[idx].column] !== null){
           if(item[filtertext[idx].column].toString().indexOf(filtertext[idx].text) !== -1 )
             return item;
        }
      })
    }
  }
  var start = (pagenumber*per_page);
  var end = start+per_page;
  console.log(start,end)
  if(typeof filteredData === "undefined")
    return { 
      filtereditems: [],
      totalcount: 0
    }
  else
    return {
      filtereditems: filteredData.slice(start,end),
      totalcount: filteredData.length
    }
}

const getMunit = (munit) => {
  if(typeof munit === "undefined"){
    return [
        {
          name: 'Select…',
          value: "",
        }
    ]
  }
  return [        
        {
          name: 'Select…',
          value: "",
        },
        ...munit
      ]
}


const getTypes = (types) => {
  if(typeof types === "undefined"){
    return [
        {
          name: 'Select…',
          value: "",
        }
    ]
  }
  return [        
        {
          name: 'Select…',
          value: "",
        },
        ...types
      ]
}


const getFormFields = (fields,data,is_bound,errors) => {
  if(typeof fields === "undefined" || typeof data === "undefined"){
    return (
       {
          fields: {},
          data: {},
          is_bound: false,
          errors: {}
        }
      )
  }
  return (
        {
          fields: fields,
          data: data,
          is_bound: is_bound,
          errors: errors
        }
    )       
}

const mapStateToProps = (state) => {
    console.log("state.ingredients.pagenumber",state.ingredients.pagenumber)
    console.log("state.ingredients.per_page",state.ingredients.perpage)
    return {
        items: getItems(state.ingredients.data.results,state.ingredients.filter.filtertext,state.ingredients.pagenumber,state.ingredients.perpage),
        hasErrored: state.ingredients.itemsHasErrored,
        isLoading: state.ingredients.itemsIsLoading,
        totalcount: state.ingredients.data.count,
        page_size: state.ingredients.data.page_size,
        page_number: state.ingredients.data.page_number,
        sort_column: state.ingredients.sortBy.column,
        sort_order: state.ingredients.sortBy.ascordesc,
        perpage2: state.ingredients.perpage,
        pagenumber:state.ingredients.pagenumber,
        typeofingredientlist:getTypes(state.ingredients.data.typeofingredients),
        munits:getMunit(state.ingredients.data.munit),
        form:getFormFields(state.ingredients.formcomb.form.fields,state.ingredients.formcomb.form.data,state.ingredients.formcomb.form.is_bound,state.ingredients.formcomb.form.errors)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        fetchDataform: (url) => dispatch(itemsFetchDataform(url)),
        pagenumber: (pagenumber) => dispatch(itemspagenumber(pagenumber)),
        perpage: (perpage) => dispatch(itemsperpage(perpage)),
        fetchDatasortby: (column,ascordesc,url) => dispatch(itemsFetchDataSortBy(column,ascordesc,url)),
        itemcolumnfilter: (column,text) => dispatch(itemcolumnfilter(column,text))

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));
