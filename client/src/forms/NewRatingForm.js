import { useState } from "react";
import {
    ModalHeader,
    ModalContent,
    Modal,
    Button,
    Form,
} from "semantic-ui-react";
import { createDatetime, getNowDate } from "../datetime";

function NewRatingForm() {
    const [open, setOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [newRatingInfo, setNewRatingInfo] = useState({
        date: getNowDate().toISOString().split("T")[0],
        time: getNowDate().toISOString().split("T")[1].slice(0, 5),
        category: "",
        rating: 0,
    });

    function handleSubmit(e) {
        e.preventDefault();
        const newRating = {
            ...newRatingInfo,
            time: createDatetime(newRatingInfo.date, newRatingInfo.time),
        };
        fetch("/ratings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRating),
        }).then((r) => {
            if (r.ok) {
                setOpen(false);
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const style = {
        width: "75%",
        margin: "auto",
        padding: "20px",
        border: "solid",
        textAlign: "left",
    };

    return (
        <div class="container">
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Add New Rating</Button>}
            >
                <ModalHeader>New Rating</ModalHeader>
                <ModalContent>
                    <Form style={style} onSubmit={handleSubmit}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Date:</label>
                                <input
                                    type="date"
                                    value={newRatingInfo.date}
                                    onChange={(e) => {
                                        setNewRatingInfo({
                                            ...newRatingInfo,
                                            date: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Time:</label>
                                <input
                                    type="time"
                                    value={newRatingInfo.time}
                                    onChange={(e) => {
                                        setNewRatingInfo({
                                            ...newRatingInfo,
                                            time: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Rating:</label>
                            <input
                                type="number"
                                value={newRatingInfo.rating}
                                onChange={(e) => {
                                    if (e.target.value >= 0) {
                                        setNewRatingInfo({
                                            ...newRatingInfo,
                                            rating: e.target.value,
                                        });
                                    }
                                }}
                            />
                        </Form.Field>
                        <Button>Submit</Button>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Form>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default NewRatingForm;
