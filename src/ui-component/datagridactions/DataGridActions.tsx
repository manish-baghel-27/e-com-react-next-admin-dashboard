import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { setFormDialogOpen } from '@/lib/store/features/dialog/formDialogSlice';
import { setConfirmDialogState } from '@/lib/store/features/dialog/confirmDialogSlice';

const ITEM_HEIGHT = 48;

export default function DataGridActions(props: any) {
    const dispatch = useAppDispatch();

    const {
        params,
        setRecordForEdit,
        deleteFunction,
        dialogTitle="",
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const editRecord = ()=>{
        dispatch(setFormDialogOpen({ isOpen: true, dialogTitle: dialogTitle}));
        setRecordForEdit(params.row);
        setAnchorEl(null);
    }

    const deleteRecord = () =>{
        dispatch(setConfirmDialogState({
            isOpenConfirmDialog: true, 
            confirmDialogTitle: 'Are you sure, you want to delete ?', 
            confirmDialogSubTitle: 'You will not be able to retrive it.',
            onConfirm: () => { deleteFunction(params.row.id) }
        }))
        // 
        setAnchorEl(null);
    }
    
    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={editRecord} disableRipple>
                    <Edit /> Edit
                </MenuItem>
                <MenuItem onClick={deleteRecord} disableRipple>
                    <Delete /> Delete
                </MenuItem>
            </Menu>
        </>
    )
}
