import { ModalHeader, Modal, Button } from "semantic-ui-react";

function NewRatingForm() {
    return (
        <div class="container">
            <Modal trigger={<Button>Add New Rating</Button>}>
                <ModalHeader>New Rating</ModalHeader>
            </Modal>
        </div>
    );
}

export default NewRatingForm;
