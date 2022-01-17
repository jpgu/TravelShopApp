import React, {useState} from 'react'
import { Input } from 'antd'

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (event) => {        
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)    // 부모 component 에 search 값 전달
    }

    return (
        <div>
            <Search 
                placeholder="input search text" 
                onChange={searchHandler} 
                style={{ width: 200 }}
                value={SearchTerm}
            />
        </div>
    )
}

export default SearchFeature