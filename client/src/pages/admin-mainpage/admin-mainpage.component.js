import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import axios from 'axios'

import { fetchCategoriesStart } from '../../redux/category/category.actions'
import { selectCategories, selectIsFetchingCategories } from '../../redux/category/category.selectors'

import Select from '../../components/select/select.component'

class AdminMainpage extends Component {

    state = {
        file: undefined,
        loaded: 0 //This can be used to create a progress bar. 
    }

    componentDidMount() {
        const { fetchCategoriesStart } = this.props;
        fetchCategoriesStart()
    }

    onCategorySelected = event => {
        if (event.target.value) {
            console.log('is working!');
        }
    }

    onSelectFile = event => {
        this.setState({ 
            file: event.target.files[0],
            loaded: 0
        });
    }

    onFileUpload = async () => {
        const data = new FormData();
        data.append('file',this.state.file)
        const fileResult = await axios.post('/api/upload/excel', data);
        console.log(fileResult);
    }

    render() {
        const { categories, isFetchingCategories } = this.props;
        const categoryOptions = !isFetchingCategories && categories ?
            categories.map(category => {
                return <option key={category.id} value={category.id}>{category.name}</option>
            })
            : []
        return (
            <div className='adminMainPage'>
                <Select onChange={this.onCategorySelected}>
                    <option value="">Selecciona una categoría</option>
                    {categoryOptions}
                </Select>
                <form method="post" action="#" id="#">
                    <div className="form-group">
                        <label>Upload Your File</label>
                        <input type="file" className="form-control" onChange={this.onSelectFile} />
                    </div>
                    <button type="button" onClick={this.onFileUpload}>Upload</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    isFetchingCategories: selectIsFetchingCategories,
})

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminMainpage)