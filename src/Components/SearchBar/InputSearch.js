import React, { useContext } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Store } from '../App/App';

export default function InputSearch() {
    const store = useContext(Store)
    return ( 
        <div id = "inputSearch" >
        <
        Input addonBefore = { < SearchOutlined / > }
        placeholder = "Search..."
        onChange = {
            (event) => store.setSearch(event.target.value)
        }
        value = {store.search}
        />
        </div>
    )
}