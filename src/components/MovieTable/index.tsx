import {
    Box,
    Button,
    CircularProgress,
    Paper,
    TablePagination,
    Tooltip,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { MovieService } from "../../services/Services";
import { movieColumn } from "../../common/dummyData";
import { useHomeSlice } from "../../store/homeSlice";
import { STRING, THEME_MODE } from "../../constants/Constants";
import NoImage from "../../assets/image-not-found.jpg";
import Toast from "../Toast";
import MovieDetailModal from "../MovieDetailModal";
import { maxHeighTableRow } from "../styles/styles";

const initialPageInfo = {
    page: 0,
    rowsPerPage: 10,
};

const MovieTable = () => {
    const [totalResult, setTotalResult] = useState(0);
    const [pageInfoState, setPageInfoState] = useState(initialPageInfo);
    const [openToast, setOpenToast] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [titleMovie, setTitleMovie] = useState("");
    const { searchInput: searchKey, isDarkMode } = useHomeSlice();

    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        event?.preventDefault();
        setPageInfoState({
            ...pageInfoState,
            page: newPage,
        });
    };

    const { isLoading, data, isError, error } = useQuery({
        queryKey: [searchKey, pageInfoState],
        queryFn: () => MovieService(searchKey, pageInfoState.page + 1),
    });

    const onShowDetailMovie = (title: string | undefined) => {
        if (title) {
            setTitleMovie(title);
            setOpenDetail(true);
        }
    };

    useEffect(() => {
        if (data?.totalResults) {
            setTotalResult(Math.floor(data.totalResults));
        } else if (data?.Error) {
            setTotalResult(0);
        }
    }, [data]);

    useEffect(() => {
        setPageInfoState({
            ...pageInfoState,
            page: 0,
        });
    }, [searchKey]);

    useEffect(() => {
        setOpenToast(isError);
    }, [isError]);

    return (
        <Paper
            sx={{
                width: "100%",
                overflow: "hidden",
                colorScheme: isDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT,
            }}
        >
            {totalResult !== 0 && (
                <Box textAlign={"right"}>
                    <TablePagination
                        component="div"
                        onPageChange={handlePageChange}
                        page={pageInfoState.page}
                        count={totalResult}
                        rowsPerPage={10}
                        rowsPerPageOptions={[]}
                    />
                </Box>
            )}
            <TableContainer component={Paper} sx={{ maxHeight: "73vh" }}>
                <Box>
                    <Table stickyHeader key="movieTable">
                        <TableHead>
                            <TableRow>
                                {movieColumn.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody key="movie-body">
                            {isLoading ? (
                                <TableRow key="progress-row">
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : totalResult === 0 ? (
                                <TableRow key="no-data-row">
                                    <TableCell colSpan={5} align="center">
                                        <Typography>No data</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data?.Search?.map((movie) => (
                                    <TableRow
                                        sx={maxHeighTableRow}
                                        key={movie.Id}
                                    >
                                        <TableCell
                                            align="center"
                                            sx={maxHeighTableRow}
                                        >
                                            <Tooltip
                                                title="View detail"
                                                placement="right"
                                                arrow
                                            >
                                                <Button
                                                    onClick={() =>
                                                        onShowDetailMovie(
                                                            movie.Title
                                                        )
                                                    }
                                                >
                                                    <img
                                                        width="100"
                                                        height="auto"
                                                        style={{maxHeight: '120px'}}
                                                        src={
                                                            movie.Poster ===
                                                            STRING.NONE
                                                                ? NoImage
                                                                : movie.Poster
                                                        }
                                                        alt={movie.Title}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">
                                            {movie.Title}
                                        </TableCell>
                                        <TableCell align="left">
                                            {movie.Type}
                                        </TableCell>
                                        <TableCell align="center">
                                            {movie.Year}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </TableContainer>
            <Toast
                open={openToast}
                message={error ? error.message : "An error occurred!"}
                onClose={() => setOpenToast(false)}
                status="error"
                vertical="top"
                horizontal="left"
            />
            {openDetail && (
                <MovieDetailModal
                    open={openDetail}
                    onClose={() => setOpenDetail(false)}
                    title={titleMovie}
                />
            )}
        </Paper>
    );
};

export default MovieTable;
