"use client"

import { useEffect, useMemo, useState } from 'react';
import { CustomComponents } from '@/ui-component';
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { AddCircleRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setFormDialogOpen } from '@/lib/store/features/dialog/formDialogSlice';
import { deleteTagAction, getTagsAction } from '@/lib/store/thunks/tagAction';
import AddTag from './add/addTag';


export default function Tags() {
    const dispatch = useAppDispatch();
    const stateTags = useAppSelector((state)=> state.tagReducer.tags);

    const CustomFormDialog = CustomComponents.CustomFormDialog;
    const ListPageCard = CustomComponents.ListPageCard;
    const StatusChip = CustomComponents.StatusChip;
    const DataGridActions = CustomComponents.DataGridActions;

    const [recordForEdit, setRecordForEdit] = useState(null);

    useEffect(() => {
        if (stateTags.length < 1){
            dispatch(getTagsAction());
        }
    }, []);

    // delete
    const deleteRecord = (id: string) => {
        dispatch(deleteTagAction(id));
    }

    const columns: GridColDef<(typeof stateTags)[number]>[]= useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Tag Name',
                width: 400,
            },
            {
                field: 'description',
                headerName: 'Description',
                width: 400,
                sortable: false
            },
            {
                field: 'is_active',
                headerName: 'Status',
                width: 150,
                renderCell: (params: any) => {
                    return (
                        <StatusChip params={params}/>
                    )
                }
            },
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                sortable: false,
                width: 150,
                renderCell: (params: any) => {
                    return (
                        <Box>
                             <DataGridActions
                                params={params}
                                setRecordForEdit={setRecordForEdit}
                                deleteFunction={deleteRecord}
                                dialogTitle= "Update Tag"
                            />
                        </Box>
                    )
                }
            },
        ],
        []
    )

    return (
        <>
            <ListPageCard>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        variant="contained"
                        endIcon={< AddCircleRounded />}
                        onClick={() => {
                            dispatch(setFormDialogOpen({ isOpen: true, dialogTitle: "Add Tag"}));
                            setRecordForEdit(null);
                        }}
                        sx={{ borderRadius: '10px' }}>
                        Add
                    </Button>
                </Box>

                <Box style={{ height: 400, width: '100%' }}>
                    {
                        stateTags.length > 0 &&
                        <DataGrid
                            autoHeight
                            columns={columns}
                            rows={stateTags}
                            slots={{ toolbar: GridToolbar }}
                            getRowId={(row) => row._id}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                            disableRowSelectionOnClick />
                    }
                </Box>
            </ListPageCard>

            <CustomFormDialog
                size='sm'
                isFullWidth={true}>
                <AddTag
                recordForEdit={recordForEdit}/>
            </CustomFormDialog>
        </>
    )
}