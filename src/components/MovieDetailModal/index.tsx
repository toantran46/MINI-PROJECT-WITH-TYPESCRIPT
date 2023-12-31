import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, ListItem, CircularProgress, Box, Typography } from "@mui/material";
import { MovieDetailService } from "../../services/Services";
import { useQuery } from "@tanstack/react-query";
import { movieDetailRow } from "../../common/dummyData";
import { useEffect, useState } from "react";
import { Row } from "../../entities/types";
import Toast from "../Toast";
import { checkOwnProperty } from "../../common/common";
import NoImage from '../../assets/image-not-found.jpg';
import { dialogActionStyle } from "../styles/styles";
import { STRING } from "../../constants/Constants";

interface DetailProps {
    open: boolean,
    onClose: () => void,
    title: string
}

const MovieDetailModal = (props: DetailProps) => {
    const [movieDetail, setMovieDetail] = useState<Row[]>([]);
    const [openToast, setOpenToast] = useState(false);
    const { open, onClose, title } = props;
    
    const { data, isLoading } = useQuery({
        queryKey: [title],
        queryFn: () => MovieDetailService(title)
    })
    
    useEffect(() => {
        if (data) {
            const listData = movieDetailRow.map((item) => ({
                ...item,
                value: (checkOwnProperty(data, item.label) ? data[item.label] : '')
            }))
            setMovieDetail(listData);
            setOpenToast(checkOwnProperty(data, 'Error'));
        }
    }, [data]);
    
    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
                <DialogTitle textAlign={"center"} fontWeight={"bold"}>
                    {title}
                </DialogTitle>
                <DialogContent sx={{ marginTop: 2 }}>
                    {isLoading ? (
                        <Box textAlign={"center"}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={4} textAlign={"center"}>
                                <img
                                    width="300"
                                    height="auto"
                                    src={
                                        data?.Poster === STRING.NONE ||
                                        checkOwnProperty(data, "Error")
                                            ? NoImage
                                            : data?.Poster
                                    }
                                    alt={title}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <List>
                                    {movieDetail.map((row) => (
                                        <ListItem key={row.id}>
                                            <Grid container>
                                                <Grid item xs={2}>
                                                    <Typography
                                                        fontWeight={"bold"}
                                                    >
                                                        {row.label}:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography>
                                                        {row.value}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={dialogActionStyle}>
                    <Button
                        onClick={onClose}
                        color="primary"
                        variant="outlined"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                message={
                    data && checkOwnProperty(data, "Error")
                        ? data?.Error
                        : "An error occurred!"
                }
                onClose={() => setOpenToast(false)}
                status="error"
                vertical="top"
                horizontal="center"
            />
        </>
    );
}
export default MovieDetailModal;