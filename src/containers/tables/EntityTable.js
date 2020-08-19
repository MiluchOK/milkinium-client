import React from 'react';
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
import EnhancedTableToolbar from './EnhancedTableToolbar'
import EnhancedTableHead from "./EnhancedTableHead";

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
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EntityTable(props) {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(props.columns[0]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = entities.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleCheck = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const {
        columns,
        title,
        entities,
        handleDelete,
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

            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    title={title}
                    onDelete={() => handleDelete(selected)}
                />
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <EnhancedTableHead
                            headCells={columns}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={entities.length}
                        />
                        <TableBody>
                            {stableSort(entities, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((entity) => {
                                    const isItemSelected = isSelected(entity.id);
                                    return (<TableRow key={entity.id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                onClick={(event) => {
                                                    handleCheck(event, entity.id)
                                                }}
                                            />
                                        </TableCell>
                                        {columns.map(column => (
                                            <TableCell>{entity[column.key]}</TableCell>
                                        ))}
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={Object.keys(entities).length}
                    rowsPerPage={rowsPerPage}
                    component="div"
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </React.Fragment>
    )
}