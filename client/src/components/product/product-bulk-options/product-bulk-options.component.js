import React, { Component } from 'react'
import axios from 'axios'
import download from 'downloadjs'

class ProductBulkOptions extends Component {

    state = {
        file: undefined,
        loaded: 0, //This can be used to create a progress bar. 
    }

    onSelectFile = event => {
        this.setState({
            file: event.target.files[0],
            loaded: 0
        });
    }

    onFileUpload = async (categoryId) => {
        const data = new FormData();
        data.append('file', this.state.file)
        const fileResult = await axios.post(`/api/upload/products/${categoryId}`, data);
    }

    onFileDownload = async (categoryId) => {
        const res = await axios.get(`/api/download/products/${categoryId}`, { responseType: 'blob' });
        const blob = new Blob([res.data]);
        download(blob, 'Lista_Productos.xlsx');
    }

    onCategoryUpload = async (categoryId) => {
        console.log('Image upload for category:', categoryId);
    }

    render() {
        const {categoryId} = this.props;
        return (
            <div className='product-bulk-options'>
                <form method="post" action="#" id="#">
                    <div className="form-group">
                        <label>Upload Your File</label>
                        <input type="file" className="form-control" onChange={this.onSelectFile} />
                    </div>
                    <button type="button" onClick={()=>{this.onFileUpload(categoryId)}}>Upload Products</button>
                </form>
                <button type="button" onClick={()=>{this.onFileDownload(categoryId)}}>Download</button>
                <button type="button" onClick={()=>{this.onCategoryUpload(categoryId)}}>Upload Images</button>
            </div>
        )
    }
}

export default ProductBulkOptions