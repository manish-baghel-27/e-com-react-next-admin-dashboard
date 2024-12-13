import React from 'react';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useEffect } from 'react';
// import { CONFIRMED_UPDATE_EMPLOYEE_STATUS_ACTION } from 'store/constant';
// import { UpdateRecordCommonAction } from 'store/actions/common/CommonActions';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

export default function CustomSwitch(props: any) {
    let isChecked = (props.params.row.is_active) ? true : false;
    const getStatusAPI = props.updateStatusAPT;

    const [checked, setChecked] = useState(isChecked);

    const handleChange = (event: any) => {
        let emp_id = (props.params.row.id);

        const updateGroupApi = getStatusAPI + emp_id;
        let data = {
            "is_active": event.target.checked,
        }
        // props.UpdateRecordCommonAction(updateGroupApi, data, CONFIRMED_UPDATE_EMPLOYEE_STATUS_ACTION);
    };

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked])

    return (
        <>
            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </>
    )
}
    
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         UpdateRecordCommonAction
//     }, dispatch);
// }
// export default connect(null, mapDispatchToProps)(CustomSwitch);
