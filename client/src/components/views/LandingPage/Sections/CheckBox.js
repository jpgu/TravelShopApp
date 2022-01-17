import React, {useState} from 'react'
import { Collapse, Checkbox  } from 'antd'

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        console.log('value', value)

        // 누른 것의 Index 를 구하고
        const currentIndex = Checked.indexOf(value)

        // 전체 Checked 된 State 에서 현재 누른 Checkbox 가 이미 있다면 
        const newChecked = [...Checked]

        console.log('currentIndex', currentIndex)

        // State 넣어준다.
        if(currentIndex === -1){
            newChecked.push(value)
        }        
        else{       
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key = {index}>
            <Checkbox onChange={() => handleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span> {value.name} </span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
                
            </Collapse>
        </div>
    )
}

export default CheckBox
