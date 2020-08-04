import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCategories } from '../../redux/category/category.selectors';
import { setSelectedCategory } from '../../redux/category/category.actions';

import WithCategories from '../with-categories/with-categories.component';
import Select from '../elements/select/select.component';

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

const mapDispatchToProps = dispatch => ({
    setSelectedCategory: (selectedCategory) => dispatch(setSelectedCategory(selectedCategory))
});

const CategoriesSelectContainer = connect(mapStateToProps, mapDispatchToProps)(WithCategories(Select));

export default CategoriesSelectContainer;