import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import CardHeader from '@material-ui/core/CardHeader';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider'
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650
    },
    addButton: {
        maxHeight: '35px',
        alignSelf: 'center'
    },
    head: {
        display: "flex",
        justifyContent: 'space-between',
        margin: theme.spacing.unit*2
    },
    divider: {
        marginBottom: theme.spacing.unit * 2
    }
}));

export default function EntityTable(props) {

    const classes = useStyles();

    const {
        columns,
        title,
        entities,
        ...otherProps
    } = props;

    return (
        <React.Fragment>
            <div className={classes.head}>
                <CardHeader title={title} />
                <Button variant='contained' className={classes.addButton} color='primary' onClick={props.addNew}>
                    <AddIcon /> {props.addButtonTitle}
                </Button>
            </div>

            <Divider className={classes.divider}/>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={false}
                                />
                            </TableCell>
                            {columns.map((cell) => (
                                <TableCell>{cell.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(entities, (entity) => (
                            <TableRow key={entity.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={entity.isSelected}
                                        // inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                                {columns.map(column => (
                                    <TableCell>{entity[column.key]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={Object.keys(entities).length}
                                rowsPerPage={5}
                                page={0}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={(pageNum) => console.log(`Changing page to: ${pageNum}`)}
                                onChangeRowsPerPage={(rowsPerPage => console.log(`Changing rows per page to: ${rowsPerPage}`))}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}