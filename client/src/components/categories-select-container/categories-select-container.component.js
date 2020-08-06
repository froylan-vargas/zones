import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCategories } from '../../redux/category/category.selectors';
import { setSelectedCategory } from '../../redux/category/category.actions';

import WithOptions from '../with-options/with-options.component';
import Select from '../elements/select/select.component';

const mapStateToProps = createStructuredSelector({
    options: selectCategories
});

const mapDispatchToProps = dispatch => ({
    setSelectedValue: (selectedCategory) => dispatch(setSelectedCategory(selectedCategory))
});

const CategoriesSelectContainer = (connect(mapStateToProps, mapDispatchToProps)(WithOptions(Select)));

export default CategoriesSelectContainer;