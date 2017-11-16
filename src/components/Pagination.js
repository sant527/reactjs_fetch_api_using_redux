import React from 'react';
import { NavLink } from 'react-router-dom'


const Pagination = () => (
	<nav aria-label="Page navigation example">
	  <ul class="pagination">
	    <li class="page-item"><NavLink class="page-link" to="#">Previous</NavLink></li>
	    <li class="page-item"><NavLink class="page-link" to="#">1</NavLink></li>
	    <li class="page-item"><NavLink class="page-link" to="#">2</NavLink></li>
	    <li class="page-item"><NavLink class="page-link" to="#">3</NavLink></li>
	    <li class="page-item"><NavLink class="page-link" to="#">Next</NavLink></li>
	  </ul>
	</nav>
	)

export default Pagination